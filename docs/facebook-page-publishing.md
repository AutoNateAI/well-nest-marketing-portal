# Facebook Page Publishing Setup

This guide documents the repeatable pattern we used to connect a Firebase/Next app to a Facebook Page publisher through the Meta Graph API.

Use this when a project needs to publish approved app-generated images and captions to a Facebook Page. This is not the old Facebook Groups API flow.

## What You Need

- A Facebook Page you control.
- Your Facebook profile must have full control/admin access to that Page.
- A Meta Developer app created for Page/content publishing.
- A backend that can store secrets server-side. In this project, that is Firebase Functions Secret Manager.

Do not put Page tokens in frontend code, GitHub Actions logs, public docs, or chat. Treat Page access tokens like passwords.

## Meta App Setup

1. Go to `developers.facebook.com/apps`.
2. Create a new app.
3. Use a Page/content-management use case if available.
4. Name it for the project, for example `Well Nest Page Publisher`.
5. In the app dashboard, open **Use cases** or **Customize**.
6. Go to **Permissions and features**.
7. Add these permissions and confirm they show **Ready for testing**:

```text
pages_show_list
pages_read_engagement
pages_manage_posts
```

Optional but often useful:

```text
business_management
```

If Meta asks for required app metadata, fill in:

- App icon
- Category
- Privacy policy URL
- Terms URL if requested
- User data deletion URL

For development with your own admin account, you can test before public App Review as long as the app, Page, and user account are correctly connected.

## Generate the Correct Token

The final backend token must be a **Page access token**, not the User token from the right sidebar in Graph API Explorer.

1. Open **Tools > Graph API Explorer**.
2. Select the correct Meta app.
3. Keep **User or Page** set to **User Token** at first.
4. Add permissions:

```text
pages_show_list
pages_read_engagement
pages_manage_posts
```

5. Click **Generate Access Token**.
6. In the Facebook popup, choose **Edit access** if shown and make sure the correct Page is selected.
7. Run:

```text
GET /me/accounts?fields=id,name,access_token,tasks
```

8. In the response, find the target Page and copy:

```json
{
  "id": "PAGE_ID",
  "name": "Page Name",
  "access_token": "PAGE_ACCESS_TOKEN",
  "tasks": ["CREATE_CONTENT", "MANAGE", "..."]
}
```

Use the `access_token` inside the Page object. Do not use the User token in the right sidebar.

## Store Firebase Secrets

Set the Page ID and Page access token as Firebase Function secrets:

```bash
printf "%s" "PAGE_ID" | firebase functions:secrets:set FACEBOOK_PAGE_ID --project autonateai-learning-hub
printf "%s" "PAGE_ACCESS_TOKEN" | firebase functions:secrets:set FACEBOOK_PAGE_ACCESS_TOKEN --project autonateai-learning-hub
```

Redeploy the function so it can access the new secret versions:

```bash
firebase deploy --only functions:wellNestApi --project autonateai-learning-hub
```

## Backend Pattern

For a multi-image carousel-style Page post:

1. Load the approved carousel/post record from your database.
2. Build the final caption server-side.
3. Upload each image to `/{page-id}/photos` with `published=false`.
4. Create a Page feed post at `/{page-id}/feed`.
5. Attach the uploaded photos with `attached_media[n]`.
6. Store the returned Facebook post ID/URL and mark the local record as posted/exported.

Pseudo-request shape:

```ts
await graph(`${pageId}/photos`, {
  access_token: pageAccessToken,
  url: imageUrl,
  published: 'false',
});

await graph(`${pageId}/feed`, {
  access_token: pageAccessToken,
  message: caption,
  'attached_media[0]': JSON.stringify({ media_fbid: firstPhotoId }),
  'attached_media[1]': JSON.stringify({ media_fbid: secondPhotoId }),
});
```

The app must use server-side calls. The frontend should call your backend route, not Facebook directly.

## Frontend Pattern

Recommended UI flow:

1. Generate content.
2. Show a review screen with images and caption.
3. Add manual controls:
   - Copy caption
   - Copy image links
   - Open image links
4. Add API control:
   - Post to Page
5. After success, show:
   - Posted status
   - Facebook post URL
   - Posted timestamp

Keep the manual posting pack even after API publishing works. It is useful when Meta permissions or tokens expire.

## Common Errors

### `(#200) The permission(s) pages_read_engagement,pages_manage_posts are not available`

The Meta app does not currently have those permissions ready for testing, or the generated token did not include them.

Fix:

- Add `pages_read_engagement` and `pages_manage_posts` in the app's Permissions and features screen.
- Confirm they show **Ready for testing**.
- Regenerate the User token.
- Run `/me/accounts` again and copy the fresh Page token.
- Update the Firebase secret and redeploy the function.

### `(#200) Unpublished posts must be posted to a page as the page itself`

The backend is using a User access token instead of a Page access token.

Fix:

- Run `/me/accounts?fields=id,name,access_token,tasks`.
- Copy the Page object's `access_token`.
- Update `FACEBOOK_PAGE_ACCESS_TOKEN`.
- Redeploy the function.

### `/me/accounts` returns an empty `data` array

The token does not have Page access.

Fix:

- Confirm you selected the right Meta app.
- Confirm the token includes `pages_show_list`.
- Regenerate the token and use **Edit access** to select the Page.
- Confirm your Facebook profile has full control/admin access to the Page.

### The wrong Page appears

You are using a Facebook profile or app connection that only has access to the old Page.

Fix:

- Add your profile as full-control admin to the new Page.
- Regenerate the token.
- Re-run `/me/accounts`.

## Security Notes

- Rotate any token that has been pasted into chat, screenshots, logs, or terminal history.
- Keep `FACEBOOK_PAGE_ACCESS_TOKEN` as a backend secret only.
- Do not expose it through `NEXT_PUBLIC_*`.
- Do not commit `.env`, `.secrets`, screenshots with visible tokens, or debug files with access tokens.

## Repeatable Checklist

```text
[ ] Create/select Facebook Page.
[ ] Create Meta app for Page/content publishing.
[ ] Add pages_show_list, pages_read_engagement, pages_manage_posts.
[ ] Generate User token in Graph API Explorer.
[ ] Run /me/accounts?fields=id,name,access_token,tasks.
[ ] Copy Page ID and Page access token.
[ ] Store FACEBOOK_PAGE_ID as backend secret.
[ ] Store FACEBOOK_PAGE_ACCESS_TOKEN as backend secret.
[ ] Redeploy backend.
[ ] Test a post from the app.
[ ] Confirm post appears on Page.
[ ] Rotate exposed test tokens if needed.
```

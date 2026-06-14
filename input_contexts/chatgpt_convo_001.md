**You:**

what you think about this strategy so that she can drive more traffic to her booking page?

* * *

**ChatGPT:**

I think this is a significantly better strategy than trying to scrape every church in America immediately.

What you're really doing is reducing the number of unknowns.

Why I like it

Your original approach:

Scrape the entire U.S. → collect churches → outreach

Problems:

No local credibility
No warm introductions
No proof of results
Different church cultures in every region
Massive dataset before you've validated the offer

Your Georgia approach:

Focus on one state where she already has relationships → close a few churches → document the process → expand

Now you're building:

Relationships → Case Studies → Referrals → Expansion

instead of

Data → More Data → Even More Data → Hopefully Sales

I would actually narrow it even further

Not:

Georgia

But:

Atlanta Metro

Specifically affluent suburbs.

Examples:

Alpharetta
Johns Creek
Milton
Roswell
Peachtree City

If Aunt Bev already knows people there, then every church you land creates:

testimonials
referrals
introductions to pastors
introductions to ministry leaders
introductions to business owners in the congregation

The network effect becomes stronger than the scraper.

What I would tell her

The goal is not traffic.

The goal is trust.

Churches don't buy because they saw a website.

Churches buy because:

another church uses it
a pastor recommends it
a ministry leader recommends it
someone they already trust introduces them

The booking page is just where the conversation happens.

The real funnel is:

Aunt Bev Relationship
        ↓
Church Leader
        ↓
Demo
        ↓
Pilot Church
        ↓
Testimonial
        ↓
Referral
        ↓
Second Church
        ↓
Third Church
        ↓
Regional Growth
What I would build for her next

Since you're already building portals, I'd make a dedicated:

Church Partnership Dashboard

Track:

Church Name
Pastor
Size
Location
Introduction Source
Demo Date
Follow Up Date
Interest Level
Proposal Sent
Closed Won
Monthly Revenue

Basically a lightweight CRM specifically for churches.

Then every conversation Aunt Bev has gets captured.

The thing I think you're missing

The scraper should not just collect churches.

It should rank churches.

For example:

Signal	Score
Website quality	20
Active Facebook	20
Online giving enabled	20
Multiple campuses	20
Affluent area	20

Then you get:

Church Opportunity Score

Now Aunt Bev doesn't call 5,000 churches.

She calls:

Top 100 in Atlanta
Top 100 in Georgia
Top 100 in Tennessee

That's where your software engineering advantage starts to matter.

If I were running this through AutoNateAI, I'd build a pipeline that looks like:

Church Discovery → Church Scoring → Relationship CRM → Opportunity Reports → Booking Page

The booking page becomes the last step, not the first step. The traffic comes from targeted outreach and referrals, not random website visitors.

* * *

**You:**

okay, this is great and i like the convergence down to the Atlanta area. also, we are interested in their congragation, not specifically their leadership, but the leadership is an entry way into the faith based community in that area. 

we will utilize the power of facebook groups to create our own facebook group that's actively sharing knowledge and perspectives from the themes/programs being ran at those specific churches. we then reach out to the churches' communities via attending the church, hitting up the leaders thru email to discuss something said at church, etc.....Oooo, maybe we can even find their live streams and have those processed and we post about specific things from the live stream. 

we are going to use the power of carousel posts to introduce topics and discuss them on each slide, but we will be using openai image generator 2 (gpt-image-2). also, for the 2nd retreat (this is the second retreat), her goal is to get 20 - 40 people booked. 

therefore the portal becomes a market matrix(?) where the total addressable market comes from the population from the churches in the affluent neighborhoods in the Atlanta area with a research assistant using that openai-codex api we were studying yesterday over the programs, themes and events that the church is having, while crossing that with the weekly live streamed sermons to generate a list of content ideas for those communities. those content ideas get fed into the content generator, which uses the openai gpt-image-2 model to create a set of 6 - 9 images that work together to present ideas/perspectives over the info from that church which we will utilize on our facebook group. 

we also need to have some content for explaining our retreat, so those will come, and becaiuse this is the second one, we have images from the first one we can we purpose into really good content for the group as well. 

so we should be able to see our content library and also see our market matrix, etc.

talk to me about this setup, and lets make it practical to build, but also lets look over github for an open source project(s) that does a lot of this already and that we can bring to codex and it can get to wiring the things together. 

* * *

**ChatGPT:**

Yes. This is the real product shape.

You’re not building “traffic.” You’re building a faith-community intelligence + content engine that creates trust around the retreat.

The practical build:

Atlanta Affluent Church Market
        ↓
Church + congregation profiles
        ↓
Programs / events / sermon livestreams
        ↓
Research assistant extracts themes
        ↓
Content ideas
        ↓
6–9 slide carousel generator
        ↓
Facebook group discussion
        ↓
Retreat booking page

The key insight: leadership is the doorway, congregation is the market.

MVP modules
Market Matrix
Track churches by area, denomination, congregation size, neighborhood wealth, livestream activity, event activity, women’s ministry, wellness/ministry themes, and contact paths.
Church Research Assistant
For each church:
website pages
events calendar
Facebook page/group
YouTube livestreams
sermon themes
ministry programs
potential retreat angle
Content Library
Store:
carousel ideas
generated images
captions
church/theme source
status: draft, approved, posted
engagement stats
Retreat Funnel
Track:
target: 20–40 bookings
leads joined FB group
conversations started
booking page clicks
deposits/bookings
referral source
Open-source stack I’d start from

Use Baserow or NocoDB for the market matrix/database layer. Baserow is an open-source no-code database/app builder with API-first integration, and NocoDB turns databases into Airtable-like smart spreadsheets. 
![](https://www.google.com/s2/favicons?domain=https://baserow.io&sz=128)
Baserow
+1

Use Twenty CRM if you want the outreach side to feel like a real pipeline with people, churches, opportunities, tasks, and notes. 
![](https://www.google.com/s2/favicons?domain=https://github.com&sz=128)
GitHub

Use Postiz for the social/content scheduling layer. It is open-source and self-hosted, but note: it explicitly says it does not automate or scrape social media platforms, so we should treat it as scheduler/planner, not a Facebook scraping engine. 
![](https://www.google.com/s2/favicons?domain=https://github.com&sz=128)
GitHub

For sermons/video processing, look at Sermon Summarization Agent, which already transcribes and summarizes MP4/MP3 sermon recordings, and AI Video Transcriber, which supports YouTube/video/podcast URL transcription and summarization. 
![](https://www.google.com/s2/favicons?domain=https://github.com&sz=128)
GitHub
+1

What Codex should wire first

Build this as a Next.js/Firebase portal:

/churches
/churches/:id
/content-library
/carousel-generator
/retreat-funnel
/bookings-dashboard

Minimum Firestore collections:

churches
sermons
programs
contentIdeas
carouselSets
assets
facebookPosts
leads
bookings
touchpoints
The first real target

Do not start with 200 churches.

Start with:

25 churches in Atlanta affluent suburbs
→ process 3 recent sermons each
→ generate 5 carousel concepts per church
→ publish 2–3 discussion posts per day into the FB group
→ drive people to one retreat explainer page.

For 20–40 bookings, you probably need something like:

500–1,500 warm FB group members
100–250 booking page clicks
40–80 serious conversations
20–40 booked people

The strongest version of this is:

“We listen to what your faith community is already talking about, then create retreat content that feels native to that community.”

* * *

**You:**

okay, i reviewed and i like https://github.com/ThriveCommunityChurch/Sermon_Summarization_Agent?utm_source=chatgpt.com and i like https://github.com/gitroomhq/postiz-app?utm_source=chatgpt.com. i feel like managing the db tables will be simple with firebase. we can extract out of those repos the patterns they are following for creating and scheduling posts and also for sermon summarization. then we continue making this custom in our workflow. also, her brand is called "Well Nest" so this portal should have that branding on it 

* * *

**ChatGPT:**

Exactly. Well Nest should be custom, not a clone.

Use those repos as pattern libraries:

Sermon Summarization Agent gives you:

MP4/MP3 → transcript
summary
semantic tags
short clip ideas
LangGraph workflow structure
token/cost tracking

![](https://www.google.com/s2/favicons?domain=https://github.com&sz=128)
GitHub

Postiz gives you:

content calendar patterns
media upload flow
scheduling workflow
multi-platform posting architecture
agent/CLI-friendly posting ideas

![](https://www.google.com/s2/favicons?domain=https://github.com&sz=128)
GitHub
+1

But keep Firebase as the source of truth.

Well Nest portal structure
Well Nest Portal
├── Market Matrix
│   ├── Churches
│   ├── Congregation signals
│   ├── Affluent neighborhood score
│   ├── Livestream links
│   └── Outreach notes
│
├── Sermon Intelligence
│   ├── Sermon videos/audio
│   ├── Transcripts
│   ├── Themes
│   ├── Quotes/ideas
│   └── Content opportunities
│
├── Content Studio
│   ├── Carousel concepts
│   ├── GPT-image-2 prompts
│   ├── 6–9 image sets
│   ├── Captions
│   └── Approval status
│
├── Social Calendar
│   ├── Drafted posts
│   ├── Scheduled posts
│   ├── Posted content
│   └── Engagement notes
│
└── Retreat Funnel
    ├── FB group members
    ├── Warm leads
    ├── Booking page clicks
    ├── Conversations
    └── 20–40 booking goal
Firestore collections
churches
sermons
sermonTranscripts
sermonThemes
contentIdeas
carouselSets
carouselImages
socialPosts
retreatAssets
leads
bookings
touchpoints
The MVP workflow
Add 25 Atlanta-area churches.
Attach livestream / YouTube / Facebook video links.
Pull sermon audio/video.
Run sermon summarization.
Extract themes like healing, rest, renewal, purpose, marriage, grief, anxiety, women’s ministry.
Generate 5 content ideas per church.
Turn the best ideas into carousel sets.
Save each set into the Well Nest content library.
Manually approve.
Schedule/post into the Well Nest Facebook group.
Track which content drives comments, DMs, clicks, and bookings.
Important product decision

Do not automate Facebook scraping or spam outreach. Postiz explicitly says it does not scrape or automate social platforms in that way. Treat Facebook as a place where approved content gets published and engagement gets manually captured. 
![](https://www.google.com/s2/favicons?domain=https://github.com&sz=128)
GitHub

Codex build instruction

The first Codex task should be:

Create a Well Nest branded Next.js + Firebase portal with:
1. Market Matrix page
2. Church detail page
3. Sermon Intelligence upload/link page
4. Content Studio page
5. Retreat Funnel dashboard

Use Firebase Auth, Firestore, and Storage.
Stub sermon processing and post scheduling behind service interfaces so we can later adapt patterns from Sermon_Summarization_Agent and Postiz.

This is clean. You’re building a community-specific retreat acquisition engine, not just a booking page.





code from stitch.withgoogle.com based on this convo and other inputs i gave it:


<!-- Well Nest Dashboard -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Well Nest | Executive Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:opsz,wght@8..60,400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#4f604f",
                        "secondary": "#8a4f37",
                        "primary-container": "#677966",
                        "primary-fixed-dim": "#b8ccb6",
                        "on-primary-fixed": "#0f1f11",
                        "on-surface": "#161d1f",
                        "error-container": "#ffdad6",
                        "tertiary": "#5c5c58",
                        "tertiary-fixed-dim": "#c8c6c2",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#eef5f7",
                        "on-error": "#ffffff",
                        "on-tertiary-fixed": "#1b1c19",
                        "primary-fixed": "#d4e8d1",
                        "on-tertiary-fixed-variant": "#474744",
                        "tertiary-container": "#757571",
                        "outline": "#747872",
                        "surface": "#f4fafd",
                        "on-surface-variant": "#434842",
                        "on-primary-container": "#f7fff2",
                        "surface-variant": "#dde4e6",
                        "surface-container-highest": "#dde4e6",
                        "on-tertiary-container": "#fefcf7",
                        "secondary-fixed-dim": "#ffb599",
                        "surface-container": "#e8eff1",
                        "secondary-fixed": "#ffdbce",
                        "on-secondary-container": "#7a412a",
                        "inverse-on-surface": "#ebf2f4",
                        "secondary-container": "#ffb193",
                        "error": "#ba1a1a",
                        "on-secondary-fixed-variant": "#6e3822",
                        "on-error-container": "#93000a",
                        "on-background": "#161d1f",
                        "outline-variant": "#c4c8c0",
                        "on-secondary-fixed": "#370e00",
                        "background": "#f4fafd",
                        "tertiary-fixed": "#e4e2dd",
                        "on-primary-fixed-variant": "#3a4b3a",
                        "inverse-surface": "#2b3234",
                        "surface-bright": "#f4fafd",
                        "on-secondary": "#ffffff",
                        "on-tertiary": "#ffffff",
                        "on-primary": "#ffffff",
                        "surface-tint": "#516351",
                        "surface-dim": "#d4dbdd",
                        "surface-container-high": "#e2e9ec",
                        "inverse-primary": "#b8ccb6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "8px",
                        "gutter": "24px",
                        "section-gap": "80px",
                        "margin-mobile": "20px",
                        "margin-desktop": "64px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "label-caps": ["Plus Jakarta Sans"],
                        "headline-sm": ["Source Serif 4"],
                        "headline-md": ["Source Serif 4"],
                        "display-lg-mobile": ["Source Serif 4"],
                        "body-sm": ["Plus Jakarta Sans"],
                        "body-lg": ["Plus Jakarta Sans"],
                        "display-lg": ["Source Serif 4"],
                        "body-md": ["Plus Jakarta Sans"]
                    },
                    "fontSize": {
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "500" }],
                        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "500" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #f4fafd;
            color: #161d1f;
            -webkit-font-smoothing: antialiased;
        }
        .ambient-glow {
            box-shadow: 0 4px 24px rgba(45, 52, 54, 0.04);
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
        }
    </style>
</head>
<body class="font-body-md text-body-md overflow-x-hidden">
<!-- Sidebar Navigation -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 px-6 z-50">
<div class="mb-12">
<h1 class="font-headline-sm text-headline-sm text-primary">Well Nest</h1>
<p class="text-on-surface-variant font-label-caps opacity-70">Faith-Based Wellness</p>
</div>
<nav class="flex-1 space-y-2">
<!-- Active State: Market Matrix -->
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-primary font-bold border-r-4 border-primary hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">insights</span>
<span class="font-body-md">Market Matrix</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">psychology</span>
<span class="font-body-md">Intelligence Hub</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">grid_view</span>
<span class="font-body-md">Content Library</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">auto_graph</span>
<span class="font-body-md">Retreat Funnel</span>
</a>
</nav>
<div class="mt-auto space-y-2 pt-8 border-t border-outline-variant">
<button class="w-full bg-primary text-white py-3 px-4 rounded-full font-label-caps hover:opacity-90 transition-all active:scale-95 mb-6">
                New Strategy
            </button>
<a class="flex items-center gap-3 py-2 px-4 text-on-surface-variant hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-body-md">Settings</span>
</a>
<a class="flex items-center gap-3 py-2 px-4 text-on-surface-variant hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined">help_outline</span>
<span class="font-body-md">Support</span>
</a>
</div>
</aside>
<!-- Top App Bar -->
<header class="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-surface/80 backdrop-blur-md z-40 flex justify-between items-center px-gutter">
<div class="flex items-center gap-4 flex-1">
<div class="relative w-full max-w-md">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full bg-surface-container rounded-full py-2 pl-10 pr-4 border-none focus:ring-1 focus:ring-primary text-body-sm" placeholder="Search insights..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<button class="relative text-on-surface-variant hover:text-primary transition-colors active:scale-95">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<div class="flex items-center gap-3 pl-6 border-l border-outline-variant">
<div class="text-right">
<p class="font-label-caps text-on-surface">Elena Brooks</p>
<p class="text-[10px] text-on-surface-variant uppercase tracking-widest">Executive Director</p>
</div>
<img alt="Profile" class="w-10 h-10 rounded-full object-cover border-2 border-primary-fixed" data-alt="A professional headshot of a serene woman in her late 30s with a warm expression. She is in a bright, soft-lit modern office with hints of indoor greenery and natural wood textures. The lighting is ethereal and high-key, aligning with a premium, faith-based wellness brand aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOMRo7DAVLcXawPKn2Nhv6jqVk3lngztgOc-MFNDswi-oHy14jZ9Spe8msjxAUAPka23LaqK1nMCVid37qgaKpPXiQLZnVukHJ4G3-j_DYTSfMMCZ-DrOQ9XZTzPlaKNjp5gskhWiv69aj91q2ObTuRUZikQdbZoS3ltQCDk8LeKA0CT5JFtFJTznjrhyQODAj_-dIvWW9U_P6kIqu8YrQqbOUQkKJWdIEQuQUmKcA_2fImmRVAF89l4sM2TfazqAjd5G_DwdTvpyB"/>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="ml-64 pt-20 min-h-screen">
<div class="p-margin-desktop max-w-container-max mx-auto space-y-section-gap">
<!-- Welcome Header -->
<section class="animate-in fade-in slide-in-from-bottom-4 duration-1000">
<div class="flex flex-col md:flex-row justify-between items-end gap-6">
<div>
<h2 class="font-headline-md text-headline-md text-primary mb-2">Good morning, Elena</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">The sanctuary is quiet. Today's intelligence reports show a 14% increase in thematic resonance across the community.</p>
</div>
<div class="flex gap-4">
<div class="px-6 py-3 rounded-xl bg-primary-fixed flex items-center gap-3">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
<span class="font-label-caps text-primary">October 24, 2023</span>
</div>
</div>
</div>
</section>
<!-- Executive Metrics (Bento Style) -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Retreat Funnel Large Card -->
<div class="md:col-span-8 bg-white rounded-3xl p-8 ambient-glow relative overflow-hidden group">
<div class="relative z-10 flex flex-col h-full justify-between">
<div>
<div class="flex justify-between items-start mb-8">
<div>
<h3 class="font-label-caps text-secondary mb-1">RETREAT FUNNEL</h3>
<p class="font-headline-sm text-headline-sm text-on-surface">Seasonal Bookings vs Goal</p>
</div>
<span class="bg-secondary-fixed text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">+12.4%</span>
</div>
<div class="space-y-6">
<div>
<div class="flex justify-between mb-2">
<span class="text-body-sm font-label-caps text-on-surface-variant">Autumn Renewal (Active)</span>
<span class="text-body-sm font-bold">84%</span>
</div>
<div class="w-full h-3 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary transition-all duration-1000 w-[84%] relative">
<div class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rounded-full mr-1"></div>
</div>
</div>
</div>
<div>
<div class="flex justify-between mb-2">
<span class="text-body-sm font-label-caps text-on-surface-variant">Winter Reflection (Pre-launch)</span>
<span class="text-body-sm font-bold">32%</span>
</div>
<div class="w-full h-3 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary-container transition-all duration-1000 w-[32%] relative">
<div class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rounded-full mr-1"></div>
</div>
</div>
</div>
</div>
</div>
<div class="mt-12 flex gap-8">
<div>
<p class="text-3xl font-headline-sm text-primary">1,248</p>
<p class="text-xs font-label-caps text-on-surface-variant">Confirmed Guests</p>
</div>
<div class="border-l border-outline-variant pl-8">
<p class="text-3xl font-headline-sm text-secondary">$142k</p>
<p class="text-xs font-label-caps text-on-surface-variant">Projected Revenue</p>
</div>
</div>
</div>
<div class="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">

</div>
</div>
<!-- Intelligence Stats Vertical -->
<div class="md:col-span-4 space-y-gutter">
<div class="bg-primary text-white rounded-3xl p-6 ambient-glow">
<h3 class="font-label-caps text-primary-fixed-dim mb-4">INTELLIGENCE HUB</h3>
<div class="flex items-center gap-4 mb-6">
<span class="material-symbols-outlined text-4xl opacity-50">neurology</span>
<div>
<p class="text-4xl font-headline-sm">482</p>
<p class="text-xs font-label-caps opacity-70">Sermons Analyzed</p>
</div>
</div>
<div class="pt-4 border-t border-primary-container">
<p class="text-sm italic opacity-90">"Resilience" and "Faithful Stewardship" are currently the strongest trending themes.</p>
</div>
</div>
<div class="bg-white rounded-3xl p-6 ambient-glow border border-outline-variant">
<h3 class="font-label-caps text-on-surface-variant mb-4">COMMUNITY GROWTH</h3>
<div class="flex justify-between items-end">
<div>
<p class="text-3xl font-headline-sm text-on-surface">12.8k</p>
<p class="text-xs font-label-caps text-primary">Total Members</p>
</div>
<div class="h-16 w-32 flex items-end gap-1">
<div class="w-full bg-primary-fixed h-[40%] rounded-t-sm"></div>
<div class="w-full bg-primary-fixed h-[60%] rounded-t-sm"></div>
<div class="w-full bg-primary-fixed h-[55%] rounded-t-sm"></div>
<div class="w-full bg-primary-fixed h-[80%] rounded-t-sm"></div>
<div class="w-full bg-primary h-[100%] rounded-t-sm"></div>
</div>
</div>
</div>
</div>
</section>
<!-- Activity Feed & Recent Content -->
<section class="grid grid-cols-1 lg:grid-cols-3 gap-12">
<!-- Recent Activity Feed -->
<div class="lg:col-span-1 space-y-6">
<div class="flex justify-between items-center">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Recent Activity</h3>
<button class="text-primary text-xs font-label-caps hover:underline">View All</button>
</div>
<div class="space-y-4">
<!-- Activity Item -->
<div class="flex gap-4 p-4 rounded-2xl hover:bg-white transition-colors duration-300">
<div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
<span class="material-symbols-outlined text-lg">auto_awesome</span>
</div>
<div>
<p class="text-body-sm font-medium">New Themes Extracted</p>
<p class="text-xs text-on-surface-variant">"The Garden of Hope" sermon processed successfully.</p>
<p class="text-[10px] text-outline mt-1 uppercase tracking-tighter">14 Minutes Ago</p>
</div>
</div>
<div class="flex gap-4 p-4 rounded-2xl hover:bg-white transition-colors duration-300">
<div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
<span class="material-symbols-outlined text-lg">image</span>
</div>
<div>
<p class="text-body-sm font-medium">Carousel Generated</p>
<p class="text-xs text-on-surface-variant">5 social assets ready for "Mindful Prayer" series.</p>
<p class="text-[10px] text-outline mt-1 uppercase tracking-tighter">2 Hours Ago</p>
</div>
</div>
<div class="flex gap-4 p-4 rounded-2xl hover:bg-white transition-colors duration-300">
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
<span class="material-symbols-outlined text-lg">person_add</span>
</div>
<div>
<p class="text-body-sm font-medium">New Partner Onboarded</p>
<p class="text-xs text-on-surface-variant">Grace Community Church joined the network.</p>
<p class="text-[10px] text-outline mt-1 uppercase tracking-tighter">5 Hours Ago</p>
</div>
</div>
</div>
</div>
<!-- Intelligence Cards (Horizontal Scroll / Grid) -->
<div class="lg:col-span-2 space-y-6">
<div class="flex justify-between items-center">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Content Intelligence</h3>
<div class="flex gap-2">
<button class="p-2 rounded-full border border-outline-variant hover:bg-white transition-colors"><span class="material-symbols-outlined">chevron_left</span></button>
<button class="p-2 rounded-full border border-outline-variant hover:bg-white transition-colors"><span class="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<!-- Media Card 1 -->
<div class="bg-white rounded-2xl overflow-hidden ambient-glow group cursor-pointer border border-outline-variant">
<div class="relative aspect-video">
<img alt="Sermon Thumbnail" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A tranquil, high-end sanctuary interior with soft sunlight streaming through tall windows, illuminating natural wood pews and minimalist botanical arrangements. The scene is shot in a soft, cinematic style with a shallow depth of field, reflecting the calm and reflective mood of a digital sabbath dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiEPdfRmqNYOpQKRxLMnK6K6iT5ec1nf46xJ4rKqT6_9iNMfiLUn7I8IJKS8Kt085Uz8Y_WjtXYIILu6WMrbbM_GVo91Y_ixObmGGi1_ROpXpXhH8qjpniJ6LY99BChKZN7jtsZZtkm1FaeIE4GSuv5YPquIYvM1JMoKfP4a61mCqP_UB-0o1v2gmzRjQQLIaNfuOPn4vwZTY5EAGUNi7cMoZ3rJILtSToVMT5FoAXyFxufoRcnb6wY43wQhdidC4GCx6iA_iFP3Q-"/>
<div class="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
<div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold">42:15</div>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h4 class="font-body-lg font-bold text-on-surface line-clamp-1">Finding Stillness in the Noise</h4>
<span class="material-symbols-outlined text-primary">more_vert</span>
</div>
<p class="text-body-sm text-on-surface-variant mb-4 line-clamp-2">Exploring the theological foundations of rest and the modern necessity of the Sabbath.</p>
<div class="flex items-center gap-4">
<div class="flex -space-x-2">
<div class="w-6 h-6 rounded-full bg-primary text-[8px] flex items-center justify-center text-white border border-white">SM</div>
<div class="w-6 h-6 rounded-full bg-secondary text-[8px] flex items-center justify-center text-white border border-white">TR</div>
</div>
<span class="text-[10px] font-label-caps text-outline uppercase tracking-wider">Themes Extracted</span>
</div>
</div>
</div>
<!-- Media Card 2 -->
<div class="bg-white rounded-2xl overflow-hidden ambient-glow group cursor-pointer border border-outline-variant">
<div class="relative aspect-video">
<img alt="Sermon Thumbnail" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A breathtaking landscape of a misty mountain range at dawn, with soft golden light filtering through the clouds. The colors are muted and earthy, predominantly Sage Green and Warm Cream. The aesthetic is peaceful and majestic, designed to evoke a sense of spiritual wonder and focus within the user interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA18X1ocGA0xDCT5mH6nONTygw6yKfoR_J-vmUmRxF5Vi-rfwLwdaGVPPKQDFKVG95uLYJNB860J9AKwqVZq1ZyUWU8ap0lebUYOjM5h_qvV6dK1W9al4TFxbPD6B5oLWLaomU-je4LUtFNrgu_tFeZSp7l6EVPU1wh0WmAcyIQZJhDw5VO7J-Mb5OyCa1YiE9-w7PF_GqMon72QYpQqbiRuOs9sdCWwUkjScIq04kgj52gXzj41mbKKtQ9pNRHq4m7uIdiLhCL8AIS"/>
<div class="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
<div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold">28:40</div>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h4 class="font-body-lg font-bold text-on-surface line-clamp-1">The Architecture of Hope</h4>
<span class="material-symbols-outlined text-primary">more_vert</span>
</div>
<p class="text-body-sm text-on-surface-variant mb-4 line-clamp-2">How community structures support individual faith journeys in changing times.</p>
<div class="flex items-center gap-4">
<div class="flex -space-x-2">
<div class="w-6 h-6 rounded-full bg-tertiary text-[8px] flex items-center justify-center text-white border border-white">HP</div>
<div class="w-6 h-6 rounded-full bg-primary text-[8px] flex items-center justify-center text-white border border-white">CM</div>
</div>
<span class="text-[10px] font-label-caps text-outline uppercase tracking-wider">Themes Extracted</span>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</main>
<!-- Contextual FAB (Only on Dashboard/Home) -->
<button class="fixed bottom-10 right-10 w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-50">
<span class="material-symbols-outlined text-3xl">add</span>
</button>
<!-- Background Shader for Atmosphere -->
<div class="fixed inset-0 -z-10 opacity-30 pointer-events-none">

</div>
<script>
        // Micro-interactions for dashboard cards
        document.querySelectorAll('.ambient-glow').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Simple search highlight effect
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('ring-2', 'ring-primary/20');
        });
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('ring-2', 'ring-primary/20');
        });
    </script>
</body></html>

<!-- Sermon Intelligence Dashboard -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sermon Intelligence | Sabbath Digital</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "secondary": "#8a4f37",
                        "on-tertiary": "#ffffff",
                        "tertiary": "#5c5c58",
                        "primary-fixed": "#d4e8d1",
                        "outline-variant": "#c4c8c0",
                        "surface-tint": "#516351",
                        "tertiary-fixed-dim": "#c8c6c2",
                        "tertiary-container": "#757571",
                        "surface-bright": "#f4fafd",
                        "surface-container-low": "#eef5f7",
                        "on-secondary-container": "#7a412a",
                        "on-error-container": "#93000a",
                        "primary-fixed-dim": "#b8ccb6",
                        "surface-variant": "#dde4e6",
                        "inverse-on-surface": "#ebf2f4",
                        "secondary-container": "#ffb193",
                        "inverse-surface": "#2b3234",
                        "error-container": "#ffdad6",
                        "on-primary": "#ffffff",
                        "tertiary-fixed": "#e4e2dd",
                        "surface-container-highest": "#dde4e6",
                        "on-primary-container": "#f7fff2",
                        "surface-container": "#e8eff1",
                        "secondary-fixed": "#ffdbce",
                        "primary": "#4f604f",
                        "outline": "#747872",
                        "on-tertiary-container": "#fefcf7",
                        "error": "#ba1a1a",
                        "surface": "#f4fafd",
                        "surface-container-high": "#e2e9ec",
                        "surface-dim": "#d4dbdd",
                        "inverse-primary": "#b8ccb6",
                        "primary-container": "#677966",
                        "on-error": "#ffffff",
                        "on-tertiary-fixed-variant": "#474744",
                        "on-primary-fixed": "#0f1f11",
                        "on-secondary-fixed": "#370e00",
                        "on-secondary": "#ffffff",
                        "on-secondary-fixed-variant": "#6e3822",
                        "on-tertiary-fixed": "#1b1c19",
                        "surface-container-lowest": "#ffffff",
                        "secondary-fixed-dim": "#ffb599",
                        "on-surface": "#161d1f",
                        "on-primary-fixed-variant": "#3a4b3a",
                        "background": "#f4fafd",
                        "on-surface-variant": "#434842",
                        "on-background": "#161d1f"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.8px",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "8px",
                        "container-max": "1280px",
                        "margin-desktop": "64px",
                        "gutter": "24px",
                        "margin-mobile": "20px",
                        "section-gap": "80px"
                    },
                    "fontFamily": {
                        "body-sm": ["Plus Jakarta Sans"],
                        "label-caps": ["Plus Jakarta Sans"],
                        "body-md": ["Plus Jakarta Sans"],
                        "headline-md": ["Source Serif 4"],
                        "headline-sm": ["Source Serif 4"],
                        "display-lg-mobile": ["Source Serif 4"],
                        "body-lg": ["Plus Jakarta Sans"],
                        "display-lg": ["Source Serif 4"]
                    },
                    "fontSize": {
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "500"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "500"}],
                        "display-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "600"}]
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: #f4fafd; /* Surface */
            color: #161d1f; /* On Surface */
            -webkit-font-smoothing: antialiased;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .ambient-glow {
            box-shadow: 0 4px 24px rgba(45, 52, 54, 0.04);
        }
        .inner-bleed {
            padding: 32px;
        }
        /* Custom Scrollbar for a cleaner SaaS look */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c4c8c0; border-radius: 10px; }
    </style>
</head>
<body class="font-body-md text-body-md overflow-x-hidden">
<!-- SideNavBar -->
<aside class="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-surface flex flex-col py-8 px-4 z-50">
<div class="mb-10 px-2">
<h1 class="font-headline-sm text-headline-sm text-primary">Sabbath Digital</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant opacity-70">Intentional Wellness</p>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-primary-fixed/20 transition-colors" href="#">
<span class="material-symbols-outlined">analytics</span>
<span>Market Matrix</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-secondary bg-primary-fixed/20 transition-colors" href="#">
<span class="material-symbols-outlined">psychology</span>
<span>Sermon Intelligence</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-primary-fixed/20 transition-colors" href="#">
<span class="material-symbols-outlined">grid_view</span>
<span>Content Studio</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-primary-fixed/20 transition-colors" href="#">
<span class="material-symbols-outlined">filter_list</span>
<span>Retreat Funnel</span>
</a>
</nav>
<div class="mt-auto space-y-4">
<button class="w-full bg-primary text-white py-3 px-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined">add</span>
<span>New Retreat</span>
</button>
<div class="pt-4 border-t border-outline-variant space-y-1">
<a class="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-primary-fixed/20 transition-colors" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-body-sm text-body-sm">Settings</span>
</a>
<a class="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-primary-fixed/20 transition-colors" href="#">
<span class="material-symbols-outlined">help_outline</span>
<span class="font-body-sm text-body-sm">Support</span>
</a>
</div>
</div>
</aside>
<!-- TopNavBar -->
<header class="fixed top-0 right-0 left-64 h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-8 z-40">
<div class="flex items-center gap-4 flex-1">
<div class="relative w-full max-w-md">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:ring-2 focus:ring-primary/20 font-body-sm text-body-sm" placeholder="Search sermons or themes..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<div class="flex items-center gap-4">
<button class="text-on-surface-variant hover:text-secondary transition-colors relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<button class="text-on-surface-variant hover:text-secondary transition-colors">
<span class="material-symbols-outlined">settings</span>
</button>
</div>
<div class="h-8 w-px bg-outline-variant"></div>
<div class="flex items-center gap-3">
<img alt="User Profile" class="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A professional headshot of a middle-aged man with a warm, kind smile, wearing a casual linen shirt. The background is a soft-focus interior of a modern, sunlit office with plants, creating an atmosphere of professional calm and intentional wellness. The lighting is natural and flattering, emphasizing a serene sanctuary aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIZnYZlU3r0V6tJ5L7JjKhmCiKdnj7lxsRLXfMBEo4tdtzsMC1DuLEopBgzugVON4PrM8lI-Z66cTzClLu16LshULoNseZimdTetz8eyL3ClT9CrgSgsetIA2KgzVFFDQm3ADzeJ2dCnALKvlLUZkp4DxwYeuB4JnAjdPKMt-Xy82QOO_9BJWU80SFJfWA_3Xt57j-Gcp3zAxVLVc-zVejp5y_4bx6T1NQAztwJYVoWpEhzMGCemdQSUZf1TgNn9SCi5FkURc6YBEw"/>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="ml-64 pt-16 min-h-screen bg-background">
<div class="inner-bleed max-w-[1400px] mx-auto">
<!-- Page Header -->
<div class="flex justify-between items-end mb-10">
<div>
<h2 class="font-headline-md text-headline-md text-primary">Sermon Intelligence</h2>
<p class="text-on-surface-variant mt-1">Transforming spiritual wisdom into actionable digital content.</p>
</div>
<button class="bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
<span class="material-symbols-outlined">cloud_upload</span>
<span class="font-bold">Process New Stream</span>
</button>
</div>
<div class="grid grid-cols-12 gap-8">
<!-- Left: Featured Intelligence Detail -->
<div class="col-span-12 lg:col-span-8 space-y-8">
<section class="bg-surface-container-lowest rounded-xl ambient-glow overflow-hidden border border-outline-variant/30">
<div class="p-8">
<div class="flex justify-between items-start mb-6">
<div>
<span class="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-caps text-label-caps mb-3">Featured Analysis</span>
<h3 class="font-headline-md text-headline-md text-on-surface">The Gift of Rest</h3>
<p class="font-body-md text-body-md text-on-surface-variant">North Point Community Church • Oct 22, 2023</p>
</div>
<div class="flex gap-2">
<button class="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors">
<span class="material-symbols-outlined">share</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors">
<span class="material-symbols-outlined">bookmark</span>
</button>
</div>
</div>
<!-- Video Placeholder -->
<div class="relative aspect-video rounded-xl bg-on-surface overflow-hidden group cursor-pointer mb-8">
<img alt="Sermon Thumbnail" class="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" data-alt="A wide-angle interior shot of a modern, architecturally stunning church sanctuary. The lighting is soft and golden, streaming through high windows. A single speaker stands on a minimalist stage with a large screen displaying abstract nature patterns. The overall mood is quiet, reverent, and technologically sophisticated, aligning with a premium digital Sabbath aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6mvsZ2GX4GpkqZZdEsnRS7d8XX-vGpRD9HO0NmEysGu2MHZzfNRX28p2O3z4LP_NduxITtmFTxH3k1RnwavB8ytpy-yPpuhn_T3s9lhc7it2vmT69uEwGLpdDTz3eOFh8A2R2Wbiq-qyzjG2GFUXO0_pcpnx_pE5eRmzHXh-mfXO8Ev3ISQQC1vna8M0-rbTrT2dIuVvjWM4YvxXhf5oTY4h3PAgDbBpU8PPwqZoDWgiij2wHLh28wQ43cFe2wMY_uKlh3IlYYYLm"/>
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
<!-- AI Summary -->
<div>
<h4 class="font-label-caps text-label-caps text-primary border-b border-outline-variant pb-2 mb-4">EXECUTIVE SUMMARY</h4>
<p class="text-on-surface-variant leading-relaxed">
                                        In this session, the speaker explores the theological and practical necessity of the Sabbath. The core message argues that rest is not a reward for productivity, but a prerequisite for it. By examining ancient rhythms, the sermon provides a framework for modern families to disconnect from digital noise and reconnect with spiritual foundations.
                                    </p>
<div class="mt-6 flex flex-wrap gap-2">
<span class="px-3 py-1 bg-surface-container rounded-full text-on-surface-variant font-body-sm text-body-sm border border-outline-variant/30">#Healing</span>
<span class="px-3 py-1 bg-surface-container rounded-full text-on-surface-variant font-body-sm text-body-sm border border-outline-variant/30">#Sabbath</span>
<span class="px-3 py-1 bg-surface-container rounded-full text-on-surface-variant font-body-sm text-body-sm border border-outline-variant/30">#Anxiety</span>
<span class="px-3 py-1 bg-surface-container rounded-full text-on-surface-variant font-body-sm text-body-sm border border-outline-variant/30">#Restoration</span>
</div>
</div>
<!-- Content Opportunities -->
<div>
<h4 class="font-label-caps text-label-caps text-secondary border-b border-outline-variant pb-2 mb-4">CONTENT OPPORTUNITIES</h4>
<ul class="space-y-4">
<li class="flex items-start gap-3 group cursor-pointer">
<span class="material-symbols-outlined text-secondary mt-1">auto_awesome</span>
<div>
<p class="font-body-md text-body-md text-on-surface group-hover:text-secondary transition-colors">3 ways to find rest in a busy suburb</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Carousel • 7 Slides • High Engagement Potential</p>
</div>
</li>
<li class="flex items-start gap-3 group cursor-pointer">
<span class="material-symbols-outlined text-secondary mt-1">auto_awesome</span>
<div>
<p class="font-body-md text-body-md text-on-surface group-hover:text-secondary transition-colors">A prayer for the anxious mother</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Reel Script • 45 Seconds • Emotional Connection</p>
</div>
</li>
<li class="flex items-start gap-3 group cursor-pointer">
<span class="material-symbols-outlined text-secondary mt-1">auto_awesome</span>
<div>
<p class="font-body-md text-body-md text-on-surface group-hover:text-secondary transition-colors">The Digital Fast Challenge</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Email Newsletter • Interactive Layout</p>
</div>
</li>
</ul>
</div>
</div>
</div>
<div class="bg-surface-variant/30 px-8 py-4 border-t border-outline-variant/30 flex justify-between items-center">
<span class="text-on-surface-variant font-body-sm text-body-sm">Last updated 2 hours ago</span>
<button class="text-secondary font-bold hover:underline">Open Content Studio</button>
</div>
</section>
<!-- Processing Feed -->
<section>
<div class="flex items-center justify-between mb-6">
<h4 class="font-headline-sm text-headline-sm text-primary">Recent Processing</h4>
<button class="text-on-surface-variant hover:text-primary font-body-sm text-body-sm flex items-center gap-1">
                                View History <span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
<div class="bg-surface-container-lowest rounded-xl ambient-glow border border-outline-variant/30 overflow-hidden">
<table class="w-full text-left border-collapse">
<thead>
<tr class="border-b border-outline-variant">
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant">CHURCH / TITLE</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant">DATE</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant">STATUS</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant">ACTION</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/50">
<tr class="hover:bg-surface-variant/20 transition-colors">
<td class="px-6 py-5">
<p class="font-bold text-on-surface">Passion City Church</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Indescribable Wisdom</p>
</td>
<td class="px-6 py-5 text-on-surface-variant">Oct 29, 2023</td>
<td class="px-6 py-5">
<div class="flex items-center gap-2 text-secondary">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
</span>
<span class="font-body-sm text-body-sm font-medium">Summarizing...</span>
</div>
</td>
<td class="px-6 py-5">
<button class="text-primary hover:text-secondary"><span class="material-symbols-outlined">more_horiz</span></button>
</td>
</tr>
<tr class="hover:bg-surface-variant/20 transition-colors">
<td class="px-6 py-5">
<p class="font-bold text-on-surface">Elevate Church</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Walking in Freedom</p>
</td>
<td class="px-6 py-5 text-on-surface-variant">Oct 28, 2023</td>
<td class="px-6 py-5">
<div class="flex items-center gap-2 text-primary">
<span class="material-symbols-outlined text-sm">sync</span>
<span class="font-body-sm text-body-sm font-medium">Transcribing</span>
</div>
</td>
<td class="px-6 py-5">
<button class="text-primary hover:text-secondary"><span class="material-symbols-outlined">more_horiz</span></button>
</td>
</tr>
<tr class="hover:bg-surface-variant/20 transition-colors">
<td class="px-6 py-5">
<p class="font-bold text-on-surface">Redeemer Presbyterian</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">The Way of the Cross</p>
</td>
<td class="px-6 py-5 text-on-surface-variant">Oct 27, 2023</td>
<td class="px-6 py-5">
<div class="flex items-center gap-2 text-on-surface-variant">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="font-body-sm text-body-sm font-medium">Completed</span>
</div>
</td>
<td class="px-6 py-5">
<button class="text-primary hover:text-secondary font-body-sm text-body-sm font-bold">View Detail</button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
</div>
<!-- Right: Intelligence Queue & Side Info -->
<div class="col-span-12 lg:col-span-4 space-y-8">
<!-- Intelligence Queue -->
<section class="bg-surface-container-high rounded-xl p-6 border border-outline-variant/30">
<div class="flex items-center justify-between mb-6">
<h4 class="font-label-caps text-label-caps text-primary">UPCOMING QUEUE</h4>
<span class="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold">3 TASKS</span>
</div>
<div class="space-y-4">
<div class="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20 flex items-center gap-4">
<div class="w-10 h-10 bg-primary/10 rounded flex items-center justify-center text-primary">
<span class="material-symbols-outlined">link</span>
</div>
<div class="flex-1">
<p class="font-body-sm text-body-sm font-bold text-on-surface truncate">The Life of Grace...</p>
<p class="text-[11px] text-on-surface-variant uppercase tracking-wider">Awaiting Stream</p>
</div>
<button class="text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-sm">close</span>
</button>
</div>
<div class="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20 flex items-center gap-4 opacity-60">
<div class="w-10 h-10 bg-primary/10 rounded flex items-center justify-center text-primary">
<span class="material-symbols-outlined">schedule</span>
</div>
<div class="flex-1">
<p class="font-body-sm text-body-sm font-bold text-on-surface truncate">Sabbath Rhythms</p>
<p class="text-[11px] text-on-surface-variant uppercase tracking-wider">Scheduled: Nov 5</p>
</div>
<button class="text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-sm">close</span>
</button>
</div>
</div>
<button class="w-full mt-6 py-2 border border-dashed border-primary/40 rounded-lg text-primary font-body-sm text-body-sm hover:bg-primary/5 transition-colors">
                            + Add to Queue
                        </button>
</section>
<!-- Quick Insights / Stats -->
<section class="bg-primary rounded-xl p-8 text-white relative overflow-hidden">
<div class="relative z-10">
<h4 class="font-label-caps text-label-caps text-primary-fixed mb-6">INTELLIGENCE OVERVIEW</h4>
<div class="space-y-6">
<div>
<div class="flex justify-between text-body-sm mb-2">
<span>Monthly Token Usage</span>
<span class="font-bold">64%</span>
</div>
<div class="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
<div class="h-full bg-primary-fixed rounded-full" style="width: 64%"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
<div>
<p class="text-3xl font-headline-sm">12</p>
<p class="text-[11px] text-primary-fixed uppercase tracking-wider">Sermons Analysed</p>
</div>
<div>
<p class="text-3xl font-headline-sm">48</p>
<p class="text-[11px] text-primary-fixed uppercase tracking-wider">Posts Created</p>
</div>
</div>
</div>
</div>
<!-- Abstract Background Element -->
<div class="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-30"></div>
</section>
<!-- Help / Tips -->
<div class="p-6 border border-outline-variant rounded-xl bg-surface-container-low">
<div class="flex items-center gap-2 text-secondary mb-3">
<span class="material-symbols-outlined text-sm">lightbulb</span>
<span class="font-label-caps text-label-caps uppercase">Pro Tip</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant italic">
                            "Connect your YouTube account to automatically pull livestreams as soon as they end."
                        </p>
</div>
</div>
</div>
</div>
</main>
<!-- Micro-interaction Scripts -->
<script>
        // Simple hover lift effect for cards
        document.querySelectorAll('.ambient-glow').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'all 0.3s ease';
                card.style.boxShadow = '0 10px 30px rgba(45, 52, 54, 0.08)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 24px rgba(45, 52, 54, 0.04)';
            });
        });
    </script>
</body></html>

<!-- Church Intelligence Profile -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Church Profile | Well Nest</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "secondary": "#8a4f37",
                        "on-tertiary-fixed": "#1b1c19",
                        "on-error-container": "#93000a",
                        "on-surface-variant": "#434842",
                        "surface-tint": "#516351",
                        "primary-container": "#677966",
                        "on-primary": "#ffffff",
                        "secondary-fixed": "#ffdbce",
                        "tertiary-fixed": "#e4e2dd",
                        "secondary-fixed-dim": "#ffb599",
                        "on-primary-fixed": "#0f1f11",
                        "surface-dim": "#d4dbdd",
                        "on-primary-container": "#f7fff2",
                        "on-secondary-container": "#7a412a",
                        "inverse-primary": "#b8ccb6",
                        "surface": "#f4fafd",
                        "error": "#ba1a1a",
                        "primary-fixed": "#d4e8d1",
                        "surface-bright": "#f4fafd",
                        "on-secondary-fixed-variant": "#6e3822",
                        "on-background": "#161d1f",
                        "tertiary-fixed-dim": "#c8c6c2",
                        "on-secondary-fixed": "#370e00",
                        "tertiary-container": "#757571",
                        "surface-container-low": "#eef5f7",
                        "surface-variant": "#dde4e6",
                        "outline-variant": "#c4c8c0",
                        "surface-container-lowest": "#ffffff",
                        "on-tertiary-fixed-variant": "#474744",
                        "on-error": "#ffffff",
                        "primary-fixed-dim": "#b8ccb6",
                        "inverse-surface": "#2b3234",
                        "tertiary": "#5c5c58",
                        "surface-container-high": "#e2e9ec",
                        "on-surface": "#161d1f",
                        "on-primary-fixed-variant": "#3a4b3a",
                        "error-container": "#ffdad6",
                        "inverse-on-surface": "#ebf2f4",
                        "outline": "#747872",
                        "on-tertiary-container": "#fefcf7",
                        "on-secondary": "#ffffff",
                        "surface-container": "#e8eff1",
                        "primary": "#4f604f",
                        "surface-container-highest": "#dde4e6",
                        "on-tertiary": "#ffffff",
                        "secondary-container": "#ffb193",
                        "background": "#f4fafd"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "8px",
                        "margin-desktop": "64px",
                        "margin-mobile": "20px",
                        "section-gap": "80px",
                        "gutter": "24px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "headline-md": ["Source Serif 4"],
                        "display-lg": ["Source Serif 4"],
                        "body-md": ["Plus Jakarta Sans"],
                        "body-sm": ["Plus Jakarta Sans"],
                        "headline-sm": ["Source Serif 4"],
                        "body-lg": ["Plus Jakarta Sans"],
                        "label-caps": ["Plus Jakarta Sans"],
                        "display-lg-mobile": ["Source Serif 4"]
                    },
                    "fontSize": {
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "500"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "500"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "display-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "600"}]
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .glow-shadow { box-shadow: 0 4px 24px rgba(45, 52, 54, 0.04); }
        .inner-bleed { padding-left: 32px; padding-right: 32px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-surface text-on-surface">
<!-- SideNavBar (Shared Component) -->
<aside class="h-full w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-inverse-surface border-r border-outline-variant flex flex-col py-unit z-50">
<div class="px-gutter mb-8">
<h1 class="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed mb-1">Well Nest</h1>
<p class="font-body-md text-body-sm opacity-70">Faith-Based Wellness</p>
</div>
<nav class="flex-1 space-y-1">
<a class="flex items-center px-gutter py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group" href="#">
<span class="material-symbols-outlined mr-3">analytics</span>
<span class="font-body-md text-body-md">Market Matrix</span>
</a>
<a class="flex items-center px-gutter py-3 text-primary dark:text-primary-fixed font-bold border-r-2 border-primary hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors" href="#">
<span class="material-symbols-outlined mr-3" style="font-variation-settings: 'FILL' 1;">psychology</span>
<span class="font-body-md text-body-md">Sermon Intelligence</span>
</a>
<a class="flex items-center px-gutter py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors" href="#">
<span class="material-symbols-outlined mr-3">grid_view</span>
<span class="font-body-md text-body-md">Content Studio</span>
</a>
<a class="flex items-center px-gutter py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors" href="#">
<span class="material-symbols-outlined mr-3">waves</span>
<span class="font-body-md text-body-md">Retreat Funnel</span>
</a>
</nav>
<div class="px-4 mt-auto">
<button class="w-full bg-primary text-on-primary font-body-md py-3 rounded-full hover:opacity-90 transition-opacity">
                Start New Session
            </button>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 min-h-screen">
<!-- TopNavBar (Shared Component) -->
<header class="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface dark:bg-on-background shadow-sm flex justify-between items-center px-gutter z-40">
<div class="flex items-center gap-4 flex-1">
<div class="relative w-full max-w-md">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary text-body-sm" placeholder="Search churches or intelligence..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<button class="relative hover:text-primary transition-colors active:scale-95">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<div class="flex items-center gap-3">
<div class="text-right">
<p class="font-body-md text-body-sm font-bold">Admin Portal</p>
<p class="font-body-md text-[10px] text-on-surface-variant uppercase tracking-wider">Well Nest HQ</p>
</div>
<img alt="User Profile" class="w-10 h-10 rounded-full bg-surface-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNZ9JrGeUcDR0r3dki5qM1I3MYIx98sMVeI2ZMopL4ybS6ve9ISiH5PAT80nJr-EGibtZBVH9g8GXTlhvSLtk99ZUykri56Bic5lMBAHMzNT0xB3jYIignxic7Dw1XX09Cx6vWbfjzni8GrklLvAuvlZSsFVn9_IfNPqfQV7HfX38-IaenTSZefFcnBjFLKA3C03Og_Y9WbBzozNeAEjTUwlhT8ilz8vVZsIoPyc5hNkSHU2O0rg7SGeVevDlKrOUQCaOXQONycwzl"/>
</div>
</div>
</header>
<!-- Profile Header Section -->
<section class="mt-16 pt-12 pb-8 px-12 bg-surface-container-lowest">
<div class="max-w-container-max mx-auto">
<div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
<div class="flex items-center gap-6">
<div class="w-24 h-24 rounded-2xl bg-primary-fixed flex items-center justify-center overflow-hidden">
<img alt="Grace Community Logo" class="w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxyUn49DyhauvLY_dTuOsdE9mrZPUxmPD6GClOogBjGVyPcSr5GNwKsZrrsaw9VCwOW3yAN9RQxRK_mc0FYKx93eYH6Zb7tdJ9k5U85nTzP5h__AVAnAdY3ydOjy4_0hRgrlxIUfcBFw2VrBI7zhPbTzcn_buYBLY8WVp-i8XSlLGQDedDNfZ_iqlWxT4zCNgxi92WSZqpBuG65qkZNX9mppynM4FDmDtToQ0_JJpNVPCar7Au3CQ5FOaxBGm2-51BdCjKsVngr-wN"/>
</div>
<div>
<h2 class="font-display-lg text-display-lg text-on-surface">Grace Community Chapel</h2>
<div class="flex items-center gap-4 mt-2 text-on-surface-variant">
<span class="flex items-center gap-1 font-body-md text-body-md">
<span class="material-symbols-outlined text-primary text-[18px]">location_on</span>
                                    Nashville, Tennessee
                                </span>
<span class="w-1 h-1 bg-outline-variant rounded-full"></span>
<span class="flex items-center gap-1 font-body-md text-body-md">
<span class="material-symbols-outlined text-primary text-[18px]">person</span>
                                    Lead Pastor: David Sterling
                                </span>
</div>
</div>
</div>
<div class="flex gap-3 pb-2">
<button class="px-6 py-2.5 rounded-full border-[1.5px] border-primary text-primary font-body-md text-body-md hover:bg-primary-fixed transition-colors">Edit Profile</button>
<button class="px-6 py-2.5 rounded-full bg-primary text-on-primary font-body-md text-body-md hover:opacity-90 transition-opacity flex items-center gap-2">
<span class="material-symbols-outlined text-[20px]">share</span>
                            Export Report
                        </button>
</div>
</div>
</div>
</section>
<!-- Dashboard Content -->
<div class="px-12 py-section-gap max-w-container-max mx-auto space-y-section-gap">
<!-- Wisdom Sources: Extracted Themes -->
<section id="wisdom-sources">
<div class="flex items-center justify-between mb-8">
<div>
<h3 class="font-headline-md text-headline-md text-on-surface">Wisdom Sources</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-1 text-on-surface-variant">Extracted core themes and programs from digital assets.</p>
</div>
<button class="text-secondary font-label-caps uppercase hover:underline decoration-secondary">Refresh Scan</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Theme Card 1 -->
<div class="p-6 bg-surface-container-lowest rounded-xl glow-shadow border border-outline-variant hover:border-secondary transition-colors group">
<div class="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center text-primary mb-4">
<span class="material-symbols-outlined">auto_awesome</span>
</div>
<h4 class="font-headline-sm text-headline-sm mb-2">Restorative Sabbath</h4>
<p class="font-body-md text-body-sm text-on-surface-variant mb-6 leading-relaxed">Central theme emphasizing the biblical mandate for rest and digital detox within the modern household.</p>
<div class="flex flex-wrap gap-2">
<span class="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-label-caps text-on-surface-variant uppercase">Sermon Series</span>
<span class="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-label-caps text-on-surface-variant uppercase">Workshop</span>
</div>
</div>
<!-- Theme Card 2 -->
<div class="p-6 bg-surface-container-lowest rounded-xl glow-shadow border border-outline-variant hover:border-secondary transition-colors group">
<div class="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center text-primary mb-4">
<span class="material-symbols-outlined">family_restroom</span>
</div>
<h4 class="font-headline-sm text-headline-sm mb-2">Intergenerational Liturgy</h4>
<p class="font-body-md text-body-sm text-on-surface-variant mb-6 leading-relaxed">Identified program focus on bridging the age gap during worship through shared tactile experiences.</p>
<div class="flex flex-wrap gap-2">
<span class="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-label-caps text-on-surface-variant uppercase">Community</span>
<span class="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-label-caps text-on-surface-variant uppercase">Ongoing</span>
</div>
</div>
<!-- Theme Card 3 -->
<div class="p-6 bg-surface-container-lowest rounded-xl glow-shadow border border-outline-variant hover:border-secondary transition-colors group">
<div class="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center text-primary mb-4">
<span class="material-symbols-outlined">eco</span>
</div>
<h4 class="font-headline-sm text-headline-sm mb-2">Creation Stewardship</h4>
<p class="font-body-md text-body-sm text-on-surface-variant mb-6 leading-relaxed">Spring retreat theme focusing on environmental responsibility as a spiritual practice.</p>
<div class="flex flex-wrap gap-2">
<span class="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-label-caps text-on-surface-variant uppercase">Retreat</span>
<span class="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-label-caps text-on-surface-variant uppercase">New</span>
</div>
</div>
</div>
</section>
<!-- Sermon Intelligence: Data Table -->
<section id="sermon-intelligence">
<div class="mb-8">
<h3 class="font-headline-md text-headline-md text-on-surface">Sermon Intelligence</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Manage processing and insights for all weekly teaching content.</p>
</div>
<div class="bg-surface-container-lowest rounded-xl glow-shadow border border-outline-variant overflow-hidden">
<table class="w-full text-left">
<thead>
<tr class="border-b border-outline-variant bg-surface-container-low">
<th class="px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Sermon Title</th>
<th class="px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Speaker</th>
<th class="px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Date</th>
<th class="px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Status</th>
<th class="px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-gutter py-6">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-lg bg-tertiary-fixed-dim flex-shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface">play_circle</span>
</div>
<div>
<p class="font-body-md text-body-md font-bold">The Rhythm of Presence</p>
<p class="text-[12px] text-on-surface-variant">Sabbath Series Part 4</p>
</div>
</div>
</td>
<td class="px-gutter py-6 font-body-md text-body-md">David Sterling</td>
<td class="px-gutter py-6 font-body-md text-body-md text-on-surface-variant">Oct 22, 2023</td>
<td class="px-gutter py-6">
<span class="inline-flex items-center gap-1.5 text-primary">
<span class="w-2 h-2 bg-primary rounded-full"></span>
<span class="font-body-md text-body-sm font-medium">Processed</span>
</span>
<p class="text-[10px] text-on-surface-variant mt-1">Last Extracted: Oct 24, 2023</p>
</td>
<td class="px-gutter py-6 text-right space-x-4">
<button class="text-primary hover:text-on-primary-fixed-variant transition-colors text-body-sm font-bold">View Insights</button>
<button class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">Re-extract</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-gutter py-6">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-lg bg-tertiary-fixed-dim flex-shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface">play_circle</span>
</div>
<div>
<p class="font-body-md text-body-md font-bold">Living in the Tension</p>
<p class="text-[12px] text-on-surface-variant">Weekly Service</p>
</div>
</div>
</td>
<td class="px-gutter py-6 font-body-md text-body-md">Sarah Jenkins</td>
<td class="px-gutter py-6 font-body-md text-body-md text-on-surface-variant">Oct 15, 2023</td>
<td class="px-gutter py-6">
<span class="inline-flex items-center gap-1.5 text-secondary">
<span class="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
<span class="font-body-md text-body-sm font-medium">Unprocessed</span>
</span>
</td>
<td class="px-gutter py-6 text-right">
<button class="px-4 py-1.5 bg-primary text-on-primary rounded-full text-body-sm hover:opacity-90 transition-opacity">Scrape</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-gutter py-6">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-lg bg-tertiary-fixed-dim flex-shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface">play_circle</span>
</div>
<div>
<p class="font-body-md text-body-md font-bold">The Sacred Ordinary</p>
<p class="text-[12px] text-on-surface-variant">Special Guest Speaker</p>
</div>
</div>
</td>
<td class="px-gutter py-6 font-body-md text-body-md">Prof. Johnathan Lee</td>
<td class="px-gutter py-6 font-body-md text-body-md text-on-surface-variant">Oct 08, 2023</td>
<td class="px-gutter py-6">
<span class="inline-flex items-center gap-1.5 text-primary">
<span class="w-2 h-2 bg-primary rounded-full"></span>
<span class="font-body-md text-body-sm font-medium">Processed</span>
</span>
<p class="text-[10px] text-on-surface-variant mt-1">Last Extracted: Oct 10, 2023</p>
</td>
<td class="px-gutter py-6 text-right space-x-4">
<button class="text-primary hover:text-on-primary-fixed-variant transition-colors text-body-sm font-bold">View Insights</button>
<button class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">Re-extract</button>
</td>
</tr>
</tbody>
</table>
<div class="p-4 bg-surface-container border-t border-outline-variant text-center">
<button class="text-body-sm font-label-caps uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Load More Sermons</button>
</div>
</div>
</section>
<!-- Generated Content: Bento Gallery -->
<section id="generated-content">
<div class="mb-8">
<h3 class="font-headline-md text-headline-md text-on-surface">Generated Content Studio</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Social carousels and visual assets created from Grace Community teaching.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
<!-- Carousel 1 -->
<div class="md:col-span-2 group relative overflow-hidden rounded-2xl aspect-[16/10] bg-surface-container-highest">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A sophisticated 10-slide social media carousel preview showing elegant typography overlays on serene nature backgrounds of forests and streams. The design features a warm sage green and terracotta color palette with a modern, high-end editorial feel. Soft glowing lighting creates a sense of peace and digital Sabbath, perfectly aligning with a faith-based wellness brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZDP74t4BxLf0S0JWLwSTsrBh0ji-eH43YFHb1le7_VOPHz8O82SBZer_SgeQCJiCNoFM48lAyZmnu7vmpg6dLOCyhXrLEFsgTG-8iaZ_Xo_pw-AnAdt-U0Gc_rRSRuvl0MqUsHeesb8lMqD87yOc1Iu1VXz8e4STBIXJ7-xQSprqcoTiFxj4A4_smAfX-OTilj_FEuJ4lsITDZXYa_jCvhVeGZAX76K34d7p-XfgblZJSbGFts2miyNVDMQHWYqKU8p9JhZDBzf0"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
<h5 class="text-white font-headline-sm">Rhythm of Presence Series</h5>
<p class="text-white/80 font-body-sm mb-4">10 Slide Carousel • Instagram Grid</p>
<div class="flex gap-2">
<button class="px-4 py-2 bg-white text-on-surface rounded-full text-body-sm font-bold">Edit</button>
<button class="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-body-sm">Download</button>
</div>
</div>
</div>
<!-- Carousel 2 -->
<div class="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-container-highest">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A vertical visual asset for a social media story featuring a minimalist interior with warm morning light streaming through a window onto an open book. Subtle sage green accents and terracotta highlights are used in the text elements. The mood is calm, restorative, and grounded, emphasizing high-end corporate modern aesthetics with significant breathable whitespace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCky0nx1j-03hBMEzVyHWTC5kTuvP3uchSRVdKIkTxn1UNaHChtFG6SIvKfsNzfpLZPFrpY7nLNGxWPmhESfNLaiFTf8zyaFPyrlMzUCNjAy-rw5KTu5wv8TIL-UiTtpULrmP-jUNDJ_esr0aOv-LqTOkNHYDjlmPpUXpmckv97zWHJ1IDwGiCO8tAEdD0Xe3OLXudJdFOH7TQl4VBxtd77mUycSQrBWLRqwghvsK_D6REkXEbABLWx4P4xYRqchnkccG6DIV_6Wnhj"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
<h5 class="text-white font-body-md font-bold">Daily Mindfulness</h5>
<button class="mt-2 text-white/90 text-body-sm flex items-center gap-1">Open Studio <span class="material-symbols-outlined text-[16px]">arrow_forward</span></button>
</div>
</div>
<!-- Carousel 3 -->
<div class="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-container-highest">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A beautiful social media card featuring a soft-focus landscape at dusk with a gentle orange glow on the horizon. Overlaid with clean, modern sans-serif typography presenting a faith-based quote in a terracotta color. The visual style is tactile and premium, avoiding the frantic energy of SaaS platforms to promote a reflective and focused user experience." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYKGHKJUw7b93eAw3sfbPNNay3QUDbLBJSWXdSZa_y2p0kzxvLePgqMHL8iYBiU-XPs7Pk9uazclBEUsdCB0DnmPnW_LDDfERHtdI79j4XZPo9DMkoIFwPKEq77Tut32Bgmy42TE6Xl1Ur1vD7ForNQt2fxLuupymT7c3CRyZEMr6iK0N9qiUn5m3rFKxVmTXM_ZWYM2uGdjMfud-pKViCl2mP3YNYuB4U2pi9R3DJ2I-Ieeo5Ynd0haXufa8-j1ZiNdB3LyhQQRol"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
<h5 class="text-white font-body-md font-bold">Quote Assets</h5>
<button class="mt-2 text-white/90 text-body-sm flex items-center gap-1">Open Studio <span class="material-symbols-outlined text-[16px]">arrow_forward</span></button>
</div>
</div>
</div>
</section>
<!-- Bottom Section: Community & Contacts -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
<!-- Community Members -->
<section class="lg:col-span-2" id="community-members">
<div class="mb-6 flex items-center justify-between">
<div>
<h3 class="font-headline-md text-headline-md text-on-surface">Community Members</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Congregants active in the Well Nest Facebook Group.</p>
</div>
<span class="px-3 py-1 bg-secondary-fixed text-on-secondary-container rounded-full text-body-sm font-bold">42 Active</span>
</div>
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant p-2 glow-shadow">
<div class="divide-y divide-outline-variant">
<!-- Member 1 -->
<div class="flex items-center justify-between p-4 hover:bg-surface-container transition-colors rounded-lg">
<div class="flex items-center gap-4">
<img alt="Felix member profile" class="w-12 h-12 rounded-full bg-surface-variant border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkBpWa_tPJBC9Iup6QidErTWY1EPblkzg3LGeRKX7P50WniXchzZk6hzEZhRGqsTd3vup1m5U9WgY88kJj8VMiB7APTiZsJOMZKkOACNmFeueT1cZC-5HGYsQMh3aoHa7vrKlQnJXXbzKYyOLKKXUGMyUcXckAhUdfGHYedHg-IrKoClWoykfKl8UvQEqkFSMLlGNg3TOL30r8jmS5Iu5GK32BFJ8vWHWP1Qa3rsYDKPNK86Xch3YtSSCKZt64C8uTaPS0p_RqnnRh"/>
<div>
<p class="font-body-md text-body-md font-bold">Felix Thompson</p>
<p class="text-body-sm text-on-surface-variant">Joined 2 weeks ago</p>
</div>
</div>
<button class="px-4 py-1.5 border border-outline rounded-full text-body-sm hover:bg-surface-container-high transition-colors">View Profile</button>
</div>
<!-- Member 2 -->
<div class="flex items-center justify-between p-4 hover:bg-surface-container transition-colors rounded-lg">
<div class="flex items-center gap-4">
<img alt="Avery member profile" class="w-12 h-12 rounded-full bg-surface-variant border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWDdnj_tws8GKtQw4hk-RQVrXmU59GtHSCsWQD58AQV7mO2MNyX97MLmTz-0npBV0gzbThklyAUCLSDz26BuVHudFtdPJdm5jW25XzZxMgFAUiPCeVhSS5JLYIWNSn3jazZ_0KbhWWbIEdlZcnP57m-zSaYUP1-UWjxJ9G_jn9aijocnkOJYKxeqz-myy8x-9qGH12W9MEJxgXyYTzOPaA2j8lTyACn4pvthCQFkNebCqF8DUcbdtnWqhCKDGnUae0FvdyoiQMsyaw"/>
<div>
<p class="font-body-md text-body-md font-bold">Avery Sinclair</p>
<p class="text-body-sm text-on-surface-variant">Joined 1 month ago</p>
</div>
</div>
<button class="px-4 py-1.5 border border-outline rounded-full text-body-sm hover:bg-surface-container-high transition-colors">View Profile</button>
</div>
<!-- Member 3 -->
<div class="flex items-center justify-between p-4 hover:bg-surface-container transition-colors rounded-lg">
<div class="flex items-center gap-4">
<img alt="Jordan member profile" class="w-12 h-12 rounded-full bg-surface-variant border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7XQoAyqxfakWuxLFBCIKW7uFGFtgl_DFsMBRvaTvPP6kNFpOtNXE-oGW7vzrj0_uupCZSywM7A82re8YhjIH0Tfa_kTbRo77hDX69kpWpT3Wx3YLEeggr9UNbSTqLZye3SPZvjFixhgsRRadK3DFdX2CFW-7CZrHAagk5mBErdbtC-nNNrYCUmo5scHNZA8oi0SeUskaGkoafg8jIsIXvXY4rKhGBI5HNNhLXkTUHKzRwmENPXm1FcqNdRcJEKjtZGc0K2il9tZtj"/>
<div>
<p class="font-body-md text-body-md font-bold">Jordan Miller</p>
<p class="text-body-sm text-on-surface-variant">Joined 3 days ago</p>
</div>
</div>
<button class="px-4 py-1.5 border border-outline rounded-full text-body-sm hover:bg-surface-container-high transition-colors">View Profile</button>
</div>
</div>
</div>
</section>
<!-- Contacts Section -->
<section id="contacts">
<div class="mb-6">
<h3 class="font-headline-md text-headline-md text-on-surface">Key Contacts</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Direct point-of-contact for Grace Community.</p>
</div>
<div class="space-y-4">
<!-- Contact 1 -->
<div class="p-4 bg-surface-container-low rounded-xl border-l-4 border-primary">
<h5 class="font-body-md text-body-md font-bold">David Sterling</h5>
<p class="text-body-sm text-on-surface-variant mb-3">Lead Pastor &amp; Creative Director</p>
<div class="flex items-center gap-4 text-primary">
<a class="hover:underline text-body-sm" href="mailto:david@gracechapel.org">Email</a>
<span class="w-1 h-1 bg-outline-variant rounded-full"></span>
<a class="hover:underline text-body-sm" href="#">Phone</a>
</div>
</div>
<!-- Contact 2 -->
<div class="p-4 bg-surface-container-low rounded-xl border-l-4 border-secondary">
<h5 class="font-body-md text-body-md font-bold">Sarah Jenkins</h5>
<p class="text-body-sm text-on-surface-variant mb-3">Community Coordinator</p>
<div class="flex items-center gap-4 text-primary">
<a class="hover:underline text-body-sm" href="mailto:sarah.j@gracechapel.org">Email</a>
<span class="w-1 h-1 bg-outline-variant rounded-full"></span>
<a class="hover:underline text-body-sm" href="#">Messenger</a>
</div>
</div>
<!-- Contact 3 -->
<div class="p-4 bg-surface-container-low rounded-xl border-l-4 border-tertiary-container">
<h5 class="font-body-md text-body-md font-bold">Michael Wu</h5>
<p class="text-body-sm text-on-surface-variant mb-3">Technical Director</p>
<div class="flex items-center gap-4 text-primary">
<a class="hover:underline text-body-sm" href="mailto:mwu@gracechapel.org">Email</a>
</div>
</div>
<button class="w-full py-4 rounded-xl border-[1.5px] border-dashed border-outline-variant text-on-surface-variant font-label-caps uppercase text-label-caps hover:bg-surface-container transition-colors">
                            + Add New Contact
                        </button>
</div>
</section>
</div>
</div>
<!-- Footer Footer -->
<footer class="mt-section-gap py-12 px-12 border-t border-outline-variant bg-surface-container-low text-on-surface-variant">
<div class="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-primary">Well Nest</span>
<span class="text-body-sm">© 2023 Digital Sabbath Inc.</span>
</div>
<div class="flex gap-8">
<a class="text-body-sm hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="text-body-sm hover:text-primary transition-colors" href="#">Terms of Intelligence</a>
<a class="text-body-sm hover:text-primary transition-colors" href="#">Support Portal</a>
</div>
</div>
</footer>
</main>
<!-- Contextual FAB (Shared Component Strategy) -->
<button class="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-50 group">
<span class="material-symbols-outlined text-[28px]">smart_toy</span>
<span class="absolute right-full mr-4 bg-inverse-surface text-inverse-on-surface px-3 py-1.5 rounded-lg text-body-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Ask Assistant</span>
</button>
<script>
        // Simple Interaction logic
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('mousedown', () => {
                button.classList.add('scale-95');
            });
            button.addEventListener('mouseup', () => {
                button.classList.remove('scale-95');
            });
        });

        // Search Bar Focus Effect
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('ring-1', 'ring-primary');
        });
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('ring-1', 'ring-primary');
        });
    </script>
</body></html>

<!-- Market Matrix Research Hub -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Market Matrix | Well Nest</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#4f604f",
                        "secondary": "#8a4f37",
                        "primary-container": "#677966",
                        "primary-fixed-dim": "#b8ccb6",
                        "on-primary-fixed": "#0f1f11",
                        "on-surface": "#161d1f",
                        "error-container": "#ffdad6",
                        "tertiary": "#5c5c58",
                        "tertiary-fixed-dim": "#c8c6c2",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#eef5f7",
                        "on-error": "#ffffff",
                        "on-tertiary-fixed": "#1b1c19",
                        "primary-fixed": "#d4e8d1",
                        "on-tertiary-fixed-variant": "#474744",
                        "tertiary-container": "#757571",
                        "outline": "#747872",
                        "surface": "#f4fafd",
                        "on-surface-variant": "#434842",
                        "on-primary-container": "#f7fff2",
                        "surface-variant": "#dde4e6",
                        "surface-container-highest": "#dde4e6",
                        "on-tertiary-container": "#fefcf7",
                        "secondary-fixed-dim": "#ffb599",
                        "surface-container": "#e8eff1",
                        "secondary-fixed": "#ffdbce",
                        "on-secondary-container": "#7a412a",
                        "inverse-on-surface": "#ebf2f4",
                        "secondary-container": "#ffb193",
                        "error": "#ba1a1a",
                        "on-secondary-fixed-variant": "#6e3822",
                        "on-error-container": "#93000a",
                        "on-background": "#161d1f",
                        "outline-variant": "#c4c8c0",
                        "on-secondary-fixed": "#370e00",
                        "background": "#f4fafd",
                        "tertiary-fixed": "#e4e2dd",
                        "on-primary-fixed-variant": "#3a4b3a",
                        "inverse-surface": "#2b3234",
                        "surface-bright": "#f4fafd",
                        "on-secondary": "#ffffff",
                        "on-tertiary": "#ffffff",
                        "on-primary": "#ffffff",
                        "surface-tint": "#516351",
                        "surface-dim": "#d4dbdd",
                        "surface-container-high": "#e2e9ec",
                        "inverse-primary": "#b8ccb6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "8px",
                        "gutter": "24px",
                        "section-gap": "80px",
                        "margin-mobile": "20px",
                        "margin-desktop": "64px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "label-caps": ["Plus Jakarta Sans"],
                        "headline-sm": ["Source Serif 4"],
                        "headline-md": ["Source Serif 4"],
                        "display-lg-mobile": ["Source Serif 4"],
                        "body-sm": ["Plus Jakarta Sans"],
                        "body-lg": ["Plus Jakarta Sans"],
                        "display-lg": ["Source Serif 4"],
                        "body-md": ["Plus Jakarta Sans"]
                    },
                    "fontSize": {
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "500"}],
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "500"}],
                        "display-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .ambient-glow {
            box-shadow: 0 4px 24px rgba(45, 52, 54, 0.04);
        }
        .inner-bleed {
            padding: 32px;
        }
        .table-divider {
            border-bottom: 1px solid #E1E5E1;
        }
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f4fafd;
        }
        ::-webkit-scrollbar-thumb {
            background: #dde4e6;
            border-radius: 10px;
        }
    </style>
</head>
<body class="bg-surface text-on-surface font-body-md overflow-hidden">
<!-- SideNavBar -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 px-6 z-50">
<div class="mb-12">
<div class="flex items-center gap-3 mb-1">
<span class="material-symbols-outlined text-primary text-3xl">spa</span>
<h1 class="font-headline-sm text-headline-sm text-primary">Well Nest</h1>
</div>
<p class="font-body-sm text-on-surface-variant opacity-70">Faith-Based Wellness</p>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container transition-all duration-200" href="#">
<span class="material-symbols-outlined">insights</span>
<span class="font-body-md">Market Matrix</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">psychology</span>
<span class="font-body-md">Intelligence Hub</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">grid_view</span>
<span class="font-body-md">Content Library</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">auto_graph</span>
<span class="font-body-md">Retreat Funnel</span>
</a>
</nav>
<div class="pt-8 mt-8 border-t border-outline-variant/30 space-y-2">
<button class="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-full font-body-md hover:opacity-90 active:scale-95 transition-all shadow-sm">
<span class="material-symbols-outlined text-sm">add</span>
                New Strategy
            </button>
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors mt-4" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-body-md">Settings</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">help_outline</span>
<span class="font-body-md">Support</span>
</a>
</div>
</aside>
<!-- Main Content Area -->
<main class="ml-64 flex flex-col h-screen overflow-hidden">
<!-- TopAppBar -->
<header class="h-20 w-full flex justify-between items-center px-gutter bg-surface/80 backdrop-blur-md sticky top-0 z-40">
<div class="flex items-center bg-surface-container px-4 py-2 rounded-full w-96">
<span class="material-symbols-outlined text-on-surface-variant mr-2">search</span>
<input class="bg-transparent border-none focus:ring-0 text-body-sm w-full" placeholder="Search matrices..." type="text"/>
</div>
<div class="flex items-center gap-6">
<button class="relative text-on-surface-variant hover:text-secondary active:scale-95 transition-all">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<div class="flex items-center gap-3 group cursor-pointer">
<div class="text-right">
<p class="font-label-caps text-on-surface">Director</p>
<p class="text-xs text-on-surface-variant">Atlanta Region</p>
</div>
<img alt="User Profile" class="w-10 h-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-_0e9WK-uJoiayDLoJ9VjWGYSP_WLRdNdMnkzRgpqrJWjEaSKYwqmPVsGpivxlhdTJABlN5o7MxdipFGQ4G2wDZtaBpltnRRREIe7MjcLivP82RZ0gXrgXYoD53Sq3Yscl01KkhsMoc57cs-7CJ0NibQfQR4WRcKBB_-LnCeeEDNMTtVHXItUKSdNzDhqIfqYLNOuzrpd1_vmZGLuDdDpctLWmsys0nK6uXINObpqZBE7v0IQnIVPgVmziJ2knqwPWl6fBE1iIoQ1"/>
</div>
</div>
</header>
<!-- Canvas -->
<div class="flex-1 overflow-y-auto inner-bleed">
<div class="max-w-container-max mx-auto space-y-10 pb-20">
<!-- Page Header & Stats -->
<div class="flex justify-between items-end">
<div class="space-y-1">
<h2 class="font-headline-md text-headline-md text-primary">Market Matrix</h2>
<p class="font-body-md text-on-surface-variant max-w-lg">Advanced research engine for faith-based community growth and outreach mapping across the Greater Atlanta area.</p>
</div>
<div class="flex gap-4">
<button class="flex items-center gap-2 px-6 py-2.5 border-1.5 border-primary text-primary rounded-full font-body-md hover:bg-primary/5 transition-colors">
<span class="material-symbols-outlined text-sm">filter_list</span>
                            Filters
                        </button>
<button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-body-md hover:opacity-90 active:scale-95 transition-all ambient-glow">
<span class="material-symbols-outlined text-sm">church</span>
                            Add New Church
                        </button>
</div>
</div>
<!-- Metrics Dashboard (Tactile Twist) -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
<div class="bg-surface-container-lowest p-6 rounded-xl ambient-glow border border-outline-variant/30">
<p class="font-label-caps text-on-surface-variant mb-2">Total Communities</p>
<p class="text-4xl font-headline-md text-primary">142</p>
<div class="mt-4 flex items-center gap-1 text-primary text-xs">
<span class="material-symbols-outlined text-sm">trending_up</span>
<span>12% from last month</span>
</div>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl ambient-glow border border-outline-variant/30">
<p class="font-label-caps text-on-surface-variant mb-2">Livestream Active</p>
<p class="text-4xl font-headline-md text-secondary">89</p>
<div class="mt-4 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary w-[62%]"></div>
</div>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl ambient-glow border border-outline-variant/30">
<p class="font-label-caps text-on-surface-variant mb-2">Outreach Engagement</p>
<p class="text-4xl font-headline-md text-tertiary">2.4k</p>
<p class="mt-4 text-xs text-on-surface-variant">Estimated weekly impact</p>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl ambient-glow border border-outline-variant/30">
<p class="font-label-caps text-on-surface-variant mb-2">Active Funnels</p>
<p class="text-4xl font-headline-md text-primary-container">18</p>
<div class="mt-4 flex -space-x-2">
<div class="w-6 h-6 rounded-full bg-primary-fixed border border-white"></div>
<div class="w-6 h-6 rounded-full bg-secondary-fixed border border-white"></div>
<div class="w-6 h-6 rounded-full bg-tertiary-fixed border border-white"></div>
</div>
</div>
</div>
<!-- High-Density Data Table -->
<div class="bg-white rounded-xl ambient-glow border border-outline-variant/20 overflow-hidden">
<div class="p-6 border-b border-outline-variant/20 flex flex-wrap gap-4 items-center justify-between bg-surface-container-low/30">
<div class="flex gap-4">
<select class="bg-surface border-outline-variant rounded-lg text-body-sm px-4 py-2 focus:ring-primary focus:border-primary">
<option>Area: All Atlanta</option>
<option>Buckhead</option>
<option>Midtown</option>
<option>Decatur</option>
<option>Smyrna</option>
</select>
<select class="bg-surface border-outline-variant rounded-lg text-body-sm px-4 py-2 focus:ring-primary focus:border-primary">
<option>Denomination: All</option>
<option>Baptist</option>
<option>Episcopal</option>
<option>Non-Denominational</option>
<option>Methodist</option>
</select>
</div>
<div class="flex items-center gap-2 text-on-surface-variant">
<span class="font-body-sm">Showing 1-10 of 142</span>
<div class="flex gap-1 ml-4">
<button class="p-1 hover:bg-surface-container rounded transition-colors"><span class="material-symbols-outlined">chevron_left</span></button>
<button class="p-1 hover:bg-surface-container rounded transition-colors"><span class="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead>
<tr class="bg-surface-container-low/10">
<th class="py-4 px-6 font-label-caps text-on-surface-variant border-b border-outline-variant/20">Church Name</th>
<th class="py-4 px-6 font-label-caps text-on-surface-variant border-b border-outline-variant/20">Area</th>
<th class="py-4 px-6 font-label-caps text-on-surface-variant border-b border-outline-variant/20">Denomination</th>
<th class="py-4 px-6 font-label-caps text-on-surface-variant border-b border-outline-variant/20">Livestream</th>
<th class="py-4 px-6 font-label-caps text-on-surface-variant border-b border-outline-variant/20">Outreach Phase</th>
<th class="py-4 px-6 font-label-caps text-on-surface-variant border-b border-outline-variant/20">Status Badge</th>
<th class="py-4 px-6 font-label-caps text-on-surface-variant border-b border-outline-variant/20"></th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low/20 transition-colors group">
<td class="py-4 px-6">
<div class="font-body-md font-semibold text-primary">Northside Community Church</div>
<div class="text-xs text-on-surface-variant opacity-60">est. 1954</div>
</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Buckhead</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Non-Denominational</td>
<td class="py-4 px-6">
<span class="flex items-center gap-1.5 text-xs font-medium text-primary">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                            Active
                                        </span>
</td>
<td class="py-4 px-6">
<div class="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary w-4/5"></div>
</div>
<span class="text-[10px] uppercase font-bold text-on-surface-variant mt-1 block">Expansion</span>
</td>
<td class="py-4 px-6">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed">
                                            Theme Extracted
                                        </span>
</td>
<td class="py-4 px-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low/20 transition-colors group">
<td class="py-4 px-6">
<div class="font-body-md font-semibold text-primary">Grace Tabernacle</div>
<div class="text-xs text-on-surface-variant opacity-60">est. 1982</div>
</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Midtown</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Baptist</td>
<td class="py-4 px-6">
<span class="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
<span class="w-2 h-2 rounded-full bg-outline-variant"></span>
                                            Inactive
                                        </span>
</td>
<td class="py-4 px-6">
<div class="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary w-1/4"></div>
</div>
<span class="text-[10px] uppercase font-bold text-on-surface-variant mt-1 block">Discovery</span>
</td>
<td class="py-4 px-6">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-fixed text-on-secondary-fixed">
                                            Initial Contact
                                        </span>
</td>
<td class="py-4 px-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low/20 transition-colors group">
<td class="py-4 px-6">
<div class="font-body-md font-semibold text-primary">St. Jude’s Episcopal</div>
<div class="text-xs text-on-surface-variant opacity-60">est. 1921</div>
</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Decatur</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Episcopal</td>
<td class="py-4 px-6">
<span class="flex items-center gap-1.5 text-xs font-medium text-primary">
<span class="w-2 h-2 rounded-full bg-primary"></span>
                                            Active
                                        </span>
</td>
<td class="py-4 px-6">
<div class="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary w-3/5"></div>
</div>
<span class="text-[10px] uppercase font-bold text-on-surface-variant mt-1 block">Mapping</span>
</td>
<td class="py-4 px-6">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed">
                                            Theme Extracted
                                        </span>
</td>
<td class="py-4 px-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-low/20 transition-colors group">
<td class="py-4 px-6">
<div class="font-body-md font-semibold text-primary">Piedmont Park Fellowship</div>
<div class="text-xs text-on-surface-variant opacity-60">est. 2012</div>
</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Midtown</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Non-Denominational</td>
<td class="py-4 px-6">
<span class="flex items-center gap-1.5 text-xs font-medium text-primary">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                            Active
                                        </span>
</td>
<td class="py-4 px-6">
<div class="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary w-full"></div>
</div>
<span class="text-[10px] uppercase font-bold text-on-surface-variant mt-1 block">Completed</span>
</td>
<td class="py-4 px-6">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-fixed text-on-tertiary-fixed">
                                            Matrixed
                                        </span>
</td>
<td class="py-4 px-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 5 -->
<tr class="hover:bg-surface-container-low/20 transition-colors group">
<td class="py-4 px-6">
<div class="font-body-md font-semibold text-primary">The Sanctuary at Brookhaven</div>
<div class="text-xs text-on-surface-variant opacity-60">est. 1999</div>
</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Brookhaven</td>
<td class="py-4 px-6 font-body-sm text-on-surface">Methodist</td>
<td class="py-4 px-6">
<span class="flex items-center gap-1.5 text-xs font-medium text-primary">
<span class="w-2 h-2 rounded-full bg-primary"></span>
                                            Active
                                        </span>
</td>
<td class="py-4 px-6">
<div class="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary w-2/5"></div>
</div>
<span class="text-[10px] uppercase font-bold text-on-surface-variant mt-1 block">Outreach</span>
</td>
<td class="py-4 px-6">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-fixed text-on-secondary-fixed">
                                            Initial Contact
                                        </span>
</td>
<td class="py-4 px-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Footer Context -->
<div class="flex flex-col md:flex-row gap-8 items-start">
<div class="flex-1 space-y-4">
<h3 class="font-headline-sm text-primary">Analytical Overview</h3>
<p class="text-body-sm text-on-surface-variant leading-relaxed">
                            The Market Matrix leverages natural language processing to extract core theological themes and outreach initiatives from weekly sermon livestreams. This data allows for precision-based community support planning.
                        </p>
<div class="flex gap-4 pt-4">
<div class="flex items-center gap-2 text-xs font-bold text-primary bg-primary-fixed px-3 py-1.5 rounded-md">
<span class="material-symbols-outlined text-sm">cloud_sync</span>
                                LAST SYNC: 12 MINUTES AGO
                            </div>
<div class="flex items-center gap-2 text-xs font-bold text-secondary bg-secondary-fixed px-3 py-1.5 rounded-md">
<span class="material-symbols-outlined text-sm">precision_manufacturing</span>
                                AI CONFIDENCE: 94%
                            </div>
</div>
</div>
<div class="w-full md:w-80 bg-surface-container-high rounded-xl p-6 relative overflow-hidden">
<div class="relative z-10">
<h4 class="font-label-caps text-on-surface mb-4">Activity Heatmap</h4>
<div class="h-40 w-full rounded-lg bg-surface/50 border border-white flex items-center justify-center">
<img class="w-full h-full object-cover opacity-60" data-alt="A sophisticated abstract data visualization map representing church density in Atlanta. The image uses a soft palette of sage green, terracotta, and slate grey with subtle glowing nodes and clean topographical lines. It creates a modern, high-tech research aesthetic that feels calm and professional, aligning with a light-mode UI design system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8Zx8GAfIs7c7DEZfffuUm0K2DlgtafGjV_pn6OZvCvP5cT5vAzoDifvkC9H3-_nwYKT-11MQh3OJJEnzgvOAtOskbCWxeFHzxfHMOMrLBUTGCuYsGJHIRWYmnS1s48fUzhdTNBg4oGXovjPcUHZK2CCxu3NhsWrWq1ZCW73xR12Ch7cs5JD3R2ptXQh6QId2FoESF_IzpvGAyETqTdmr_EHFgRGMv7O-E2RK8UUMSPm5Z_dZWhAs-0r5_GuV94b6CRAYKCgdVXaV5"/>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
<script>
        // Simple micro-interactions for the matrix UI
        document.querySelectorAll('tr').forEach(row => {
            row.addEventListener('click', () => {
                // Future expansion for row details
                console.log('Opening details for row...');
            });
        });

        // Search bar focus effect
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('ring-2', 'ring-primary/20', 'bg-white');
        });
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('ring-2', 'ring-primary/20', 'bg-white');
        });
    </script>
</body></html>

<!-- Content Intelligence Hub -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Intelligence Hub | Well Nest</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
        }
        .ambient-glow {
            box-shadow: 0 4px 24px rgba(45, 52, 54, 0.04);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #E1E5E1;
            border-radius: 10px;
        }
        .row-hover:hover {
            background-color: rgba(79, 96, 79, 0.02);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "primary": "#4f604f",
                      "secondary": "#8a4f37",
                      "primary-container": "#677966",
                      "primary-fixed-dim": "#b8ccb6",
                      "on-primary-fixed": "#0f1f11",
                      "on-surface": "#161d1f",
                      "error-container": "#ffdad6",
                      "tertiary": "#5c5c58",
                      "tertiary-fixed-dim": "#c8c6c2",
                      "surface-container-lowest": "#ffffff",
                      "surface-container-low": "#eef5f7",
                      "on-error": "#ffffff",
                      "on-tertiary-fixed": "#1b1c19",
                      "primary-fixed": "#d4e8d1",
                      "on-tertiary-fixed-variant": "#474744",
                      "tertiary-container": "#757571",
                      "outline": "#747872",
                      "surface": "#f4fafd",
                      "on-surface-variant": "#434842",
                      "on-primary-container": "#f7fff2",
                      "surface-variant": "#dde4e6",
                      "surface-container-highest": "#dde4e6",
                      "on-tertiary-container": "#fefcf7",
                      "secondary-fixed-dim": "#ffb599",
                      "surface-container": "#e8eff1",
                      "secondary-fixed": "#ffdbce",
                      "on-secondary-container": "#7a412a",
                      "inverse-on-surface": "#ebf2f4",
                      "secondary-container": "#ffb193",
                      "error": "#ba1a1a",
                      "on-secondary-fixed-variant": "#6e3822",
                      "on-error-container": "#93000a",
                      "on-background": "#161d1f",
                      "outline-variant": "#c4c8c0",
                      "on-secondary-fixed": "#370e00",
                      "background": "#f4fafd",
                      "tertiary-fixed": "#e4e2dd",
                      "on-primary-fixed-variant": "#3a4b3a",
                      "inverse-surface": "#2b3234",
                      "surface-bright": "#f4fafd",
                      "on-secondary": "#ffffff",
                      "on-tertiary": "#ffffff",
                      "on-primary": "#ffffff",
                      "surface-tint": "#516351",
                      "surface-dim": "#d4dbdd",
                      "surface-container-high": "#e2e9ec",
                      "inverse-primary": "#b8ccb6"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "unit": "8px",
                      "gutter": "24px",
                      "section-gap": "80px",
                      "margin-mobile": "20px",
                      "margin-desktop": "64px",
                      "container-max": "1280px"
              },
              "fontFamily": {
                      "label-caps": ["Plus Jakarta Sans"],
                      "headline-sm": ["Source Serif 4"],
                      "headline-md": ["Source Serif 4"],
                      "display-lg-mobile": ["Source Serif 4"],
                      "body-sm": ["Plus Jakarta Sans"],
                      "body-lg": ["Plus Jakarta Sans"],
                      "display-lg": ["Source Serif 4"],
                      "body-md": ["Plus Jakarta Sans"]
              },
              "fontSize": {
                      "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                      "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "500"}],
                      "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "500"}],
                      "display-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                      "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                      "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                      "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                      "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
              }
            },
          },
        }
    </script>
</head>
<body class="bg-surface text-on-surface font-body-md overflow-hidden">
<!-- Sidebar Navigation -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 px-6 z-50">
<div class="flex items-center gap-3 mb-10 px-2">
<div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">spa</span>
</div>
<div>
<h1 class="font-headline-sm text-headline-sm text-primary">Well Nest</h1>
<p class="text-[10px] uppercase tracking-widest text-on-surface-variant font-label-caps">Faith-Based Wellness</p>
</div>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-3 py-3 px-4 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors group" href="#">
<span class="material-symbols-outlined text-2xl group-hover:text-primary">insights</span>
<span class="font-body-md">Market Matrix</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-xl text-primary font-bold border-r-4 border-primary bg-surface-container-lowest transition-colors" href="#">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">psychology</span>
<span class="font-body-md">Intelligence Hub</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors group" href="#">
<span class="material-symbols-outlined text-2xl group-hover:text-primary">grid_view</span>
<span class="font-body-md">Content Library</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors group" href="#">
<span class="material-symbols-outlined text-2xl group-hover:text-primary">auto_graph</span>
<span class="font-body-md">Retreat Funnel</span>
</a>
</nav>
<div class="mt-auto pt-6 border-t border-outline-variant/30 space-y-2">
<button class="w-full bg-primary text-white py-3 px-4 rounded-full font-label-caps flex items-center justify-center gap-2 active:scale-95 transition-transform">
<span class="material-symbols-outlined text-sm">add</span>
                New Strategy
            </button>
<a class="flex items-center gap-3 py-3 px-4 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined text-2xl">settings</span>
<span class="font-body-md">Settings</span>
</a>
<a class="flex items-center gap-3 py-3 px-4 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined text-2xl">help_outline</span>
<span class="font-body-md">Support</span>
</a>
</div>
</aside>
<!-- Top App Bar -->
<header class="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-surface/80 backdrop-blur-md z-40 flex justify-between items-center px-10">
<div class="flex items-center gap-4 flex-1 max-w-xl">
<div class="relative w-full">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border-none rounded-full focus:ring-1 focus:ring-primary text-body-md" placeholder="Search insights, themes, or churches..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<button class="bg-secondary text-white px-6 py-2 rounded-full font-label-caps flex items-center gap-2 active:scale-95 transition-transform shadow-sm">
<span class="material-symbols-outlined text-[18px]">auto_awesome</span>
                Create Carousel Bundle
            </button>
<div class="flex items-center gap-4 border-l border-outline-variant/30 pl-6">
<button class="text-on-surface-variant hover:text-primary transition-colors relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full border-2 border-surface"></span>
</button>
<div class="flex items-center gap-3">
<div class="text-right hidden lg:block">
<p class="text-sm font-bold text-on-surface">Aunt Bev</p>
<p class="text-[10px] text-on-surface-variant uppercase tracking-tighter">Chief Strategist</p>
</div>
<img alt="User Profile" class="w-10 h-10 rounded-full border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOhFqaw3USrQwBE1BeI41Bmke_PSP9EHJOQh1vCbSqnORJAHEQvKROB6ko5GhjB1VharpwD9vrms4RDE1QspUJT0pxttthMh9j_4-jDfSPvRJhjM8lAfIqeq0MlVWNwu5dIOs_c3U0-kjkb0PgLDedAwL5pzjZlkdhBCMVGKLG_JRsxP7Fjk919iqYQiVUQtGa-A4p67imv2UKadgkF1GfU1G1TJ1VJJlgz8vcG1coHZ4kLtP-IsV9u2oxTwq7-mP66Bfetc0BRWv3"/>
</div>
</div>
</div>
</header>
<!-- Main Content -->
<main class="ml-64 mt-20 p-10 h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar">
<div class="max-w-[1400px] mx-auto">
<!-- Header Section -->
<div class="flex justify-between items-end mb-10">
<div>
<h2 class="font-headline-md text-headline-md text-primary mb-2">Intelligence Hub</h2>
<p class="text-body-lg text-on-surface-variant max-w-2xl">Aggregate extracted themes and spiritual programs from the global network to synthesize high-impact content strategies.</p>
</div>
<div class="flex gap-3">
<div class="bg-white border border-outline-variant/30 rounded-lg p-4 flex flex-col min-w-[140px] ambient-glow">
<span class="text-label-caps text-on-surface-variant mb-1">AGGREGATED</span>
<span class="text-headline-sm font-bold text-primary">1,284</span>
</div>
<div class="bg-white border border-outline-variant/30 rounded-lg p-4 flex flex-col min-w-[140px] ambient-glow">
<span class="text-label-caps text-on-surface-variant mb-1">TRENDING THEMES</span>
<span class="text-headline-sm font-bold text-secondary">24</span>
</div>
</div>
</div>
<!-- Filters Bar -->
<div class="bg-white rounded-2xl p-4 mb-8 ambient-glow flex flex-wrap items-center gap-4">
<div class="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/20">
<span class="text-label-caps text-on-surface-variant">CHURCH:</span>
<select class="bg-transparent border-none focus:ring-0 text-body-sm font-bold p-0">
<option>All Congregations</option>
<option>Grace Community</option>
<option>First Baptist</option>
<option>North Star Chapel</option>
</select>
</div>
<div class="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/20">
<span class="text-label-caps text-on-surface-variant">CONTENT:</span>
<select class="bg-transparent border-none focus:ring-0 text-body-sm font-bold p-0">
<option>All Types</option>
<option>Theme</option>
<option>Program</option>
<option>Concept</option>
</select>
</div>
<div class="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/20">
<span class="text-label-caps text-on-surface-variant">SENTIMENT:</span>
<select class="bg-transparent border-none focus:ring-0 text-body-sm font-bold p-0">
<option>Any Sentiment</option>
<option>High Resonance</option>
<option>Neutral</option>
<option>Low Resonance</option>
</select>
</div>
<div class="ml-auto flex items-center gap-2">
<span class="text-body-sm text-on-surface-variant mr-2">3 Selected</span>
<button class="text-primary hover:text-secondary font-bold text-body-sm transition-colors">Clear All</button>
</div>
</div>
<!-- Data Table -->
<div class="bg-white rounded-3xl overflow-hidden ambient-glow border border-outline-variant/20">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low/50">
<th class="p-5 w-12">
<input class="rounded text-primary focus:ring-primary bg-surface border-outline-variant" type="checkbox"/>
</th>
<th class="p-5 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant/10">SOURCE CHURCH</th>
<th class="p-5 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant/10">CONTENT TYPE</th>
<th class="p-5 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant/10">TITLE / KEY INSIGHT</th>
<th class="p-5 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant/10">SENTIMENT RESONANCE</th>
<th class="p-5 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant/10">DATE</th>
<th class="p-5 border-b border-outline-variant/10"></th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<!-- Row 1 -->
<tr class="row-hover transition-colors">
<td class="p-5">
<input checked="" class="rounded text-primary focus:ring-primary bg-surface border-outline-variant" type="checkbox"/>
</td>
<td class="p-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">GC</div>
<span class="text-body-md font-medium">Grace Community</span>
</div>
</td>
<td class="p-5">
<span class="px-3 py-1 bg-primary-fixed text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">Theme</span>
</td>
<td class="p-5">
<div class="max-w-xs">
<p class="font-medium text-on-surface leading-tight mb-1">Rhythms of Rest &amp; Restoration</p>
<p class="text-xs text-on-surface-variant line-clamp-1 italic">Focus on the biblical Sabbath as a modern mental health tool.</p>
</div>
</td>
<td class="p-5">
<div class="w-48">
<div class="flex justify-between items-center mb-2">
<span class="text-[10px] font-bold text-primary">88%</span>
<span class="text-[10px] font-medium text-on-surface-variant italic">Strong Resonance</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary rounded-full" style="width: 88%"></div>
</div>
</div>
</td>
<td class="p-5 text-body-sm text-on-surface-variant">Oct 24, 2023</td>
<td class="p-5 text-right">
<button class="text-on-surface-variant hover:text-primary"><span class="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<!-- Row 2 -->
<tr class="row-hover transition-colors">
<td class="p-5">
<input checked="" class="rounded text-primary focus:ring-primary bg-surface border-outline-variant" type="checkbox"/>
</td>
<td class="p-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-xs">FB</div>
<span class="text-body-md font-medium">First Baptist</span>
</div>
</td>
<td class="p-5">
<span class="px-3 py-1 bg-secondary-fixed text-secondary rounded-full text-[10px] font-bold uppercase tracking-wider">Program</span>
</td>
<td class="p-5">
<div class="max-w-xs">
<p class="font-medium text-on-surface leading-tight mb-1">Neighborhood Table Initiative</p>
<p class="text-xs text-on-surface-variant line-clamp-1 italic">Small group dining format focused on communal healing.</p>
</div>
</td>
<td class="p-5">
<div class="w-48">
<div class="flex justify-between items-center mb-2">
<span class="text-[10px] font-bold text-secondary">94%</span>
<span class="text-[10px] font-medium text-on-surface-variant italic">High Performance</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary rounded-full" style="width: 94%"></div>
</div>
</div>
</td>
<td class="p-5 text-body-sm text-on-surface-variant">Oct 22, 2023</td>
<td class="p-5 text-right">
<button class="text-on-surface-variant hover:text-primary"><span class="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<!-- Row 3 -->
<tr class="row-hover transition-colors">
<td class="p-5">
<input class="rounded text-primary focus:ring-primary bg-surface border-outline-variant" type="checkbox"/>
</td>
<td class="p-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold text-xs">NS</div>
<span class="text-body-md font-medium">North Star Chapel</span>
</div>
</td>
<td class="p-5">
<span class="px-3 py-1 bg-tertiary-fixed text-tertiary rounded-full text-[10px] font-bold uppercase tracking-wider">Concept</span>
</td>
<td class="p-5">
<div class="max-w-xs">
<p class="font-medium text-on-surface leading-tight mb-1">Generational Wisdom Bridge</p>
<p class="text-xs text-on-surface-variant line-clamp-1 italic">Pairing Gen-Z with Elders for legacy storytelling.</p>
</div>
</td>
<td class="p-5">
<div class="w-48">
<div class="flex justify-between items-center mb-2">
<span class="text-[10px] font-bold text-tertiary">62%</span>
<span class="text-[10px] font-medium text-on-surface-variant italic">Neutral</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary rounded-full" style="width: 62%"></div>
</div>
</div>
</td>
<td class="p-5 text-body-sm text-on-surface-variant">Oct 19, 2023</td>
<td class="p-5 text-right">
<button class="text-on-surface-variant hover:text-primary"><span class="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<!-- Row 4 -->
<tr class="row-hover transition-colors">
<td class="p-5">
<input checked="" class="rounded text-primary focus:ring-primary bg-surface border-outline-variant" type="checkbox"/>
</td>
<td class="p-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">GC</div>
<span class="text-body-md font-medium">Grace Community</span>
</div>
</td>
<td class="p-5">
<span class="px-3 py-1 bg-primary-fixed text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">Theme</span>
</td>
<td class="p-5">
<div class="max-w-xs">
<p class="font-medium text-on-surface leading-tight mb-1">Silence as Spiritual Discipline</p>
<p class="text-xs text-on-surface-variant line-clamp-1 italic">The neural benefits of quietude and centering prayer.</p>
</div>
</td>
<td class="p-5">
<div class="w-48">
<div class="flex justify-between items-center mb-2">
<span class="text-[10px] font-bold text-primary">79%</span>
<span class="text-[10px] font-medium text-on-surface-variant italic">Solid Potential</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary-container rounded-full" style="width: 79%"></div>
</div>
</div>
</td>
<td class="p-5 text-body-sm text-on-surface-variant">Oct 18, 2023</td>
<td class="p-5 text-right">
<button class="text-on-surface-variant hover:text-primary"><span class="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<!-- Row 5 -->
<tr class="row-hover transition-colors">
<td class="p-5">
<input class="rounded text-primary focus:ring-primary bg-surface border-outline-variant" type="checkbox"/>
</td>
<td class="p-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-xs">FB</div>
<span class="text-body-md font-medium">First Baptist</span>
</div>
</td>
<td class="p-5">
<span class="px-3 py-1 bg-tertiary-fixed text-tertiary rounded-full text-[10px] font-bold uppercase tracking-wider">Concept</span>
</td>
<td class="p-5">
<div class="max-w-xs">
<p class="font-medium text-on-surface leading-tight mb-1">Environmental Stewardship Focus</p>
<p class="text-xs text-on-surface-variant line-clamp-1 italic">Connecting creation care with personal mental wellness.</p>
</div>
</td>
<td class="p-5">
<div class="w-48">
<div class="flex justify-between items-center mb-2">
<span class="text-[10px] font-bold text-tertiary">45%</span>
<span class="text-[10px] font-medium text-on-surface-variant italic">Developing</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary-container rounded-full" style="width: 45%"></div>
</div>
</div>
</td>
<td class="p-5 text-body-sm text-on-surface-variant">Oct 15, 2023</td>
<td class="p-5 text-right">
<button class="text-on-surface-variant hover:text-primary"><span class="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
<div class="p-5 bg-surface-container-low/30 flex justify-between items-center border-t border-outline-variant/10">
<p class="text-body-sm text-on-surface-variant">Showing <span class="font-bold text-on-surface">5</span> of 1,284 entries</p>
<div class="flex gap-2">
<button class="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-white transition-colors">
<span class="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button class="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white font-bold text-xs">1</button>
<button class="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-white transition-colors">2</button>
<button class="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-white transition-colors">3</button>
<button class="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-white transition-colors">
<span class="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- Strategy Bundle Preview (Floating Card) -->
<div class="fixed bottom-10 right-10 w-96 bg-white rounded-3xl ambient-glow border border-primary/10 overflow-hidden z-50 transform transition-transform duration-300 hover:translate-y-[-4px]">
<div class="p-6 bg-primary text-white">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="font-headline-sm text-xl">Strategy Bundle</h3>
<p class="text-xs opacity-80">3 Selected Elements</p>
</div>
<button class="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
<span class="material-symbols-outlined text-sm">close</span>
</button>
</div>
<div class="flex flex-col gap-3">
<div class="bg-white/10 rounded-xl p-3 border border-white/10">
<div class="flex justify-between items-center mb-1">
<span class="text-[10px] font-bold uppercase tracking-wider">Estimated Impact</span>
<span class="text-[10px] font-bold">92%</span>
</div>
<div class="h-1 bg-white/20 rounded-full">
<div class="h-full bg-secondary-fixed rounded-full" style="width: 92%"></div>
</div>
</div>
</div>
</div>
<div class="p-6">
<ul class="space-y-3 mb-6">
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="text-xs font-medium text-on-surface truncate">Rhythms of Rest &amp; Restoration</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="text-xs font-medium text-on-surface truncate">Neighborhood Table Initiative</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="text-xs font-medium text-on-surface truncate">Silence as Spiritual Discipline</span>
</li>
</ul>
<button class="w-full bg-secondary text-white py-3 rounded-full font-label-caps flex items-center justify-center gap-2 active:scale-95 transition-transform">
                        Launch Content Strategy
                        <span class="material-symbols-outlined">rocket_launch</span>
</button>
</div>
</div>
</div>
</main>
<!-- Micro-interaction Scripts -->
<script>
        // Simple row selection highlighting
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', function() {
                const row = this.closest('tr');
                if (this.checked) {
                    row?.classList.add('bg-primary-fixed/10');
                } else {
                    row?.classList.remove('bg-primary-fixed/10');
                }
            });
        });

        // Initialize state for checked rows
        checkboxes.forEach(cb => {
            if (cb.checked) {
                cb.closest('tr')?.classList.add('bg-primary-fixed/10');
            }
        });
    </script>
</body></html>

<!-- Content Library & Planner -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#4f604f",
                        "secondary": "#8a4f37",
                        "primary-container": "#677966",
                        "primary-fixed-dim": "#b8ccb6",
                        "on-primary-fixed": "#0f1f11",
                        "on-surface": "#161d1f",
                        "error-container": "#ffdad6",
                        "tertiary": "#5c5c58",
                        "tertiary-fixed-dim": "#c8c6c2",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#eef5f7",
                        "on-error": "#ffffff",
                        "on-tertiary-fixed": "#1b1c19",
                        "primary-fixed": "#d4e8d1",
                        "on-tertiary-fixed-variant": "#474744",
                        "tertiary-container": "#757571",
                        "outline": "#747872",
                        "surface": "#f4fafd",
                        "on-surface-variant": "#434842",
                        "on-primary-container": "#f7fff2",
                        "surface-variant": "#dde4e6",
                        "surface-container-highest": "#dde4e6",
                        "on-tertiary-container": "#fefcf7",
                        "secondary-fixed-dim": "#ffb599",
                        "surface-container": "#e8eff1",
                        "secondary-fixed": "#ffdbce",
                        "on-secondary-container": "#7a412a",
                        "inverse-on-surface": "#ebf2f4",
                        "secondary-container": "#ffb193",
                        "error": "#ba1a1a",
                        "on-secondary-fixed-variant": "#6e3822",
                        "on-error-container": "#93000a",
                        "on-background": "#161d1f",
                        "outline-variant": "#c4c8c0",
                        "on-secondary-fixed": "#370e00",
                        "background": "#f4fafd",
                        "tertiary-fixed": "#e4e2dd",
                        "on-primary-fixed-variant": "#3a4b3a",
                        "inverse-surface": "#2b3234",
                        "surface-bright": "#f4fafd",
                        "on-secondary": "#ffffff",
                        "on-tertiary": "#ffffff",
                        "on-primary": "#ffffff",
                        "surface-tint": "#516351",
                        "surface-dim": "#d4dbdd",
                        "surface-container-high": "#e2e9ec",
                        "inverse-primary": "#b8ccb6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "8px",
                        "gutter": "24px",
                        "section-gap": "80px",
                        "margin-mobile": "20px",
                        "margin-desktop": "64px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "label-caps": ["Plus Jakarta Sans"],
                        "headline-sm": ["Source Serif 4"],
                        "headline-md": ["Source Serif 4"],
                        "display-lg-mobile": ["Source Serif 4"],
                        "body-sm": ["Plus Jakarta Sans"],
                        "body-lg": ["Plus Jakarta Sans"],
                        "display-lg": ["Source Serif 4"],
                        "body-md": ["Plus Jakarta Sans"]
                    },
                    "fontSize": {
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "500"}],
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "500"}],
                        "display-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        .ambient-glow {
            box-shadow: 0 4px 24px rgba(45, 52, 54, 0.04);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .progress-track {
            background-color: #f4fafd; /* Warm Cream */
        }
        .progress-fill {
            background-color: #4f604f; /* Sage Green */
        }
        .generating-dot {
            background-color: #8a4f37; /* Terracotta */
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #dde4e6;
            border-radius: 10px;
        }
    </style>
</head>
<body class="bg-surface text-on-surface font-body-md overflow-hidden">
<!-- SideNavBar -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 px-6 z-50">
<div class="mb-10 flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
<span class="material-symbols-outlined text-white" style="font-variation-settings: 'FILL' 1;">spa</span>
</div>
<div>
<h1 class="font-headline-sm text-headline-sm text-primary">Well Nest</h1>
<p class="text-xs font-label-caps text-on-surface-variant tracking-wider uppercase">Faith-Based Wellness</p>
</div>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors group" href="#">
<span class="material-symbols-outlined">insights</span>
<span class="font-body-md">Market Matrix</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors group" href="#">
<span class="material-symbols-outlined">psychology</span>
<span class="font-body-md">Intelligence Hub</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container transition-all duration-200" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">grid_view</span>
<span class="font-body-md">Content Library</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors group" href="#">
<span class="material-symbols-outlined">auto_graph</span>
<span class="font-body-md">Retreat Funnel</span>
</a>
</nav>
<button class="mb-8 w-full py-3 px-4 bg-primary text-white rounded-full font-label-caps hover:opacity-90 active:scale-95 transition-all shadow-lg">
            New Strategy
        </button>
<div class="pt-6 border-t border-outline-variant space-y-2">
<a class="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-body-md">Settings</span>
</a>
<a class="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined">help_outline</span>
<span class="font-body-md">Support</span>
</a>
</div>
</aside>
<!-- Main Content Wrapper -->
<main class="ml-64 min-h-screen relative">
<!-- TopAppBar -->
<header class="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-surface/80 backdrop-blur-md z-40 flex justify-between items-center px-10">
<div class="flex items-center gap-4 bg-surface-container rounded-full px-4 py-2 w-96">
<span class="material-symbols-outlined text-outline">search</span>
<input class="bg-transparent border-none focus:ring-0 text-body-sm w-full" placeholder="Search carousels, themes, or churches..." type="text"/>
</div>
<div class="flex items-center gap-6">
<button class="relative text-on-surface-variant hover:text-secondary transition-colors active:scale-95">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<div class="flex items-center gap-3 pl-6 border-l border-outline-variant">
<div class="text-right">
<p class="font-label-caps text-on-surface">Director John</p>
<p class="text-[10px] text-on-surface-variant uppercase tracking-widest">Admin</p>
</div>
<img alt="User Profile" class="w-10 h-10 rounded-full object-cover border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2b7xAArxahZRdliX5GnPiK7s8i59uB2FhE4uSot2JVonyRrgpYfPDAtmSl4Jdy1_hyLKMUJZBsRtnq3aWyx18wBFQeR2LqDefJxhqqchhFIU07qhNGKgqRqDswL9dRs4M-MnbumWd8bYOhBuiyfKxHgB-91YQKoR-g-4OktDh2fiEUxqorQ70xOw8Jt47sRkz3hTf644oyoOAX96hQhMU-cO-nFtM6i9f9fOOGx0WEgFC8g3iTwS_CiMZic4wZ36sft7Ge5c74Lk2"/>
</div>
</div>
</header>
<!-- Content Canvas -->
<div class="pt-20 px-10 pb-16 h-full overflow-y-auto custom-scrollbar">
<!-- Page Header & View Switcher -->
<div class="flex justify-between items-end mt-12 mb-10">
<div>
<h2 class="font-headline-md text-headline-md text-on-surface mb-2">Content Library</h2>
<p class="text-body-md text-on-surface-variant max-w-lg">Manage and schedule your faith-based visual carousels designed for spiritual growth and community engagement.</p>
</div>
<div class="flex bg-surface-container p-1 rounded-xl">
<button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-primary ambient-glow font-label-caps transition-all">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">grid_view</span>
                        Gallery
                    </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg text-on-surface-variant hover:text-primary font-label-caps transition-all">
<span class="material-symbols-outlined text-[20px]">list_alt</span>
                        List
                    </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg text-on-surface-variant hover:text-primary font-label-caps transition-all">
<span class="material-symbols-outlined text-[20px]">calendar_today</span>
                        Calendar
                    </button>
</div>
</div>
<!-- Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
<!-- Create New Card -->
<div class="group border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-8 min-h-[420px] hover:border-primary transition-all cursor-pointer bg-surface-container-lowest/50 hover:bg-surface-container-lowest">
<div class="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all mb-4">
<span class="material-symbols-outlined text-3xl">add</span>
</div>
<p class="font-label-caps text-on-surface-variant group-hover:text-primary">Create New Media</p>
<p class="text-body-sm text-on-surface-variant text-center mt-2 px-4">Start from a sermon transcript or a custom wellness theme.</p>
</div>
<!-- Generating State Card -->
<div class="bg-white rounded-xl overflow-hidden ambient-glow border border-[#E1E5E1] flex flex-col relative">
<div class="relative aspect-[4/5] bg-surface-container-high overflow-hidden">
<div class="absolute inset-0 flex flex-col items-center justify-center p-8 bg-primary/5">
<div class="relative w-24 h-24 mb-6">
<svg class="w-full h-full transform -rotate-90">
<circle class="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="44" stroke="currentColor" stroke-width="4"></circle>
<circle class="text-primary transition-all duration-1000" cx="48" cy="48" fill="transparent" r="44" stroke="currentColor" stroke-dasharray="276" stroke-dashoffset="82.8" stroke-width="4"></circle>
</svg>
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-label-caps text-primary text-lg">70%</span>
</div>
</div>
<p class="font-label-caps text-primary animate-pulse">GENERATING ASSETS</p>
<p class="text-xs text-on-surface-variant mt-2">Finalizing visual textures...</p>
</div>
</div>
<div class="p-5 flex-1 flex flex-col">
<div class="flex justify-between items-start mb-3">
<span class="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-label-caps rounded-full uppercase tracking-widest">Generating</span>
</div>
<h3 class="font-headline-sm text-xl text-on-surface mb-1">Rest as Spiritual Practice</h3>
<p class="text-body-sm text-on-surface-variant mb-4">Grace Community Church</p>
<div class="mt-auto pt-4 border-t border-outline-variant flex gap-3">
<button class="flex-1 py-2 px-4 rounded-full border border-primary text-primary font-label-caps text-sm hover:bg-primary/5 transition-all">
                                Pre-schedule
                            </button>
</div>
</div>
</div>
<!-- Approved Card -->
<div class="bg-white rounded-xl overflow-hidden ambient-glow border border-[#E1E5E1] flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
<div class="relative aspect-[4/5] overflow-hidden group">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A serene visual carousel slide featuring a soft-focus image of a sunlit forest clearing with golden morning light filtering through ancient pine trees. The atmosphere is peaceful and contemplative, following a refined editorial style with organic sage green and warm cream tones. High-end modern corporate layout with professional typography overlays." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuFWE3LVo0eXgquOKKskslnkqxAPGQ26UAjneVrJIHO71GADUyih3S86Qt07wnOmVroB-pFLsB5ccm9CGzKSvAso9jHdLADL5aDFR5BFatRBbzOwsTHBg15zb-kqZzw2Nm4y2suYKqFDoDMU2bOi_teqSTePKWPPCewwaCtz-7CAFVaqNDssxrseeUZtYTB71hiBbv10uF4NlRlTn2mWPXUCLUn9PDFk3p3dsuBTXF2aEOHo6GypidZbIBx7LkOY_OI6xvu2dC2rOC"/>
<div class="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-[10px] font-label-caps rounded-full uppercase tracking-widest">Approved</div>
<div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
<button class="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg"><span class="material-symbols-outlined">visibility</span></button>
<button class="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg"><span class="material-symbols-outlined">share</span></button>
</div>
</div>
<div class="p-5 flex-1 flex flex-col">
<div class="mb-3">
<p class="text-[10px] text-secondary font-label-caps uppercase tracking-widest mb-1">Theme: Mental Clarity</p>
<h3 class="font-headline-sm text-xl text-on-surface">The Peace of Presence</h3>
</div>
<p class="text-body-sm text-on-surface-variant mb-4">The Village Chapel</p>
<div class="mt-auto flex justify-between items-center text-xs text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">filter_none</span> 10 Slides</span>
<span>Created 2 days ago</span>
</div>
</div>
</div>
<!-- Scheduled Card -->
<div class="bg-white rounded-xl overflow-hidden ambient-glow border border-[#E1E5E1] flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
<div class="relative aspect-[4/5] overflow-hidden group">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Modern high-resolution visual for a faith-based carousel showing an abstract representation of light and shadow on textured stone. The lighting is dramatic but soft, using a warm earth-tone palette of terracotta and slate grey. The design is minimalist and sophisticated, intended for a wellness-focused digital platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyNl2jo7IDvRfl21adR5wmMNKM2w7KL4dD3tOlhfGuN-JG_3nwpDi66HT8wGq6Nhoj2V6JuXqmksC7BVicyCiUQCw68biW0L8g9SPLaI5UBLd14ghDCXCOjJ4H3thDzt2qpR6pr13xjT3a8_hmHwMeW3S1Q2NJPCabM9yXQr77g6CdsAGijr7wnsfqFP4QCsgGPLxHkyUFdtB0tR51k0MT-bigqK9k0mC55MJMsScltFpq4DKir-WjBrIf855LW-k9dqnKcOBfCODD"/>
<div class="absolute top-4 right-4 px-3 py-1 bg-tertiary text-white text-[10px] font-label-caps rounded-full uppercase tracking-widest">Scheduled</div>
<div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
<button class="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg"><span class="material-symbols-outlined">edit</span></button>
</div>
</div>
<div class="p-5 flex-1 flex flex-col">
<div class="mb-3">
<p class="text-[10px] text-secondary font-label-caps uppercase tracking-widest mb-1">Theme: Gratitude</p>
<h3 class="font-headline-sm text-xl text-on-surface">Finding Joy in Ordinary</h3>
</div>
<p class="text-body-sm text-on-surface-variant mb-4">Northside Community</p>
<div class="mt-auto pt-4 border-t border-outline-variant flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-sm">calendar_month</span>
<span class="text-xs text-on-surface-variant">Oct 24, 09:00 AM</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">more_vert</span>
</div>
</div>
</div>
<!-- Draft Card -->
<div class="bg-white rounded-xl overflow-hidden ambient-glow border border-[#E1E5E1] flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
<div class="relative aspect-[4/5] overflow-hidden group">
<img class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" data-alt="Minimalist landscape photography for a social media carousel slide depicting calm ocean waves at dusk under a lavender sky. The visual aesthetic is serene and reflective, utilizing a soft color palette of muted purples and deep teals. Professional typography placement is anticipated in the composition's negative space." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhUWNkgpROTSjYZKAsOSIOmojgTsMM4OPLpGPQ34fxu6gL88H6Bh-v5GVI-b-jFwf3tYAGu3Rt2Xvz2d7hQ8eqWOEkA1gaTM91grJiJePbXvdTBcfKq-pP_qAzYwG5CfPXbYU_feAbJ98tkcPV5YAi7BJ4Xw2yYpJyf3w_TqLs64ZDLKFFqFEOKCzx6ontrRpToYBI9EctJKISZ0M1AF76VNoa4LXi_b7DzVq7eDN_5J064G3PUcbfft2r-Z7LXB2ND5gvusJJFhUm"/>
<div class="absolute top-4 right-4 px-3 py-1 bg-surface-container text-on-surface-variant text-[10px] font-label-caps rounded-full uppercase tracking-widest">Draft</div>
</div>
<div class="p-5 flex-1 flex flex-col">
<div class="mb-3">
<p class="text-[10px] text-secondary font-label-caps uppercase tracking-widest mb-1">Theme: Resilience</p>
<h3 class="font-headline-sm text-xl text-on-surface">Strong in the Storm</h3>
</div>
<p class="text-body-sm text-on-surface-variant mb-4">Zion Worship Center</p>
<div class="mt-auto flex gap-2">
<button class="flex-1 py-2 px-4 rounded-full bg-primary text-white font-label-caps text-xs hover:opacity-90">Continue Editing</button>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- Contextual FAB -->
<!-- Suppressed on Library/Settings/Details according to hierarchy -->
<script>
        // Micro-interactions for view switcher
        const buttons = document.querySelectorAll('.flex.bg-surface-container button');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => {
                    b.classList.remove('bg-white', 'text-primary', 'ambient-glow');
                    b.classList.add('text-on-surface-variant');
                    const icon = b.querySelector('.material-symbols-outlined');
                    if (icon) icon.style.fontVariationSettings = "'FILL' 0";
                });
                btn.classList.add('bg-white', 'text-primary', 'ambient-glow');
                btn.classList.remove('text-on-surface-variant');
                const activeIcon = btn.querySelector('.material-symbols-outlined');
                if (activeIcon) activeIcon.style.fontVariationSettings = "'FILL' 1";
            });
        });
    </script>
</body></html>

<!-- Retreat Funnel Analytics -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Retreat Funnel | Well Nest</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:wght@400;500;600;700&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100..900&amp;family=Source+Serif+4:wght@100..900&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .ambient-glow {
            box-shadow: 0 4px 24px rgba(45, 52, 54, 0.04);
        }
        .inner-bleed {
            padding: 32px;
        }
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #E1E5E1;
            border-radius: 10px;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#4f604f",
                        "secondary": "#8a4f37",
                        "primary-container": "#677966",
                        "primary-fixed-dim": "#b8ccb6",
                        "on-primary-fixed": "#0f1f11",
                        "on-surface": "#161d1f",
                        "error-container": "#ffdad6",
                        "tertiary": "#5c5c58",
                        "tertiary-fixed-dim": "#c8c6c2",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#eef5f7",
                        "on-error": "#ffffff",
                        "on-tertiary-fixed": "#1b1c19",
                        "primary-fixed": "#d4e8d1",
                        "on-tertiary-fixed-variant": "#474744",
                        "tertiary-container": "#757571",
                        "outline": "#747872",
                        "surface": "#f4fafd",
                        "on-surface-variant": "#434842",
                        "on-primary-container": "#f7fff2",
                        "surface-variant": "#dde4e6",
                        "surface-container-highest": "#dde4e6",
                        "on-tertiary-container": "#fefcf7",
                        "secondary-fixed-dim": "#ffb599",
                        "surface-container": "#e8eff1",
                        "secondary-fixed": "#ffdbce",
                        "on-secondary-container": "#7a412a",
                        "inverse-on-surface": "#ebf2f4",
                        "secondary-container": "#ffb193",
                        "error": "#ba1a1a",
                        "on-secondary-fixed-variant": "#6e3822",
                        "on-error-container": "#93000a",
                        "on-background": "#161d1f",
                        "outline-variant": "#c4c8c0",
                        "on-secondary-fixed": "#370e00",
                        "background": "#f4fafd",
                        "tertiary-fixed": "#e4e2dd",
                        "on-primary-fixed-variant": "#3a4b3a",
                        "inverse-surface": "#2b3234",
                        "surface-bright": "#f4fafd",
                        "on-secondary": "#ffffff",
                        "on-tertiary": "#ffffff",
                        "on-primary": "#ffffff",
                        "surface-tint": "#516351",
                        "surface-dim": "#d4dbdd",
                        "surface-container-high": "#e2e9ec",
                        "inverse-primary": "#b8ccb6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "8px",
                        "gutter": "24px",
                        "section-gap": "80px",
                        "margin-mobile": "20px",
                        "margin-desktop": "64px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "label-caps": ["Plus Jakarta Sans"],
                        "headline-sm": ["Source Serif 4"],
                        "headline-md": ["Source Serif 4"],
                        "display-lg-mobile": ["Source Serif 4"],
                        "body-sm": ["Plus Jakarta Sans"],
                        "body-lg": ["Plus Jakarta Sans"],
                        "display-lg": ["Source Serif 4"],
                        "body-md": ["Plus Jakarta Sans"]
                    },
                    "fontSize": {
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "500"}],
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "500"}],
                        "display-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-background text-on-surface font-body-md">
<!-- Side Navigation -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 px-6 z-50">
<div class="mb-12">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-primary-fixed rounded-xl flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="spa" style="font-variation-settings: 'FILL' 1;">spa</span>
</div>
<div>
<h1 class="font-headline-sm text-headline-sm text-primary">Well Nest</h1>
<p class="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-variant">Faith-Based Wellness</p>
</div>
</div>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-4 py-3 px-4 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="insights">insights</span>
<span class="font-body-md">Market Matrix</span>
</a>
<a class="flex items-center gap-4 py-3 px-4 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="psychology">psychology</span>
<span class="font-body-md">Intelligence Hub</span>
</a>
<a class="flex items-center gap-4 py-3 px-4 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span class="font-body-md">Content Library</span>
</a>
<a class="flex items-center gap-4 py-3 px-4 rounded-full text-primary font-bold border-r-4 border-primary bg-surface-container/50" href="#">
<span class="material-symbols-outlined" data-icon="auto_graph" style="font-variation-settings: 'FILL' 1;">auto_graph</span>
<span class="font-body-md">Retreat Funnel</span>
</a>
</nav>
<div class="mt-auto pt-8 border-t border-outline-variant/30 space-y-2">
<button class="w-full bg-primary text-white py-3 px-6 rounded-full font-label-caps mb-6 hover:opacity-90 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                New Strategy
            </button>
<a class="flex items-center gap-4 py-2 px-4 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-body-md">Settings</span>
</a>
<a class="flex items-center gap-4 py-2 px-4 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="help_outline">help_outline</span>
<span class="font-body-md">Support</span>
</a>
</div>
</aside>
<!-- Main Content Area -->
<main class="ml-64 min-h-screen">
<!-- Top App Bar -->
<header class="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-surface/80 backdrop-blur-md z-40 px-12 flex justify-between items-center">
<div class="flex items-center bg-surface-container rounded-full px-4 py-2 w-96 group focus-within:ring-2 ring-primary/20 transition-all">
<span class="material-symbols-outlined text-on-surface-variant mr-3" data-icon="search">search</span>
<input class="bg-transparent border-none focus:ring-0 text-body-md w-full placeholder:text-on-surface-variant" placeholder="Search strategy or leads..." type="text"/>
</div>
<div class="flex items-center gap-6">
<button class="relative text-on-surface-variant hover:text-secondary transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<div class="flex items-center gap-3 border-l border-outline-variant pl-6">
<div class="text-right">
<p class="font-label-caps text-on-surface">Pastor Sarah</p>
<p class="text-[10px] text-on-surface-variant uppercase">Admin Access</p>
</div>
<div class="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden border border-outline-variant">
<img alt="User Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6NHpeHPW8VW4Fi75PiZfKJ_Va61AQBlsT-BbjSQtSpCQxXt4lowmHx0swzEpPjveU2IYteFRDJzETdvYS7ijzjcjiIPS6S2Ac-oK76aL1PTq5sPCGSMVhyJMH6tFH9Xks3SAMuHB8jOY8xRNXHZ-J5lABXHK7OSVixZ7z7QCpRk2paycSF0_yOUGi_8BS6S5Xho_fHfcfXemWLFV5mYHkM3Lmf9eJamQgu1OhZ_bzSDux3YS7_17ZYmlMINAl4LxBNzQAD7UtHQg0"/>
</div>
</div>
</div>
</header>
<!-- Canvas Content -->
<section class="mt-20 inner-bleed max-w-container-max mx-auto space-y-12">
<!-- Hero Goal Velocity -->
<div class="flex flex-col md:flex-row gap-8 items-end justify-between">
<div>
<h2 class="font-headline-md text-headline-md text-primary mb-2">Retreat Booking Funnel</h2>
<p class="text-on-surface-variant max-w-xl">Tracking your "Silent Sabbath" retreat performance for the 20-40 booking goal.</p>
</div>
<div class="bg-white p-6 rounded-xl ambient-glow min-w-[320px] border border-[#E1E5E1]">
<div class="flex justify-between items-end mb-4">
<div>
<p class="font-label-caps text-on-surface-variant mb-1">GOAL VELOCITY</p>
<h3 class="font-headline-sm text-headline-sm text-primary">28 / 40 <span class="text-body-md font-normal text-on-surface-variant">Confirmed</span></h3>
</div>
<div class="text-right">
<span class="text-secondary font-bold text-headline-sm">70%</span>
</div>
</div>
<!-- Progress Bar Track and Trace -->
<div class="relative h-2 bg-surface-container rounded-full overflow-hidden">
<div class="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000" style="width: 70%;"></div>
<div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-full border-2 border-white transition-all duration-1000" style="left: calc(70% - 6px);"></div>
</div>
<p class="mt-4 text-body-sm text-on-surface-variant flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-secondary" data-icon="trending_up">trending_up</span>
                        On track to reach goal by Nov 15th
                    </p>
</div>
</div>
<!-- Conversion Pipeline Bento -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
<!-- FB Group Members -->
<div class="bg-white p-6 rounded-xl ambient-glow border border-[#E1E5E1] flex flex-col items-center text-center">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4">
<span class="material-symbols-outlined text-primary" data-icon="groups">groups</span>
</div>
<p class="font-label-caps text-on-surface-variant">FB GROUP MEMBERS</p>
<h4 class="font-headline-sm text-primary my-2">1,240</h4>
<div class="h-12 w-full flex items-end justify-center gap-1">
<div class="w-1 bg-primary-fixed h-[40%] rounded-t-full"></div>
<div class="w-1 bg-primary-fixed h-[60%] rounded-t-full"></div>
<div class="w-1 bg-primary-fixed h-[50%] rounded-t-full"></div>
<div class="w-1 bg-primary h-[90%] rounded-t-full"></div>
</div>
</div>
<!-- Warm Leads -->
<div class="bg-white p-6 rounded-xl ambient-glow border border-[#E1E5E1] flex flex-col items-center text-center">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4">
<span class="material-symbols-outlined text-primary" data-icon="volunteer_activism">volunteer_activism</span>
</div>
<p class="font-label-caps text-on-surface-variant">WARM LEADS</p>
<h4 class="font-headline-sm text-primary my-2">156</h4>
<p class="text-body-sm text-secondary font-medium">12.5% Conv.</p>
</div>
<!-- Booking Clicks -->
<div class="bg-white p-6 rounded-xl ambient-glow border border-[#E1E5E1] flex flex-col items-center text-center">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4">
<span class="material-symbols-outlined text-primary" data-icon="ads_click">ads_click</span>
</div>
<p class="font-label-caps text-on-surface-variant">BOOKING CLICKS</p>
<h4 class="font-headline-sm text-primary my-2">42</h4>
<p class="text-body-sm text-secondary font-medium">26.9% Conv.</p>
</div>
<!-- Confirmed Bookings -->
<div class="bg-secondary text-white p-6 rounded-xl ambient-glow flex flex-col items-center text-center relative overflow-hidden">

<div class="relative z-10">
<div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4 mx-auto">
<span class="material-symbols-outlined text-white" data-icon="task_alt" style="font-variation-settings: 'FILL' 1;">task_alt</span>
</div>
<p class="font-label-caps text-white/80">CONFIRMED</p>
<h4 class="font-headline-sm text-white my-2">28</h4>
<p class="text-body-sm text-white/90">Goal: 40</p>
</div>
</div>
</div>
<!-- Lower Section: Map & Table -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Recent Warm Leads Table -->
<div class="lg:col-span-8 bg-white rounded-xl ambient-glow border border-[#E1E5E1] overflow-hidden">
<div class="px-8 py-6 border-b border-[#E1E5E1] flex justify-between items-center">
<h5 class="font-headline-sm text-primary">Recent Warm Leads</h5>
<button class="text-secondary font-label-caps hover:underline">Export CSV</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead>
<tr class="bg-surface-container-low">
<th class="px-8 py-4 font-label-caps text-on-surface-variant">LEAD NAME</th>
<th class="px-8 py-4 font-label-caps text-on-surface-variant">SOURCE CONTENT</th>
<th class="px-8 py-4 font-label-caps text-on-surface-variant">INTEREST</th>
<th class="px-8 py-4 font-label-caps text-on-surface-variant">STATUS</th>
</tr>
</thead>
<tbody class="divide-y divide-[#E1E5E1]">
<tr class="hover:bg-surface-container/30 transition-colors">
<td class="px-8 py-4 font-medium text-on-surface">Deborah Vance</td>
<td class="px-8 py-4 text-body-sm text-on-surface-variant italic">The Art of Stillness</td>
<td class="px-8 py-4">
<div class="flex gap-1">
<div class="w-3 h-1 bg-secondary rounded-full"></div>
<div class="w-3 h-1 bg-secondary rounded-full"></div>
<div class="w-3 h-1 bg-secondary rounded-full"></div>
</div>
</td>
<td class="px-8 py-4">
<span class="px-3 py-1 rounded-full bg-primary-fixed text-primary text-[11px] font-label-caps">FOLLOW-UP</span>
</td>
</tr>
<tr class="hover:bg-surface-container/30 transition-colors">
<td class="px-8 py-4 font-medium text-on-surface">Marcus Hill</td>
<td class="px-8 py-4 text-body-sm text-on-surface-variant italic">Sabbath Logic Pt. 2</td>
<td class="px-8 py-4">
<div class="flex gap-1">
<div class="w-3 h-1 bg-secondary rounded-full"></div>
<div class="w-3 h-1 bg-secondary rounded-full"></div>
<div class="w-3 h-1 bg-surface-container rounded-full"></div>
</div>
</td>
<td class="px-8 py-4">
<span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-container text-[11px] font-label-caps">HOT</span>
</td>
</tr>
<tr class="hover:bg-surface-container/30 transition-colors">
<td class="px-8 py-4 font-medium text-on-surface">Sarah Jane</td>
<td class="px-8 py-4 text-body-sm text-on-surface-variant italic">Finding Peace in Prayer</td>
<td class="px-8 py-4">
<div class="flex gap-1">
<div class="w-3 h-1 bg-secondary rounded-full"></div>
<div class="w-3 h-1 bg-surface-container rounded-full"></div>
<div class="w-3 h-1 bg-surface-container rounded-full"></div>
</div>
</td>
<td class="px-8 py-4">
<span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-label-caps">NEW</span>
</td>
</tr>
<tr class="hover:bg-surface-container/30 transition-colors">
<td class="px-8 py-4 font-medium text-on-surface">James Wilson</td>
<td class="px-8 py-4 text-body-sm text-on-surface-variant italic">The Art of Stillness</td>
<td class="px-8 py-4">
<div class="flex gap-1">
<div class="w-3 h-1 bg-secondary rounded-full"></div>
<div class="w-3 h-1 bg-secondary rounded-full"></div>
<div class="w-3 h-1 bg-secondary rounded-full"></div>
</div>
</td>
<td class="px-8 py-4">
<span class="px-3 py-1 rounded-full bg-primary-fixed text-primary text-[11px] font-label-caps">FOLLOW-UP</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Booking Geography Map -->
<div class="lg:col-span-4 bg-white rounded-xl ambient-glow border border-[#E1E5E1] overflow-hidden flex flex-col">
<div class="px-6 py-6 border-b border-[#E1E5E1]">
<h5 class="font-headline-sm text-primary">Booking Geography</h5>
<p class="text-body-sm text-on-surface-variant">Top Corridor: Alpharetta / Milton</p>
</div>
<div class="relative flex-1 min-h-[300px] bg-surface-container overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A clean, minimalist topographical map of the Alpharetta and Milton corridor in Georgia. The map features soft sage green and warm cream colors with subtle elevation lines and glowing dots indicating booking density. The aesthetic is modern and professional, matching a premium wellness brand dashboard. The lighting is bright and even, evoking a high-end editorial digital feel." data-location="Alpharetta" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqZdsBMRwvJqhJ2T1p1pILgnGu5OXulpNj3QP_wSUCB_qqtz-JNmIN86kWU1VXUuWu2p7w4SZW9-z2HYcfojKAz_Wb3J5dKvbIx-NhlADxwM5v93nbrKWfrXrIEHJAkFYn9YYQjjPM9kPv1WjJLiPpOPmksRroFWO3FPhsSfotgTOBT4uF62orf9kKe5P9_n-HpPvSwlnsgghTcdvobk60WPXuY1x3FsmV1QQaGe25FUzylGgCsiu5lFLr1yAFOyfhfSChEyiLuhyv"/>
<!-- Pulse Dots Overlay -->
<div class="absolute top-[30%] left-[40%] w-4 h-4 bg-secondary/40 rounded-full animate-ping"></div>
<div class="absolute top-[30%] left-[40%] w-2 h-2 bg-secondary rounded-full"></div>
<div class="absolute top-[50%] left-[60%] w-4 h-4 bg-secondary/40 rounded-full animate-ping" style="animation-delay: 1s;"></div>
<div class="absolute top-[50%] left-[60%] w-2 h-2 bg-secondary rounded-full"></div>
<div class="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-lg border border-[#E1E5E1]">
<div class="flex items-center justify-between mb-2">
<span class="font-label-caps text-primary">ALPHARETTA</span>
<span class="text-secondary font-bold">12 Bookings</span>
</div>
<div class="w-full h-1 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary w-3/4"></div>
</div>
</div>
</div>
</div>
</div>
<!-- Strategy Insights (Footer Section) -->
<div class="bg-surface-container-low p-8 rounded-2xl border border-[#E1E5E1]">
<div class="flex items-center gap-4 mb-6">
<span class="material-symbols-outlined text-secondary" data-icon="lightbulb">lightbulb</span>
<h6 class="font-headline-sm text-primary">Funnel Optimization Insights</h6>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="space-y-2">
<p class="font-label-caps text-on-surface">CONTENT WINNER</p>
<p class="text-body-md">"The Art of Stillness" is converting 15% better than other content. Consider boosting this content in the Alpharetta corridor.</p>
</div>
<div class="space-y-2">
<p class="font-label-caps text-on-surface">DROP-OFF POINT</p>
<p class="text-body-md">High drop-off between "Warm Leads" and "Booking Clicks". Review the email follow-up sequence for day 2 &amp; 4.</p>
</div>
<div class="space-y-2">
<p class="font-label-caps text-on-surface">RECOMMENDED ACTION</p>
<button class="text-secondary font-bold hover:underline flex items-center gap-1">
                            Run Milton-specific ads
                            <span class="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>
</main>
<script>
        // Micro-interactions and subtle effects
        document.querySelectorAll('.ambient-glow').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Simulating some dynamic progress
        setTimeout(() => {
            const progressBar = document.querySelector('.bg-primary.rounded-full');
            if(progressBar) {
                progressBar.style.width = '72%';
            }
        }, 1000);
    </script>
</body></html>

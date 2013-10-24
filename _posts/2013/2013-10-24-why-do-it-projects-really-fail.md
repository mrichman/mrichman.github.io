---
layout: post
title: Why Do IT Projects Really Fail?
categories: [articles]
tags: [article,IT,project,fail]
status: publish
type: post
published: true
meta: {}
---

I recently experienced my first IT project "failure" in many years. The purpose of this article is partly therapeutic, but also tutorial.  

Successful IT project management is critical to enterprise success and to the career growth and success of participating executives, project managers, and project team members. In my case, I served in all three roles. Without divulging too many project details, or the identities of anyone else involved, I will take some creative license with the specifics as I recount my experience.

Many years ago, I read Ed Yourdon's seminal work, [_Death March_ (2003)](http://www.amazon.com/Death-March-Edition-Edward-Yourdon/dp/013143635X/), where he explores this phenomenon in great detail:

> many of the projects in today's chaotic business environment involve such intense pressure that they are referred to colloquially as "death-march" projects -- i.e., projects whose schedules are so compressed, and/or whose budgets, or resource (people) assignments are so constrained, that the only "obvious" way to succeed is for the entire team to work 16 hours a day, 7 days a week, with no vacations until the project is finished. While the corporate goal of such projects is to overcome impossible odds and achieve miracles, the personal goal of the project manager and team members often shrinks down to mere survival: keeping one's job, maintaining some semblance of a relationship with one's spouse and children, and avoiding a heart attack or ulcer.

This particular project involved replacing an e-commerce transactional email system. There were two drivers of this project: 1) the existing e-commerce platform is undergoing replacement by a more capable system, and 2) there is a separate system used for marketing emails (e.g. acquisition and retention). This system is provided by an [Email Service Provider (ESP)](http://en.wikipedia.org/wiki/Email_service_provider_(marketing)). By leveraging the ESP's detailed metrics and reporting, the organization would gain greater insight into customer behavior, and consequently run higher converting email campaigns. So far so good.  

The project kicked off with a short list of the various transactional emails to be migrated. This included the standard e-commerce emails for order confirmation, ship confirmation, backorder notifications, etc. Since I was porting over the implementation from the web-based shopping cart's canned emails to the ESP, I needed to use a different source of data to be authoritative for order information. The [Enterprise Resource Planning (ERP)](http://en.wikipedia.org/wiki/Enterprise_resource_planning) system served just such a purpose.  

Unfortunately, this ERP is rather obscure and dated, and I have, at the time of this writing, not yet received any formal training, either internally or from the vendor. The system documentation is poor, and the vendor is somewhat uncooperative when it comes to the details of its proprietary [database schema](http://en.wikipedia.org/wiki/Database_schema). So, I trudged on, implementing the program logic to retrieve the required data to populate email templates in the ESP.  

After a couple of weeks of some of my best [Python](http://wwww.python.org) and [SQL](http://en.wikipedia.org/wiki/SQL) programming, I had a completed system ready for testing. Since this organization has no QA resources, I felt the onus was on me to not only contrive, but also execute test cases. I was provided with three test orders against which to test my system. The resulting emails delivered successfully, and contained the correct content and values. The legacy emails were disabled, and my system went live. Success!  

Not so fast...  

After a week or so, the customer service department began to receive complaints from customers about erroneous emails. In one case the shipping address was incorrect (it displayed the billing address instead), and in another case the order total was incorrect, not taking into consideration a discount which had been applied. I quickly identified, fixed, and deployed the necessary code changes. However, additional complaints of errors trickled in. It was decided that my application be disabled and the legacy system be reactivated until the new e-commerce platform was ready for QA.  

In a subsequent management meeting, my project's business owner publicly berated me for my lack of quality, and interrogated me as to why he should expect different results after I claim to have the bugs worked out. Now, I really don't mind criticism, or even a reprimand when deserved, but certainly not in a public forum where other managers and *my direct reports* are in attendance. Not cool. Fortunately, the CEO immediately stepped in to defend me. No apologies were ever offered, and I continued on with my work, fixing bugs and preparing for my applications inevitable redeployment. However, this negative interaction ate away at me both emotionally and physically, and that's no way to work or live.  

So, what could I have done differently to mitigate all the above misfortune? Well, there are generally two types of risks when it comes to IT projects: people-related risks and process-related risks.  

#### People-Related Risks
* Lack of top management support
* Weak commitment of project team
* Subject matter experts are overscheduled
* Weak project manager
* No stakeholder involvement and/or participation
* Team members lack requisite knowledge and/or skills

#### Process-Related Risks
* Lack of documented requirements and/or success criteria
* No change control process (change management)
* Ineffective schedule planning and/or management
* Communication breakdown among stakeholders
* Resources assigned to a higher priority project
* No business case for the project

Let's take a look at the people-related risks first. I had top management support - check. Team commitment - check. Subject matter experts overscheduled? Nope. Project management - hmmm - the organization has no project manager. So, my "customer" played the role of PM. There is inherent conflict awaiting right there. A PM's job is to remove obstacles to ensure project and team success. My biggest obstacle was my lack of knowledge of both the ERP system and the various permutations of customer orders. My "customer" seemed to find my constant inquiries irritating. Perhaps a formal project manager would have taken a different approach than I did for extracting information. But, this leads me to stakeholder involvement.  

I like to work in an _agile methodology_, an environment which is both collaborative and adaptive. My stakeholders seemed to be content, if not _insistent_ on what we call the _waterfall_ approach. That is, the requirements are provided (in varying forms of detail and/or quality) and the implementation proceeds until its end with little or no feedback or participation from the customer. This _modus operandi_ is almost always fraught with failure, either through cost and time overruns, or incorrect and incomplete features.  

I've been a professional software engineer since 1996, and an amateur one since 1979. Skills were not the issue on this project. Lack of requisite knowledge? Ah ha! Now we're getting somewhere. An obscure ERP system, poorly documented, with stakeholders who have years of hands-on experience versus a software engineer with domain expertise, but zero knowledge of the critical system in question. With less than 90 days on the job, and no training, required knowledge was clearly lacking. Requests for formal training went ignored, for reasons that are still unclear to me. I'm just going to tell myself it was a budget constraint. The real reason doesn't much matter now.  

So what about process-related risks? Well, lack of documented requirements certainly stand out. More often than not, projects like this one, where one is replacing one system with another to perform a similar function, have few requirements. Most often, the requirements will be a sentence like, "make it work *just* like the old one, except we need the flux capacitor to interface with the forced quantum singularity." This is comically anemic when it comes to specifics - success criteria.  

#### What did I do wrong?

Ultimately, I got past my technical hurdles when it came to the ERP system, and relaunched a defect-free system. No harm done. However, this could have all been much more drama-free. I should have been far more vocal when it came to my ignorance of the ERP system's internals. This may have been the static with which my requests for training were met, or equally likely, engineer's pride. I was too proud to ask for more help. This was unfortunately reinforced by my stakeholders' frustration with my repeated questions. More importantly, I feel the success criteria of the project should have been far more elaborate from the project's inception. What does "does it work?" look like? Also, since the organization lacks QA resources, the absence of thorough test cases was deadly. With my CEO's support, the project's stakeholders from marketing and customer service provided numerous and varied test cases with which to confidently unit test my application.

#### What did I do right?

I ask myself that every day. I still don't have an answer. But I still love what I do.
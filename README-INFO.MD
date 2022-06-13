# About task

## Architecture

I've changed initial architecture in terms of project structure and data flow as well. The idea is to split app into smaller
feature modules/folders with their separated state. In my case I've ended up with feature called `ServiceCatalogs`,
and all state and logic is placed in this folder. I've added `AppShell` folder, with all base app setup and components.
For components conventions, I've splited them to components(dumb) and smart ones, so only those smart had access to state
and they were propagating it to dumb components.

## State

State was build with Pinia, the data flow was from state that is connecting with server to containers and then dumb 
components that where responsible for displaying data and produce events. `ServiceCatalogs` had 2 states, first one
basic with all logic required to get and handle data, and the second state was responsible for handling pagination view.


##E2E

Self descriptive scenario tests, with separation for each feature, and nesting all of them by a root feature name.

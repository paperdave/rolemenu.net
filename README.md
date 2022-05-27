# [Role Menus for Discord](https://rolemenu.net)

Role Menus are a more modern version of traditional “reaction roles” systems, allowing for self-assignable roles on Discord servers. Easily customize their appearance and functionality to your liking with our web-based editor.

edit: I'll be honest, i don't feel like ever working on this as Discord themselves are working on the same feature, but built into the app. kind of a motivation killer if you ask me.

The code is structured as a SvelteKit application, and all Discord api interactions are done through `@discordjs/rest` and `discord-api-types`, with an [Interaction Endpoint](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) for responding to people using the underlying Select Menus. This lets us run the entire bot through [Cloudflare Pages](https://pages.cloudflare.com). The reasoning for a full-stack web application instead of just a bot is to allow server owners to fully customize their menus easily.

For now, this bot just does the Role Menus, but it may be interesting to look at other related features such as button-based role assignment, a button to open a message with the Role Menu, and other types of interactable components like pagination for long-form text containing server rules and information. I do not plan to get these extra goals done, though I am open to contributions: Get in touch on [my server](https://discord.gg/4AbvSXV).

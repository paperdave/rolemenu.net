<article>
	<h1>Role Menus Privacy Policy</h1>
	<p>Last updated on April 21st, 2022. Effective April 21st, 2022.</p>
	<p>
		I don't like convoluted privacy policies but I tried to make this as professional as I can, and
		document what this service does. If you are unfamiliar with what this service is, please see the <a
			href="/">homepage</a
		>.
	</p>

	<h2>Data</h2>
	<p>This application may access the following from Discord:</p>
	<ul>
		<li>Username and Tag.</li>
		<li>User Profile Picture.</li>
		<li>List of servers you are in, and their icons.</li>
		<li>List of roles for all servers the bot is in.</li>
		<li>List of emojis for all servers the bot is in.</li>
	</ul>
	<p>The following may be stored:</p>
	<ul>
		<li>User IDs of all</li>
		<li>Server, Channel, and Message ID where your Role Menus are located</li>
		<li>Role Menu information such as the message content, role labels, emojis, etc.</li>
		<li>When each role menu was last modified, and by what user.</li>
		<li>When each role menu was last interacted with, and by what user.</li>
		<li>Global statistics of how often menus are created, interacted with, edited, and deleted.</li>
		<li>Errors on the website and it's backend</li>
	</ul>

	<p>
		Telemetry data above is be collected to help improve the application and monitor usage and
		growth. The rest of the data should be obviously required for the application to function.
	</p>

	<h2>Tracking</h2>
	<p>
		Cloudflare Web Analytics is used to track how many people use the website and bot. I also look
		at the total count of role menus in the database, and usage frequency. There are no other
		third-party tracking programs.
	</p>

	<h2>Who has access</h2>
	<p>
		Dave Caruso is the only person to bot tokens and database keys, though we use the following
		services to power our service, and they technically can see your data:
	</p>
	<ul>
		<li>Discord (Where the magic happens)</li>
		<li>Cloudflare (Domain Management, DNS, DDoS Protection, Hosting)</li>
		<li>Prisma Data Platform (Database Proxying)</li>
		<li>PlanetScale (Database Hosting)</li>
	</ul>
	<p>
		These services all have their own policies, but they probably will not look at this project's
		data.
	</p>

	<h2>Deleting Data</h2>
	<p>
		To delete your personal data, remove the discord message for your role menus or through the
		website, and log out. The stored data may take up to 7 days to be purged from the system, but
		will be inaccessible to all users within 30 minutes.
	</p>
	<p>
		Global statistics will not deleted per a request, as they cannot be tracked down to the specific
		user.
	</p>

	<h2>How is it free?</h2>
	<p>
		The services listed above are all on the free tiers, which is good enough for this small scale
		bot. There is no persistant Discord bot running, as interactions are handled through an web
		endpoint instead of over the gateway, reducing operating costs. If the bot is large enough, I
		will have to upgrade to a paid plan of these services.
	</p>
</article>

<style>
	article {
		padding: 1rem;
		max-width: var(--max-width);
		margin: 0 auto;
	}
	h1 {
		font-size: 2rem;
	}

	h2 {
		font-size: 1.5rem;
	}
</style>

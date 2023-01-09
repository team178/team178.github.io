---
title: Raffle
layout: raffle
published: true
large-raffle-meter: true
---
<style>

.raffle-picture {
	vertical-align: middle;
	padding: 0px 7px;
	width: 17%;
}
.raffle-picture.vertical {
	padding: 0px 5px;
	width: 11%;
}
.raffle-picture.big {
	padding: 0px 5px;
	width: 25%;
}
#raffle-pictures {
	padding: 10px;
}
#raffle-picture-helper {
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}
#raffle-divider {
	display: block; /* Don't worry, it's made visible by the JS */ /* Not anymore :) */
	height: 5px;
	margin-top: -7.5px;
	color: #020579;
	background-color: #020579;
	border: none;
	border-radius: 2px;
}

@media screen and (max-width: 640px) {
	#raffle-pictures {
		display: none;
	}
}
</style>

<!--  The annual <a href="http://www.farmingtonfor.org"> Farmington Friends of Robotics</a> raffle to support The 2nd Law Enforcers is currently underway! Hurry to buy a raffle ticket before the final day on Wednesday, January 4th, 2023. The drawing will be held on January 7th, 2023. <b>Tickets are $5 each</b>. We will be holding selling events at local businesses in Farmington. Check our <a href="/calendar">Team Calendar</a> for future event times and dates!-->


<div id="goal" class="centered">
	<p style="font-size:1.1rem">
		<strong>Our 2022-2023 raffle has ended. We sold 1518 tickets, raising us $7590 in sales. Thanks to all those who supported through donations. See you all next year for our 2023-2024 raffle!</strong>
	</p>
</div>
<br>
<div id="raffle-pictures" class="info-box" align="center">
	<div id="raffle-picture-helper">
		<img class="raffle-picture big" alt='Sony® Playstation 5' src="{{ site.url }}/assets/img/raffle/ps5.png">
		<img class="raffle-picture big" alt="Portable Pizza Oven" src="{{ site.url }}/assets/img/raffle/pizzaOven.png">
		<img class="raffle-picture" alt="Beats Fit Pro Earbuds" src="{{ site.url }}/assets/img/raffle/beats.png">
		<img class="raffle-picture" alt="Amazon Gift Card" src="{{ site.url }}/assets/img/raffle/amazon_gift_card.png">
	</div>
</div>
<br>
<h3><b>Congratualtions to our winners!</b></h3>
<ol id="raffle-prizes">
	<li>Lauren LaDuke (Ticket 2409-FHSR-5036) - Sony® Playstation 5</li>
	<li>Kerry Tharpe (Ticket 0448) - Portable Pizza Oven</li>
	<li>Terry Czerwinski (Ticket 2431-FHSR-5096) - Beats Fit Pro Earbuds</li>
	<li>Angela Nero (Ticket 0025) - $178 Amazon Gift Card</li>
	<li>Barbara Jackie (Ticket 0069) - $100 Amazon Gift Card</li>
</ol> 
<br>

<!-- <h3><b>We have 5 prizes in total!</b></h3>
<ul id="raffle-prizes">
	<li>1st Prize – PS5 (value $500)</li>
	<li>2nd Prize – Portable Pizza Oven (Retail value $399)</li>
	<li>3rd Prize – Beats Fit Pro Earbuds (Retail value $199)</li>
	<li>4th Prize – $178 Gift Card</li>
	<li>5th Prize – $100 Gift Card</li>
</ul> 
-->
<!--
<div id="raffle-button" class="centered">
	<a style="font-size:2rem;" class="btn" href="https://fhsrobotics.charityraffles.org/" target="_blank" rel="noopener noreferrer"><strong>Buy tickets</strong></a>
	<p style="margin:1px;">Hosted by <a href="https://chance2win.org/" target="_blank" rel="noopener noreferrer">Chance2Win</a></p>
</div>
-->
<div class="info-box">
	<div id="container1">
		<a href="http://www.farmingtonfor.org"><img id="logo" alt="Farmington Friends of Robotics Logo" src="{{ site.url }}/assets/img/sponsors/ffor-logo.png"></a>
		<div id="container2">
		<div style="margin-bottom:5px;">If you missed the <!-- don't want to buy a ticket for the -->raffle, but still want to support our team, you may make a direct donation through Farmington Friends of Robotics (FOR), our 501(c)3 booster organization.</div>
		<div style="margin-top:5px;">It is a non-profit organization consisting of parents, mentors, and supporters of robotics in Farmington.</div>
		<div class="centered" style="margin-top:5px;"><a class="btn" href="https://farmingtonfor.square.site/" target="_blank" rel="noopener noreferrer">Click here to donate</a></div>
		</div>
	</div>
</div>

<hr>

<div id="about-us">
	<h3>About Us</h3>
	<p>
		The Farmington High School FIRST Robotics Team 178, the Enforcers, was founded 25 years ago when a group of high school students and educators,
		excited about STEM, formed a partnership with professional engineers from local technology companies. Together we participate in FIRST (For Inspiration
		and Recognition of Science and Technology). FIRST was founded by entrepreneur Dean Kamen, inventor of the Segway and iBOT wheelchair. Each year, high school
		teams across the world work year-round and compete in the FIRST Robotics Competition. In early January, FIRST announces the engineering challenge for the year,
		kicking off our eight week build season. The robot must be completed by late-February to be ready for competitions throughout March and April. Students spend multiple
		days of the week working on the robot as well as community outreach to spread STEM ideas. Engineering mentors help us tackle the challenge as we achieve our science,
		technology, and engineering dreams. The build season includes all aspects of a real-life technical design process, including development, design, planning, and marketing.
		It is intended to inspire students to become leaders in high-tech engineering, scientific, and technological fields. More information about our team can be found below.
	</p>
	<div id="promo-video" class="centered">
		<iframe width="560" height="315" src="https://www.youtube.com/embed/mhCyE5Mf1gE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	</div>

</div>

<div id="achievements">
	<h3>Achievements</h3>
	<p>
		In past years, the Enforcers have accomplished great feats in the spirit of gracious professionalism and community outreach. We've won one of FIRST's most prestigious awards,
		the Engineering Inspiration Award, a total of 8 times as a result of our outreach efforts alongside awards for our robot performance at competitions. 
	</p>
</div>

<div class="centered">
		<img alt="Robotics Hallway" src="{{ site.url }}/assets/img/robotHallway.png" width="560" height="315">
	</div>

<div id="our-mission">
	<h3>Our Mission</h3>
	<p>
		As part of FIRST's mission, we also spend a lot of time spreading STEM ideas in our community through our outreach events. We've run, hosted, and participated in events
		that spread FIRST values to people across Connecticut, sharing our love and passion for STEM with anyone who's willing to learn. We've partnered with the Farmington Public
		Schools with events like Hour of Code, STEAM Day, and the FIRST FLL Challenge through both mentoring and leadership. Our partnership with Farmington Continuing Education
		has made it possible for young students to participate in FIRST Lego League Discover and Explore teams. We support and mentor approximately 12 teams in the Farmington
		Valley each year. We have also partnered with the local public library on their STEM Maker Faire event.
	</p>
</div>

<br>

<br>

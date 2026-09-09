/*
|-----------------------------------------------------
| PAPRI Site Search
| Simple client-side search across all pages
|-----------------------------------------------------
*/
(function () {
	"use strict";

	// Index of searchable pages: title, url, and keywords/description
	var PAPRI_PAGES = [
		{ title: "Home", url: "index.html", desc: "PAPRI homepage - rural development NGO in Chuadanga, Bangladesh" },
		{ title: "About Us - Organizational Profile", url: "about.html", desc: "PAPRI history, vision, mission, legal status, registration" },
		{ title: "Executive Director - Raju Ahmed", url: "about.html#director", desc: "Raju Ahmed Executive Director leadership biography" },
		{ title: "Legal Status & Registration", url: "about.html#legal", desc: "Voluntary Social Welfare Agencies Ordinance Societies Registration Act" },
		{ title: "Our Work", url: "service.html", desc: "Youth development education climate agriculture healthcare women humanitarian research" },
		{ title: "Youth Development & Education", url: "service.html#youth", desc: "Skills training digital learning leadership life skills youth" },
		{ title: "Climate Resilience & Environment", url: "service.html#climate", desc: "Tree plantation climate awareness waste management" },
		{ title: "Agriculture & Rural Development", url: "service.html#agriculture", desc: "Farmer field schools sustainable farming training" },
		{ title: "Healthcare & Sanitation", url: "service.html#health", desc: "Health camps WASH mobile clinics hygiene" },
		{ title: "Women Empowerment", url: "service.html#women", desc: "Livelihood training self help groups gender equality" },
		{ title: "Humanitarian Support", url: "service.html#humanitarian", desc: "Emergency response relief distribution disaster aid" },
		{ title: "Research & Development", url: "service.html#research", desc: "Needs assessment impact evaluation academic partnership" },
		{ title: "Our Initiatives", url: "service-details.html", desc: "PAPRI Skill Development Centre Mayer School" },
		{ title: "PAPRI Skill Development Centre", url: "service-details.html#skill", desc: "Tailoring handicrafts computer literacy vocational training" },
		{ title: "Mayer School", url: "service-details.html#mayer", desc: "Adult literacy rural mothers education health awareness" },
		{ title: "News & Projects", url: "blog.html", desc: "New Life Greenery Aamar Pushti Bagan cancer awareness child protection sports" },
		{ title: "Gallery", url: "gallery.html", desc: "Photo gallery ongoing projects field moments" },
		{ title: "Our Team", url: "team.html", desc: "Board of directors leadership staff" },
		{ title: "Get Involved", url: "client.html", desc: "PAPRI Youth Change-Makers volunteer national board" },
		{ title: "Contact Us", url: "contact.html", desc: "Office address phone email map Chuadanga" },
		{ title: "Frequently Asked Questions", url: "faq.html", desc: "FAQ common questions registration volunteering donation" },
		{ title: "Terms & Conditions", url: "terms.html", desc: "Terms of use website policy" },
		{ title: "Privacy Policy", url: "privacy.html", desc: "Privacy data protection policy" }
	];

	function normalize(str) {
		return (str || "").toLowerCase();
	}

	function search(query) {
		var q = normalize(query).trim();
		if (q.length < 2) return [];
		return PAPRI_PAGES.filter(function (page) {
			return normalize(page.title).indexOf(q) !== -1 || normalize(page.desc).indexOf(q) !== -1;
		}).slice(0, 8);
	}

	function buildResultsBox(form) {
		var box = document.createElement("div");
		box.className = "papri-search-results";
		box.style.cssText = "max-width:600px;margin:10px auto 0;text-align:left;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.15);display:none;";
		form.parentNode.insertBefore(box, form.nextSibling);
		return box;
	}

	function renderResults(box, results, query) {
		if (!results.length) {
			box.style.display = query.trim().length >= 2 ? "block" : "none";
			box.innerHTML = query.trim().length >= 2
				? '<div style="padding:16px;color:#888;">No results found for "' + query + '"</div>'
				: "";
			return;
		}
		box.style.display = "block";
		box.innerHTML = results.map(function (r) {
			return '<a href="' + r.url + '" style="display:block;padding:14px 18px;border-bottom:1px solid #eee;color:#0d0d0d;text-decoration:none;">' +
				'<div style="font-weight:700;font-size:15px;">' + r.title + '</div>' +
				'<div style="font-size:13px;color:#888;margin-top:2px;">' + r.desc + '</div>' +
				'</a>';
		}).join("");
	}

	document.addEventListener("DOMContentLoaded", function () {
		var forms = document.querySelectorAll(".atf-searching-form");
		forms.forEach(function (form) {
			var input = form.querySelector('input[type="text"]');
			if (!input) return;
			var box = buildResultsBox(form);

			input.addEventListener("input", function () {
				var results = search(input.value);
				renderResults(box, results, input.value);
			});

			form.addEventListener("submit", function (e) {
				e.preventDefault();
				var results = search(input.value);
				if (results.length) {
					window.location.href = results[0].url;
				}
			});
		});
	});
})();

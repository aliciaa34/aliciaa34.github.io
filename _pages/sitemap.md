---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

A list of every page and entry on this site. There is also an
[XML sitemap]({{ base_path }}/sitemap.xml) for search engines.

## Pages

<ul>
{% for post in site.pages %}
  {% if post.title and post.permalink %}
    <li><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

## Publications

<ul>
{% for post in site.publications reversed %}
  <li><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

## Astrophotography

<ul>
{% assign astro_pages = site.astro | sort: "order" | reverse %}
{% for post in astro_pages %}
  <li><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

## La Palma

<ul>
{% assign lp_pages = site.lapalma | sort: "order" | reverse %}
{% for post in lp_pages %}
  <li><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

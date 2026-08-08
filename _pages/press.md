---
layout: archive
title: "Press"
permalink: /press/
author_profile: true
---

{% include base_path %}

Articles, features and interviews about my research and my hockey career.
To add or correct an entry, edit [`_data/press.yml`](https://github.com/{{ site.repository }}/blob/master/_data/press.yml).

{% for group in site.data.press.groups %}
  <h2 class="press-heading" id="{{ group.id }}">{{ group.title }}</h2>
  <ul class="press-list">
    {% assign items = group.items | sort: "sort" | reverse %}
    {% for item in items %}
      <li class="press-item press-item--{{ item.type }}">
        <a class="press-item__link" href="{{ item.url }}">
          <span class="press-item__type" aria-hidden="true">
            {% if item.type == "video" %}<i class="fa-solid fa-play"></i>
            {% elsif item.type == "profile" %}<i class="fa-solid fa-user"></i>
            {% else %}<i class="fa-solid fa-newspaper"></i>{% endif %}
          </span>
          <span class="press-item__body">
            <span class="press-item__title">{{ item.title }}</span>
            <span class="press-item__meta">
              {{ item.outlet }}{% if item.date and item.date != "" %} &middot; {{ item.date }}{% endif %}
            </span>
            {% if item.blurb %}<span class="press-item__blurb">{{ item.blurb }}</span>{% endif %}
          </span>
        </a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

---
layout: home
title: Publications
seq: 3  
---

{% for i in (2011..2100) reversed %}

{% assign count = 0 %}
{% for p in site.publications %}
{% if p.year == i %}
{% assign count = 1 %}
{% endif %}
{% endfor %}

{% if count == 1 %}
## {{ i }}

<table style="width:100%">
{% for p in site.publications %}
{%if p.year == i %}
<tr><td>
<a href="https://doi.org/{{p.doi}}" style="color: #3f3f3f;">
{{ p.authors }} ({{p.year}})
{{ p.title }} {{p.journal}}, {{p.vol}} <span style="color: #2a7ae2;">doi: {{p.doi}}</span></a>
</td></tr>
{% endif %}
{% endfor %}

</table>

{% endif %}
{% endfor %}

## 2010 and earlier

<table style="width:100%">
{% for i in (2000..2010) reversed %}
{% for p in site.publications %}
{%if p.year == i %}
<tr><td>
<a href="https://doi.org/{{p.doi}}" style="color: #3f3f3f;">
{{ p.authors }} ({{p.year}}) {{p.title}}
{{ p.title }} {{p.journal}}, {{p.vol}}  <span style="color: #2a7ae2;">doi: {{p.doi}}</span></a>
</td></tr>
{% endif %}
{% endfor %}
{% endfor %}
</table>

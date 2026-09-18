# Source Abstract — Contact & Global Locations (OLD SITE)

Source pages fetched 2026-09-18:

- `https://adancorporate.com/en-uk/about-us/contact-us.html` — HTTP 200, 66,070 bytes
- `https://adancorporate.com/en-uk/about-us/global-locations.html` — HTTP 200, 63,569 bytes

Both pages carry the same HTML header comment metadata:

- Datecreated `20190927`
- Datemodified `20210101/20200327`
- Copyright `2013-2021 Adan Corporate`
- Version `1.0`
- Author (in HTML comment only, not rendered): `Chennakeshav Adya <website@adancorporate.com>`

Shared meta description on both pages:
> "Adan Corporate provides a wide range of bespoke advisory services to small and medium sized enterprises at every step of the value creation journey."

Shared footer: `© Adan Corporate 2013 - 2021.` / `Conceptualised, designed, and developed by CA`

---

## 1. Page: Contact Us

Title tag: `Contact Us | Adan Corporate`

### Hero copy (verbatim)

> Drop us a line.
> We would be delighted to hear from you.

CTA button: `Read More About How Adan Corporate (  ) Can Assist` — links to `../about-us/company-overview.html`.
FLAG: the parenthesis in that CTA contains an icon placeholder (`<i class="fa fa-font"></i>`), not a word. Rendered text is literally "Adan Corporate ( ) Can Assist". Likely a JS word-rotator that never got wired, or a decorative glyph. Same string appears on the Global Locations page.

Below hero: `scroll down`

### General mailboxes (in printed order)

| Label (heading) | Link text | Mailbox |
|---|---|---|
| Enquiries | Contact a Partner | partners@adancorporate.com |
| Careers | Contact Careers Team | careers@adancorporate.com |
| Alumni | Contact Alumni Team | alumni@adancorporate.com |
| Media | Contact Media Team | info@adancorporate.com |

FLAG: the "Media" label points at the generic `info@` mailbox, not a `media@` or `press@` address. There is no `media@adancorporate.com` anywhere on either page.

Additional mailbox found on both pages, but ONLY inside an HTML source comment (never rendered to a visitor): `website@adancorporate.com`, attributed to "Chennakeshav Adya".

Complete list of mailboxes appearing on these two pages: `partners@`, `careers@`, `alumni@`, `info@`, `website@` (comment only), plus the 13 distinct individual partner addresses listed in section 3.

### Closing band

> See what we can do for you
> Get in touch

### Footer link labels (as printed)

Legal | Privacy Policy | GDPR | Diversity Policy | Cookie Policy | Accessibility | Sitemap | Contact us
Share on Linkedin | Share on Twitter | Share on Facebook | Share on WhatsApp | Print page
Contact Us | Linkedin | Twitter | Facebook | A Done Deal Podcast | RSS Feed

Cookie banner (verbatim):
> We use cookies to ensure that we give you the best experience on our website. By continuing to browse this site, you agree to the use of cookies and understand our cookie policy .
> I understand

(Trailing space before the full stop after "cookie policy" is in the source.)

---

## 2. Page: Global Locations

Title tag: `Global Locations | Adan Corporate`

### Hero copy (verbatim)

> Adan Corporate has teams in
> 22 cities in 20 countries.
> and growing...

Same `Read More About How Adan Corporate ( ) Can Assist` CTA and `scroll down` label as Contact Us.

FLAG — MAJOR NUMERIC INCONSISTENCY: the page claims **22 cities in 20 countries** but only **14 locations in 13 countries** are actually listed. Counted from the printed cards: London, Zurich/Glattbrugg, Amsterdam, Prague, Milan, Paris, Mumbai, Dubai, Abu Dhabi, Singapore, Almaty, Baku, Johannesburg, Abidjan = 14 cities; UK, Switzerland, Netherlands, Czech Republic, Italy, France, India, UAE (×2 cities), Singapore, Kazakhstan, Azerbaijan, South Africa, Ivory Coast = 13 countries. 8 cities and 7 countries are unaccounted for.

### Body

Below the hero, the Global Locations page's office list is **byte-for-byte identical** to the office list on the Contact Us page (verified by diff). Footer, closing band and cookie banner are also identical.

---

## 3. Offices — every location, in exact printed order

The list is grouped under three region headings: **Europe**, **Asia**, **Africa**. Each card's own heading is transcribed below exactly as printed (note that some headings are countries and some are cities — inconsistent, see FLAGs).

Every card's link reads `Contact a Partner`; the named contact is not printed as a name anywhere, only as the `mailto:` target. The individual addresses are transcribed verbatim from the hrefs.

### Region: Europe

**1. Heading: United Kingdom** (city: London)
```
27
Old Gloucester Street
London WC1N 3AX
United Kingdom
```
Tel: +44 7917 120849
Contact: `ajay.mavinkurve@adancorporate.com`

**2. Heading: Switzerland** (city: Glattbrugg / Zurich)
```
Glattbrugg
Zurich 8152
Switzerland
```
Tel: +41 779767674
Contact: `nitin.kumar@adancorporate.com`
FLAG: no street address — locality only. Also note the phone is printed unspaced, unlike every other entry.

**3. Heading: The Netherlands** (city: Amsterdam)
```
Herengracht 268
1016 BW
Amsterdam
The Netherlands
```
Tel: +31 615 35 3660
Contact: `thomas.peutz@adancorporate.com`

**4. Heading: Czech Republic** (city: Prague)
```
838/9,
Vaclavske nam.
Prague 110 00
The Czech Republic
```
Tel: +420 226 807 069
Contact: `thu.nga@adancorporate.com`

**5. Heading: Italy** (city: Milan)
```
Milan
```
Tel: +44 7469 955740
Contact: `marco.salvini@adancorporate.com`
FLAG: no street address, city only. FLAG: the "Italy" office phone number is a **+44 (United Kingdom) mobile**, not +39.

**6. Heading: France** (city: Paris)
```
Paris
```
Tel: +420 226 807 069
Contact: `jb.tanqueray@adancorporate.com`
FLAG: no street address, city only. FLAG: the "France" phone number is a **+420 (Czech Republic) landline and is byte-identical to the Prague number above**. Almost certainly a copy-paste error in the old site.

### Region: Asia

**7. Heading: India** (city: Mumbai)
```
2nd Floor, Lakshdeep
Gulmohar Lane No. 5,
Juhu JVPD Scheme
Mumbai 400049
India
```
Tel: +91 22 2628 6599
Contact: `sabapatys@adancorporate.com`

**8. Heading: Dubai** (country: United Arab Emirates)
```
Sheikh Zayed Road
Dubai
United Arab Emirates
```
Tel: +971 55455 8146
Tel: +971 50819 2473
Contact: `ck.adya@adancorporate.com`
FLAG: heading is a city, not a country, breaking the pattern of the other European cards. FLAG: street named but no building/tower/unit number. Only card with two phone numbers.

**9. Heading: Abu Dhabi** (country: United Arab Emirates)
```
Garden View
Khalifa Street
Abu Dhabi
United Arab Emirates
```
Tel: +971 56264 4124
Contact: `sp@adancorporate.com`
FLAG: heading is a city, not a country. Also note UAE therefore appears twice as a country while being counted presumably once.

**10. Heading: Singapore** (city and country)
```
Simei Rise
#02-48
Singapore 528808
```
Tel: **NOT GIVEN** — no phone number printed for Singapore.
Contact: `kieran.bourke@adancorporate.com`
FLAG: no street number before "Simei Rise". FLAG: no phone number.

**11. Heading: Kazakhstan** (city: Almaty)
```
46 Valikhanov Str.
Yasamal Office 4
Almaty 050046
Kazakhstan
```
Tel: +994 50 278 7870
Contact: `almira@adancorporate.com`
FLAG: the phone country code **+994 is Azerbaijan**, not Kazakhstan (+7), and the number is byte-identical to the Baku number below. FLAG: "Yasamal" is a district of **Baku**, not Almaty — the address line appears to have been copied from the Azerbaijan card. FLAG: `almira@` is the contact for both Almaty and Baku.

**12. Heading: Azerbaijan** (city: Baku)
```
574-2, Hagverdiyev St
Yasamal district
Baku
Azerbaijan
```
Tel: +994 50 278 7870
Contact: `almira@adancorporate.com`

### Region: Africa

**13. Heading: South Africa** (city: Johannesburg)
```
60 Arum
St John's Avenue
Senderwood
Johannesburg
South Africa
```
Tel: +27 72 969 9865
Contact: `george.christelis@adancorporate.com`

**14. Heading: Ivory Coast** (city: Abidjan)
```
26 BP 1028
Abidjan 26
Cote d'Ivoire
```
Tel: **NOT GIVEN** — no phone number printed for Ivory Coast.
Contact: `chris.king@adancorporate.com`
FLAG: country heading is "Ivory Coast" but the address line reads "Cote d'Ivoire" — inconsistent naming within the same card. Note also the address is a PO Box (`BP`), not a street address.

---

## 4. Offices vs. "presence"

The task asks which cities are offices and which are merely a presence. **Neither page makes that distinction.** The strings "presence", "representative office", "affiliate", "associate office" and similar do NOT appear anywhere in either page's HTML (verified by grep). Every location is presented identically, in the same card component, under the heading "Global Locations" with the hero line "Adan Corporate has teams in …".

FLAG / QUESTION FOR CLIENT: several entries are strongly suggestive of a non-office presence rather than a staffed office — Milan and Paris have no street address at all (city name only) and carry foreign phone numbers; Switzerland has no street address; Singapore and Ivory Coast have no phone number; Dubai has no building number. The old site gives no basis to classify these, so any office/presence split on the new site must be confirmed by the client and cannot be derived from this source.

---

## 5. Named contacts

No contact names are printed on either page. The 13 distinct individual mailboxes below are transcribed verbatim from the `mailto:` hrefs; the person names implied by the local-parts are shown only as a lead for the client to confirm and are NOT sourced from any printed text.

| Location | Mailbox (verbatim) | Name implied by local-part (UNCONFIRMED) |
|---|---|---|
| London, United Kingdom | ajay.mavinkurve@adancorporate.com | Ajay Mavinkurve |
| Zurich/Glattbrugg, Switzerland | nitin.kumar@adancorporate.com | Nitin Kumar |
| Amsterdam, The Netherlands | thomas.peutz@adancorporate.com | Thomas Peutz |
| Prague, Czech Republic | thu.nga@adancorporate.com | Thu Nga |
| Milan, Italy | marco.salvini@adancorporate.com | Marco Salvini |
| Paris, France | jb.tanqueray@adancorporate.com | JB Tanqueray |
| Mumbai, India | sabapatys@adancorporate.com | (initials/surname form — unclear) |
| Dubai, UAE | ck.adya@adancorporate.com | CK Adya |
| Abu Dhabi, UAE | sp@adancorporate.com | (initials only — unclear) |
| Singapore | kieran.bourke@adancorporate.com | Kieran Bourke |
| Almaty, Kazakhstan | almira@adancorporate.com | Almira |
| Baku, Azerbaijan | almira@adancorporate.com | Almira (same person as Almaty) |
| Johannesburg, South Africa | george.christelis@adancorporate.com | George Christelis |
| Abidjan, Ivory Coast | chris.king@adancorporate.com | Chris King |

FLAG: `sabapatys@`, `sp@` and `ck.adya@` do not follow the `firstname.lastname@` convention used by the other ten. `ck.adya@` shares a surname with the site's HTML author credit, "Chennakeshav Adya" — possibly the same person.

---

## 6. Summary of all FLAGs

1. Hero claims "22 cities in 20 countries" but only 14 cities in 13 countries are listed.
2. France/Paris phone `+420 226 807 069` is a Czech number, identical to the Prague entry.
3. Italy/Milan phone `+44 7469 955740` is a UK mobile.
4. Kazakhstan/Almaty phone `+994 50 278 7870` is an Azerbaijan number, identical to the Baku entry.
5. Kazakhstan/Almaty address contains "Yasamal Office 4"; Yasamal is a Baku district — address appears cross-contaminated with the Azerbaijan entry.
6. Singapore and Ivory Coast have no phone number at all.
7. Milan, Paris (city only) and Switzerland (locality only) have no street address; Dubai has a street but no building number; Singapore has "Simei Rise" with no street number.
8. Card headings mix countries (United Kingdom, Italy, Kazakhstan…) with cities (Dubai, Abu Dhabi).
9. "Ivory Coast" heading vs "Cote d'Ivoire" in the address of the same card.
10. "Media" contact resolves to the generic `info@` mailbox.
11. The `( )` in the "Read More About How Adan Corporate ( ) Can Assist" CTA is an empty icon placeholder on both pages.
12. Two pages (Contact Us and Global Locations) carry an identical office list — full duplication.
13. Content is dated 2013–2021; all addresses, phone numbers and partner mailboxes must be re-verified with the client before republication.

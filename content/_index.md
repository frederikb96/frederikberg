---
# Leave the homepage title empty to use the site title
title:
date: 2023-10-01
type: landing

sections:
  - block: about.biography
    id: about
    content:
      title: Biography
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
  - block: experience
    content:
      title: Experience
      # Date format for experience
      #   Refer to https://wowchemy.com/docs/customization/#date-format
      date_format: Jan 2006
      # Experiences.
      #   Add/remove as many `experience` items below as you like.
      #   Required fields are `title`, `company`, and `date_start`.
      #   Leave `date_end` empty if it's your current employer.
      #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
      items:
        - title: Cybersecurity Certifications and Upskilling
          company: ''
          company_url: ''
          company_logo: 
          location: RWTH Aachen
          date_start: '2023-09-01'
          date_end: '2024-03-01'
          description: |2-
              * Lecture: Network security and cryptography
              * Certificates: Google Professional Cybersecurity Certificate, TryHackMe, CompTIA Security+ Certificate ([For more see: Link](./news/it-sec))
        - title: Researcher - Safety of interconnected Embedded Medical Devices
          company: Embedded Software
          company_url: ''
          company_logo: 
          location: RWTH Aachen
          date_start: '2022-08-01'
          date_end: '2023-09-01'
          description: |2-
              * Design and implementation of control algorithms (C and Matlab)
              * Research on contract-based design for interconnected medical devices and hardware security
              * First-author publication on verifiable hardware platform
        - title: Teaching Assistant - Advanced Micocontroller Programming and Debugging
          company: Embedded Software
          company_url: ''
          company_logo: 
          location: RWTH Aachen
          date_start: '2022-08-01'
          date_end: '2023-09-01'
          description: |2-
              Responsibilities include:
              * Restucturing and improving the course content
              * Giving tutorials
              * Creation and grading of exams
        - title: Co-organizer local group
          company: Effective Alturism
          company_url: ''
          company_logo: 
          location: Aachen
          date_start: '2023-03-01'
          date_end: ''
          description: Coordinating events and participating in conferences and online courses focusing on effective, impactful solutions for global challenges.
        - title: Student Job - Software Development for Measurement Equipment
          company: Embedded Software
          company_url: ''
          company_logo: 
          location: RWTH Aachen
          date_start: '2020-10-01'
          date_end: '2022-08-01'
          description: Developed software for controlling medical measurement equipment, including a blood pump control system, using C and Matlab.
        - title: Student Job - Android App Development
          company: Institute of Tansport and Automation Technology
          company_url: ''
          company_logo: 
          location: LUH Hannover
          date_start: '2018-10-01'
          date_end: '2019-03-01'
          description: Developed an Android camera module application for processing visible light signals, utilizing Java.
        - title: Internship - Software Development
          company: KraussMaffei Berstorff GmbH
          company_url: ''
          company_logo: 
          location: Hannover
          date_start: '2017-05-01'
          date_end: '2017-07-01'
          description: Programming of the control system BPC Touch (C#)
        
    design:
      columns: '2'
  - block: accomplishments
    id: accomplishments
    content:
      # Note: `&shy;` is used to add a 'soft' hyphen in a long heading.
      title: 'Accomplish&shy;ments'
      subtitle:
      # Date format: https://wowchemy.com/docs/customization/#date-format
      date_format: Jan 2006
      # Accomplishments.
      #   Add/remove as many `item` blocks below as you like.
      #   `title`, `organization`, and `date_start` are the required parameters.
      #   Leave other parameters empty if not required.
      #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
      items:
        - certificate_url: uploads/ML4Good_Certificate_Frederik_Berg.pdf
          date_end: ''
          date_start: '2023-08-01'
          description: 'Deep Learning Skills and AI Safety. Project: Compute Governance and Security'
          organization: ML4Good
          organization_url: https://germany.ml4good.org/
          title: Maschine Learning for Good - AI Alignment Camp
          url: 'https://germany.ml4good.org/'
        - certificate_url: ./news/it-sec
          date_end: ''
          date_start: '2023-10-01'
          description: 'TryHackMe - Cybsersecurity'
          organization: TryHackMe
          organization_url: https://tryhackme.com/
          title: TryHackMe - Certificates
          url: 'https://tryhackme.com/'
        - certificate_url: uploads/cyber-cert.pdf
          date_end: '2024-02-29'
          date_start: '2024-01-09'
          description: 'Google Cybersecurity Certificates, [see for more](./news/it-sec)'
          organization: Google and Coursera
          organization_url: https://coursera.org/
          title: Google Cybersecurity Certificate
          url: 'https://www.coursera.org/professional-certificates/google-cybersecurity'
        - certificate_url: uploads/security+.pdf
          date_end: '2024-03-26'
          date_start: '2024-02-25'
          description: 'CompTIA Security+ Certificate, [see for more](./news/it-sec)'
          organization: CompTIA
          organization_url: https://www.comptia.org
          title: CompTIA Security+ Certificate
          url: 'https://www.comptia.org/certifications/security'
    design:
      columns: '2'
  - block: collection
    id: publications
    content:
      title: Publications
      subtitle: '[See all](./publication/)'
      filters:
        folders:
          - publication
        featured_only: false
      sort_by: 'Params.prio'
      sort_ascending: true
    design:
      columns: '2'
      view: card
  - block: collection
    id: news
    content:
      title: News
      subtitle: '[See all](./news/)'
      filters:
        folders:
          - news
      count: 5
      sort_by: 'date'
      sort_ascending: false
    design:
      columns: '2'
      view: compact
  - block: portfolio
    id: projects
    content:
      title: Projects
      subtitle: '[See all](./project/)'
      filters:
        folders:
          - project
      # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
      default_button_index: 0
      # Filter toolbar (optional).
      # Add or remove as many filters (`filter_button` instances) as you like.
      # To show all items, set `tag` to "*".
      # To filter by a specific tag, set `tag` to an existing tag name.
      # To remove the toolbar, delete the entire `filter_button` block.
      buttons:
        - name: All
          tag: '*'
        - name: Server
          tag: server
        - name: Bicycle
          tag: bicycle
      sort_by: 'Params.prio'
      sort_ascending: true
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '1'
      view: showcase
      # For Showcase view, flip alternate rows?
      flip_alt_rows: true
  - block: contact
    id: contact
    content:
      title: Contact
      subtitle:
      text: |-
        Just write me a mail or get in contact via Matrix. You can also book and appointment via Nextcloud.
      # Contact (add or remove contact options as necessary)
      email: fberg@posteo.de
      contact_links:
          - icon: comment
            name: DM me on Matrix
            icon_pack: fas
            link: https://matrix.to/#/@freddy:bergrunde.net
      appointment_url: 'https://cloud.bergrunde.net/apps/calendar/appointment/s6X47ckYt86Y'
      # Automatically link email and phone or display as text?
      autolink: true
    design:
      columns: '2'
---

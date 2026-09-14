# APP NAME
> US State Prototype

### authorship + version

`@haydenknight88` \| `2026-09-15` \| `GOLF`

### deployments, codebase, & repo features 

  resource                     link
  ---------------------------- ----------------------
  PROD codebase                [`main`](https://github.com/haydenknight88/fullstack-brain-bucket)
  PROD server                  [GCP](https://console.cloud.google.com/compute/instances?project=fullstack-brain-bucket-507518)
  DEV codebase                 [`dev`](https://github.com/haydenknight88/fullstack-brain-bucket/tree/dev)
  DEV server                   [Render](https://golf-render-knight.onrender.com
)
  docs                         [`docs/`](URL)
  published docs               [GitHub Pages](URL)
  CI/CD workflow               [`deploy.yml`](https://github.com/haydenknight88/fullstack-brain-bucket/tree/main/.github/workflows)
  successful PROD deployment   [GitHub Action](URL)
  resolved GOLF issue          [issue \#](https://github.com/haydenknight88/fullstack-brain-bucket/issues/1)

### user story

- **As a** upcoming full-stack developer,
- **I want** a CI/CD infrastructure
- **so that** I can develop locally, manage my code in GitHub, and
    automatically deploy changes to DEV and PROD environments.

### narrative

For GOLF, I used Project Delta from ITE 376 which is an improved user interface that explored for a simpler way to select states instead of drop down boxes. 

### architecture

``` text
LOCAL
  │
  ▼
GitHub
  │
  ├── dev  ──► Render ─────────► DEV
  │
  └── main ──► GitHub Actions ─► GCP ──► PROD
```

### stack

`HTML/CSS/JS` \| `Node.js` \| `Express` \| `Git/GitHub` \| `Render` \|
`GCP` \| `Linux` \| `Nginx` \| `PM2` \| `Certbot` \| `GitHub Actions`

### project structure

Use `tree` to show your actual project structure.

``` text
repo/
├── .github/
│   └── workflows/
├── docs/
│   └── README.md
├── public/
├── server/
├── .gitignore
└── ...
```

### GCP

external IP: `34.19.146.154`\
Linux user: `haydenknight888`\
instructor SSH public key installed: `yes`

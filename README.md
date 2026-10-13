HOTEL README

# APP NAME
> US State Prototype

### authorship + version

`@haydenknight88` \| `2026-10-13` \| `HOTEL`

### deployments, codebase, & repo features 
| requirement | evidence |
|---|---|
| MongoDB connection | [server code](URL) |
| GET all | [endpoint code](URL) |
| GET one | [endpoint code](URL) |
| filtered GET | [endpoint code](URL) |
| POST / create | [endpoint code](URL) |
| PATCH / update | [endpoint code](URL) |
| DELETE | [endpoint code](URL) |
| frontend `fetch()` | [client code](URL) |
| persistent CRUD | [PROD app](URL) |
| HOTEL milestone | [milestone](URL) |
| example issue | [issue #](URL) |
| development branch | [branch](URL) |
| feature → dev | [PR #](URL) |
| dev → main | [PR #](URL) |
| PROD deployment | [GitHub Action](URL) |


### deployments, codebase, & repo features 
    resource                     link
  ---------------------------- ----------------------
  PROD App                [`main`](https://hayden.barrycumbie.com)
  PROD codebase                [`main`](https://github.com/haydenknight88/fullstack-brain-bucket)
  PROD server                  [GCP](https://console.cloud.google.com/compute/instances?project=fullstack-brain-bucket-507518)
  DEV codebase                 [`dev`](https://github.com/haydenknight88/fullstack-brain-bucket/tree/dev)
  DEV server                   [Render](https://golf-render-knight.onrender.com
)
  docs                         [`docs/`](docs                         [`docs/`](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/docs/README.md))
  published docs               [GitHub Pages](https://haydenknight88.github.io/fullstack-brain-bucket/)
  CI/CD workflow               [`deploy.yml`](https://github.com/haydenknight88/fullstack-brain-bucket/tree/main/.github/workflows)
  successful PROD deployment   [GitHub Action]([URL](https://github.com/haydenknight88/fullstack-brain-bucket/actions/runs/35009652356))
  resolved HOTEL issue          [issue \#]([https://github.com/haydenknight88/fullstack-brain-bucket/issues/1](https://github.com/haydenknight88/fullstack-brain-bucket/issues/6))
  

### architecture

``` text
LOCAL
  │
  ▼
GitHub
  │
  ├── dev  ──► Render ─────────► DEV
  │
  ├──client ──► fetch() ──► Express REST API ──► MongoDB Atlas
  │
  └── main ──► GitHub Actions ─► GCP ──► PROD
```

### stack

`HTML/CSS/JS` \| `Node.js` \| `Express` \| `Git/GitHub` \| `Render` \|
`GCP` \| `Linux` \| `Nginx` \| `PM2` \| `Certbot` \| `GitHub Actions`

### project structure

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


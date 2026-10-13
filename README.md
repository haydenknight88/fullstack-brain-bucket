HOTEL README

# APP NAME
> US State Prototype

### authorship + version

`@haydenknight88` \| `2026-10-13` \| `HOTEL`

### deployments, codebase, & repo features 
| requirement | evidence |
|---|---|
| MongoDB connection | [server code](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/server/app.js#L19-L40) |
| GET all | [endpoint code](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/server/app.js#L66-L82) |
| GET one | [endpoint code](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/server/app.js#L84-L102) |
| filtered GET | [endpoint code](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/server/app.js#L69-L70) |
| POST / create | [endpoint code](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/server/app.js#L113-L128) |
| PATCH / update | [endpoint code](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/server/app.js#L144-L179) |
| DELETE | [endpoint code](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/server/app.js#L182-L212) |
| frontend `fetch()` | [client code](https://github.com/haydenknight88/fullstack-brain-bucket/blob/main/public/hotel.html#L32-L393) |
| persistent CRUD | [PROD app](https://hayden.barrycumbie.com)) |
| HOTEL milestone | [milestone](https://github.com/haydenknight88/fullstack-brain-bucket/milestone/1) |
| example issue | [issue #](https://github.com/haydenknight88/fullstack-brain-bucket/issues/6) |
| development branch | [branch](https://github.com/haydenknight88/fullstack-brain-bucket/tree/dev) |
| feature → dev | [PR #](https://github.com/haydenknight88/fullstack-brain-bucket/pull/9) |
| dev → main | [PR #](URL) |
| PROD deployment | [GitHub Action](https://github.com/haydenknight88/fullstack-brain-bucket/actions/runs/38473724708) |


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


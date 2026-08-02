# Local development

The site is Jekyll, built by GitHub Pages from `master` (root dir) with the
`github-pages` gem. To preview changes locally you need a Ruby the
`github-pages` gem can actually resolve against.

## Ruby version

`github-pages` (232) pins `jekyll-commonmark-ghpages` → `commonmarker 0.23.x`,
which declares `required_ruby_version < 4.0`. Homebrew's default `ruby` on this
Mac is 4.0.x, so bundler cannot resolve the dependency tree with it — it
silently backtracks all the way to `github-pages 8` (2013) instead of erroring.

Use the keg-only Homebrew Ruby 3.4 instead:

```sh
brew install ruby@3.4
```

Then put it first on `PATH` for any command in this repo:

```sh
export PATH="/opt/homebrew/opt/ruby@3.4/bin:$PATH"
```

Verify:

```sh
ruby -v     # ruby 3.4.10
bundle -v   # Bundler version 4.0.15
```

## First-time setup

```sh
cd ~/Code/anantn.github.io
export PATH="/opt/homebrew/opt/ruby@3.4/bin:$PATH"
bundle config set --local path vendor/bundle
bundle install
```

Gems land in `vendor/bundle`; both `vendor/` and `.bundle/` are gitignored.

## Serve with live preview

```sh
cd ~/Code/anantn.github.io
export PATH="/opt/homebrew/opt/ruby@3.4/bin:$PATH"
bundle exec jekyll serve
```

Open <http://127.0.0.1:4000/>. Auto-regeneration is on, so saving a file in
`_posts/`, `_pages/`, `_layouts/`, `_includes/` or `_sass/` rebuilds the site;
reload the browser to see it. Ctrl-C to stop.

One-off build without the server:

```sh
bundle exec jekyll build   # output in _site/
```

## Updating dependencies

```sh
export PATH="/opt/homebrew/opt/ruby@3.4/bin:$PATH"
bundle lock --update    # refresh Gemfile.lock only
bundle install
```

Commit `Gemfile.lock` — that is what Dependabot scans. GitHub Pages itself
ignores the lockfile and builds with its own pinned `github-pages` set, so a
lockfile bump fixes alerts without changing what ships.

## Notes

- `To use retry middleware with Faraday v2.0+, install faraday-retry gem` on
  every build is harmless noise from `octokit`.
- `www.kix.in` is proxied through Cloudflare, which terminates TLS. GitHub's
  "Enforce HTTPS" setting therefore stays off — GitHub can't complete an ACME
  challenge for a domain it doesn't answer for. HTTPS still works, via
  Cloudflare's certificate.

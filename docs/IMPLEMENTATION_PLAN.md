# Implementation Plan

## Phase A — Critical Issues
- **Task**: Restrict EmailJS API Keys.
- **Action**: Ensure the public key `WfqQfI6s1NJIuDhf3` is restricted in the EmailJS dashboard to prevent abuse.

## Phase B — Architecture and Maintainability
- **Task**: Migrate to a Static Site Generator (SSG) or Bundler (Vite).
- **Action**: Replace `fetch('ModulesHTML/...')` with compile-time includes to eliminate FOUC (Flash of Unstyled Content) and layout shifts.

## Phase C — Code Quality and Consistency
- **Task**: Remove unused files and libraries.
- **Action**: Remove jQuery if only used for simple toggles. Rewrite Owl Carousel logic or replace it with a vanilla JS alternative (e.g., Swiper) to drop the jQuery dependency.

## Phase D — Testing and Reliability
- **Task**: Implement tests.
- **Action**: Add a testing framework like Playwright to verify that the charts render correctly and data is fetched without errors.

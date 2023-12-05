# yDiD Project

yDid allows users to consolidate their identity, including usernames, IDs, location data, feeds, certifications and gaming rewards, into a single, user-controlled instance. This instance, based on revocable interfaces or "scopes," grants external applications.

- [yDid Instance](http://137.184.147.114:5700)

- [yDid Client](http://137.184.147.114:5701)

Prerequisites
To run this project, you need:

- Node.js 14 or higher

- PNPM 6 or higher

<!-- * Docker Desktop (or any other Kubernetes cluster such as Minikube, Kind, etc.)

* DevSpace CLI installed -->

## Installation:

To install the dependencies, run:

`pnpm install`

To build the ui-lib, run:

`pnpm lib build`

or in whatch mode:

`pnpm lib dev`

## Usage

To start the client app, run:

`pnpm client dev`

To start the instance app, run:

`pnpm instance dev`

To deploy the apps to Kubernetes using DevSpace, run:

`kubectl create namespace ydid`

`devspace use namespace ydid`

`devspace dev`

For more details and explanations, please watch the YouTube videos.

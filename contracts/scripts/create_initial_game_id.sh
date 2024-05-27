#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export WORLD_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.world.address')

# sozo execute --world <WORLD_ADDRESS> <CONTRACT> <ENTRYPOINT>
sozo execute --world $WORLD_ADDRESS mancala::systems::actions::actions create_initial_game_id
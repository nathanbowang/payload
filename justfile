start:
  cd "{{ justfile_directory() }}"
  docker compose -f test/docker-compose.yml --profile postgres up -d --wait
  pnpm run dev:postgres

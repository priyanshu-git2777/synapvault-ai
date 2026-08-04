-- SynapVault AI local database initialization.
-- This script runs only when PostgreSQL creates a new data volume.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE SCHEMA IF NOT EXISTS synapvault;

COMMENT ON SCHEMA synapvault IS
    'Primary schema for the SynapVault AI application.';
    
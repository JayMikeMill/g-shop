--
-- PostgreSQL database dump
--

\restrict sK58XY1TIBvPiJdcsfadrnI2JnmWe0CqHk1y9ssBavEks6l7cYikYd2LefMPFy5

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: DiscountType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DiscountType" AS ENUM (
    'PERCENTAGE',
    'FIXED_AMOUNT'
);


ALTER TYPE public."DiscountType" OWNER TO postgres;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED'
);


ALTER TYPE public."OrderStatus" OWNER TO postgres;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'CARD',
    'STRIPE',
    'PAYPAL',
    'SQUARE',
    'CASH',
    'APPLE_PAY',
    'GOOGLE_PAY',
    'BANK_TRANSFER',
    'AFTERPAY',
    'KLARNA',
    'BITCOIN',
    'ETHEREUM',
    'LITECOIN',
    'OTHER_CRYPTO',
    'OTHER'
);


ALTER TYPE public."PaymentMethod" OWNER TO postgres;

--
-- Name: ProductStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProductStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'DISCONTINUED'
);


ALTER TYPE public."ProductStatus" OWNER TO postgres;

--
-- Name: ReviewStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ReviewStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."ReviewStatus" OWNER TO postgres;

--
-- Name: StockMovementType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StockMovementType" AS ENUM (
    'SALE',
    'RESTOCK',
    'ADJUSTMENT'
);


ALTER TYPE public."StockMovementType" OWNER TO postgres;

--
-- Name: SystemSettingsScope; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SystemSettingsScope" AS ENUM (
    'SITE',
    'ADMIN',
    'ENGINE'
);


ALTER TYPE public."SystemSettingsScope" OWNER TO postgres;

--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'PENDING',
    'PAID',
    'REFUNDED',
    'FAILED'
);


ALTER TYPE public."TransactionStatus" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'USER',
    'ADMIN',
    'SITE_OWNER'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: lock_top_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket text;
    v_top text;
BEGIN
    FOR v_bucket, v_top IN
        SELECT DISTINCT t.bucket_id,
            split_part(t.name, '/', 1) AS top
        FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        WHERE t.name <> ''
        ORDER BY 1, 2
        LOOP
            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));
        END LOOP;
END;
$$;


ALTER FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: objects_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    -- NEW - OLD (destinations to create prefixes for)
    v_add_bucket_ids text[];
    v_add_names      text[];

    -- OLD - NEW (sources to prune)
    v_src_bucket_ids text[];
    v_src_names      text[];
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NULL;
    END IF;

    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)
    WITH added AS (
        SELECT n.bucket_id, n.name
        FROM new_rows n
        WHERE n.name <> '' AND position('/' in n.name) > 0
        EXCEPT
        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''
    ),
    moved AS (
         SELECT o.bucket_id, o.name
         FROM old_rows o
         WHERE o.name <> ''
         EXCEPT
         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''
    )
    SELECT
        -- arrays for ADDED (dest) in stable order
        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        -- arrays for MOVED (src) in stable order
        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),
        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )
    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;

    -- Nothing to do?
    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN
        RETURN NULL;
    END IF;

    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks
    DECLARE
        v_all_bucket_ids text[];
        v_all_names text[];
    BEGIN
        -- Combine source and destination arrays for consistent lock ordering
        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');
        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');

        -- Single lock call ensures consistent global ordering across all transactions
        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN
            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);
        END IF;
    END;

    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources
    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN
        WITH candidates AS (
            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)
            WHERE name <> ''
        )
        INSERT INTO storage.prefixes (bucket_id, name)
        SELECT c.bucket_id, c.name
        FROM candidates c
        ON CONFLICT DO NOTHING;
    END IF;

    -- 4) Prune source prefixes bottom-up for OLD−NEW
    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN
        -- re-entrancy guard so DELETE on prefixes won't recurse
        IF current_setting('storage.gc.prefixes', true) <> '1' THEN
            PERFORM set_config('storage.gc.prefixes', '1', true);
        END IF;

        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);
    END IF;

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_update_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_level_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_level_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Set the new level
        NEW."level" := "storage"."get_level"(NEW."name");
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_level_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.prefixes_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    sort_col text;
    sort_ord text;
    cursor_op text;
    cursor_expr text;
    sort_expr text;
BEGIN
    -- Validate sort_order
    sort_ord := lower(sort_order);
    IF sort_ord NOT IN ('asc', 'desc') THEN
        sort_ord := 'asc';
    END IF;

    -- Determine cursor comparison operator
    IF sort_ord = 'asc' THEN
        cursor_op := '>';
    ELSE
        cursor_op := '<';
    END IF;
    
    sort_col := lower(sort_column);
    -- Validate sort column  
    IF sort_col IN ('updated_at', 'created_at') THEN
        cursor_expr := format(
            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE "C") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',
            sort_col, cursor_op
        );
        sort_expr := format(
            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE "C" %s',
            sort_col, sort_ord, sort_ord
        );
    ELSE
        cursor_expr := format('($5 = '''' OR name COLLATE "C" %s $5)', cursor_op);
        sort_expr := format('name COLLATE "C" %s', sort_ord);
    END IF;

    RETURN QUERY EXECUTE format(
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    NULL::uuid AS id,
                    updated_at,
                    created_at,
                    NULL::timestamptz AS last_accessed_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
            UNION ALL
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    id,
                    updated_at,
                    created_at,
                    last_accessed_at,
                    metadata
                FROM storage.objects
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
        ) obj
        ORDER BY %s
        LIMIT $3
        $sql$,
        cursor_expr,    -- prefixes WHERE
        sort_expr,      -- prefixes ORDER BY
        cursor_expr,    -- objects WHERE
        sort_expr,      -- objects ORDER BY
        sort_expr       -- final ORDER BY
    )
    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address" (
    id text NOT NULL,
    name text NOT NULL,
    company text,
    email text NOT NULL,
    phone text,
    street1 text NOT NULL,
    street2 text,
    city text NOT NULL,
    state text NOT NULL,
    "postalCode" text NOT NULL,
    country text NOT NULL,
    label text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text,
    "TransactionId" text
);


ALTER TABLE public."Address" OWNER TO postgres;

--
-- Name: Cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart" (
    id text NOT NULL,
    "sessionId" text,
    "userId" text,
    subtotal integer DEFAULT 0 NOT NULL,
    total integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "totalItems" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Cart" OWNER TO postgres;

--
-- Name: CartItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CartItem" (
    id text NOT NULL,
    "cartId" text NOT NULL,
    "productId" text NOT NULL,
    "variantId" text,
    quantity integer DEFAULT 1 NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO postgres;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "seoTitle" text,
    "seoKeywords" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Collection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Collection" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "seoTitle" text,
    "seoKeywords" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Collection" OWNER TO postgres;

--
-- Name: CollectionImageSet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CollectionImageSet" (
    id text NOT NULL,
    banner text,
    preview text,
    thumbnail text,
    "collectionId" text,
    "categoryId" text
);


ALTER TABLE public."CollectionImageSet" OWNER TO postgres;

--
-- Name: Coupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Coupon" (
    id text NOT NULL,
    code text NOT NULL,
    "discountType" public."DiscountType" NOT NULL,
    value integer NOT NULL,
    "usageLimit" integer,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Coupon" OWNER TO postgres;

--
-- Name: Invoice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Invoice" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "invoiceNumber" text NOT NULL,
    "pdfUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Invoice" OWNER TO postgres;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "userId" text,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    total integer NOT NULL,
    tax integer,
    "shippingCost" integer,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "shippingInfoId" text
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    product jsonb NOT NULL,
    variant jsonb,
    quantity integer NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: OrderStatusHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderStatusHistory" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    status public."OrderStatus" NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."OrderStatusHistory" OWNER TO postgres;

--
-- Name: ParcelDimensions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ParcelDimensions" (
    id text NOT NULL,
    "ShippingInfoId" text,
    weight integer,
    length integer,
    width integer,
    height integer
);


ALTER TABLE public."ParcelDimensions" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    sku text,
    price integer DEFAULT 0 NOT NULL,
    discount integer,
    "discountType" public."DiscountType",
    description text NOT NULL,
    stock integer,
    review_count integer DEFAULT 0,
    average_rating double precision DEFAULT 0.0,
    status public."ProductStatus" DEFAULT 'ACTIVE'::public."ProductStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "finalPrice" integer DEFAULT 0 NOT NULL,
    "longName" text
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: ProductDimensions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductDimensions" (
    id text NOT NULL,
    "productId" text NOT NULL,
    weight integer,
    length integer,
    width integer,
    height integer
);


ALTER TABLE public."ProductDimensions" OWNER TO postgres;

--
-- Name: ProductImageSet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductImageSet" (
    id text NOT NULL,
    "productId" text NOT NULL,
    main text NOT NULL,
    preview text NOT NULL,
    thumbnail text NOT NULL
);


ALTER TABLE public."ProductImageSet" OWNER TO postgres;

--
-- Name: ProductOption; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductOption" (
    id text NOT NULL,
    "productId" text NOT NULL,
    name text NOT NULL,
    "values" jsonb NOT NULL
);


ALTER TABLE public."ProductOption" OWNER TO postgres;

--
-- Name: ProductOptionsPreset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductOptionsPreset" (
    id text NOT NULL,
    name text NOT NULL,
    options jsonb NOT NULL
);


ALTER TABLE public."ProductOptionsPreset" OWNER TO postgres;

--
-- Name: ProductReview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductReview" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "productId" text NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    status public."ReviewStatus" DEFAULT 'PENDING'::public."ReviewStatus" NOT NULL,
    "helpfulCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ProductReview" OWNER TO postgres;

--
-- Name: ProductTag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductTag" (
    id text NOT NULL,
    "productId" text NOT NULL,
    name text NOT NULL,
    color text,
    "textColor" text
);


ALTER TABLE public."ProductTag" OWNER TO postgres;

--
-- Name: ProductTagPreset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductTagPreset" (
    id text NOT NULL,
    name text NOT NULL,
    color text,
    "textColor" text
);


ALTER TABLE public."ProductTagPreset" OWNER TO postgres;

--
-- Name: ProductVariant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductVariant" (
    id text NOT NULL,
    "productId" text NOT NULL,
    options jsonb NOT NULL,
    price integer,
    stock integer
);


ALTER TABLE public."ProductVariant" OWNER TO postgres;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "userId" text,
    token text NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- Name: ShippingInfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ShippingInfo" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "addressId" text,
    "fromAddressId" text,
    "shipmentId" text,
    tracking text,
    "labelUrl" text,
    carrier text,
    method text,
    cost integer,
    status text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ShippingInfo" OWNER TO postgres;

--
-- Name: ShippingStatusHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ShippingStatusHistory" (
    id text NOT NULL,
    "shippingInfoId" text NOT NULL,
    status text NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ShippingStatusHistory" OWNER TO postgres;

--
-- Name: StockMovement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StockMovement" (
    id text NOT NULL,
    "productId" text NOT NULL,
    quantity integer NOT NULL,
    type public."StockMovementType" NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    notes text
);


ALTER TABLE public."StockMovement" OWNER TO postgres;

--
-- Name: SystemSettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SystemSettings" (
    id text NOT NULL,
    scope public."SystemSettingsScope" NOT NULL,
    settings jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SystemSettings" OWNER TO postgres;

--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transaction" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    amount integer NOT NULL,
    currency text NOT NULL,
    method public."PaymentMethod" NOT NULL,
    status public."TransactionStatus" NOT NULL,
    "gatewayResponse" jsonb
);


ALTER TABLE public."Transaction" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone text,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "lastLogin" timestamp(3) without time zone,
    "failedLoginAttempts" integer DEFAULT 0 NOT NULL,
    settings jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserPaymentMethod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserPaymentMethod" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type public."PaymentMethod" NOT NULL,
    last4 text NOT NULL,
    expiry text NOT NULL,
    "providerToken" text NOT NULL
);


ALTER TABLE public."UserPaymentMethod" OWNER TO postgres;

--
-- Name: _ProductCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ProductCategories" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ProductCategories" OWNER TO postgres;

--
-- Name: _ProductCollections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ProductCollections" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ProductCollections" OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: seed_files; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.seed_files (
    path text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE supabase_migrations.seed_files OWNER TO postgres;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id) FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Address" (id, name, company, email, phone, street1, street2, city, state, "postalCode", country, label, "createdAt", "updatedAt", "userId", "TransactionId") FROM stdin;
6bd863cf-c5f3-4205-9111-6948fda3fb66	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 15:12:23.822	2025-10-22 15:12:23.822	\N	45a43b10-99b6-4199-9282-aa1023688a73
95538f1f-2d6d-4654-a2a2-a11c7e6afc1d	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 15:12:23.822	2025-10-22 15:12:23.822	\N	\N
7d873758-f3bd-4796-a206-672e1832ff08	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 17:01:58.953	2025-10-22 17:01:58.953	\N	032283af-0eac-4870-81c0-1c355e5286e3
4a5fdab3-bec3-44fc-bb24-bc505f0bcbdb	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 17:01:58.953	2025-10-22 17:01:58.953	\N	\N
0c44785e-02d3-4069-96ae-c724f7356edc	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 17:47:42.574	2025-10-22 17:47:42.574	\N	7041e0ef-8e3b-4b82-a5e1-049c2e96c414
341751ff-867e-4fc3-8bfe-0c7765846348	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 17:47:42.574	2025-10-22 17:47:42.574	\N	\N
686d6968-ef96-4779-b39d-58f6923d1299	JASONs MILLIS	\N	JAYMIKEMILL@GMAIL.COM	51334907171d	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-18 15:02:05.342	2025-10-18 22:17:32.318	\N	\N
0765dca7-c1b3-4f61-b66a-47b573e4ff9a	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-18 15:02:05.342	2025-10-18 22:17:32.318	\N	c63c62e8-75ed-4088-97f1-0169d8a4e041
862b4bbc-f0bb-474f-8de0-6031633130ae	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 01:06:21.414	2025-10-22 01:06:21.414	\N	6e11017a-a65a-4f16-bc39-f6cd0924fcdc
26a26770-8307-4fd3-a55f-4a3b236be934	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 01:06:21.414	2025-10-22 01:06:21.414	\N	\N
9ff0c01a-bb72-439e-bd8d-9234382482f9	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 17:11:06.449	2025-10-22 20:03:34.041	\N	\N
3001c92b-31b1-423b-83ee-ae76026a9b0f	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 17:11:06.449	2025-10-22 20:03:34.041	\N	1a58d17b-6080-442a-af68-0f85b18c41ee
970dc0ce-65b1-4785-988e-b8dbb54e8f54	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 01:08:22.381	2025-10-22 01:08:22.381	\N	2abd8375-2916-4d1d-97dc-85a41a69f3cc
622018f3-5267-4af9-91fb-5de6ac5d8368	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 01:08:22.381	2025-10-22 01:08:22.381	\N	\N
284d0184-bd8c-4b4d-8b37-6aad731507c6	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 17:08:38.886	2025-10-22 20:04:05.103	\N	\N
4c61559f-8c42-42e1-ba33-30d63f78f75e	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 17:08:38.886	2025-10-22 20:04:05.103	\N	0f0f483e-97b2-4098-aced-86f72ea43327
eedd89c2-e38d-4fdb-9bc3-ea896ea56ded	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 18:08:49.746	2025-10-22 20:04:07.706	\N	\N
6017e467-c2f6-48d7-afed-70f19164d1c7	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 18:08:49.746	2025-10-22 20:04:07.706	\N	a1f6eb0d-3e31-424f-8dad-c4b68d26e885
fd6af52e-b08a-4799-97ac-777c98848de5	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 01:11:01.894	2025-10-22 20:04:09.483	\N	\N
e5a4c903-5871-421d-bd97-f089e6a9a024	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 01:11:01.894	2025-10-22 20:04:09.483	\N	d050fcb9-60a1-4ab4-bd78-4cce4f059b25
db9d3a70-8640-431d-a4d4-66a3fc66072e	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:15:45.86	2025-10-22 20:04:20.145	\N	\N
18ef4432-7f2e-458c-b557-c1d6f7b69e63	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:15:45.86	2025-10-22 20:04:20.145	\N	384eac66-0bac-4678-b9c8-eb53745e1054
c7aa3d1e-fb64-4a61-8c47-267f701eb980	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 01:08:03.475	2025-10-23 01:08:29.818	\N	\N
7bf9488e-e13f-40e8-bba6-6807752a832c	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 01:08:03.475	2025-10-23 01:08:29.818	\N	6a6769a6-9ed1-4631-8736-1f9ea2bac645
39486968-a901-4245-b56b-ce971e6fb446	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 02:11:23.408	2025-10-24 23:20:16.222	\N	\N
2e641772-87c7-472c-986d-a24af12f35d0	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 00:52:57.647	2025-10-24 23:20:30.259	\N	\N
f082f217-07fb-477e-af4f-3492881e4985	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 00:52:57.647	2025-10-24 23:20:30.259	\N	45691de3-fe5d-40b5-8ac6-aaa90d76ea20
7b8bb315-7cd5-4791-a0b5-b51d7266d68c	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:14:51.199	2025-10-25 01:44:03.878	\N	\N
b4aa5fa6-2129-43e4-bc62-ae15974439ea	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:14:51.199	2025-10-25 01:44:03.878	\N	3da2adc3-3ff9-4599-8e58-cb5174e30224
6a1a8913-d87a-4d61-b364-84729e637e43	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:15:08.983	2025-10-24 23:36:16.158	\N	\N
e2413c4c-958b-479a-92cb-e291e9ff6335	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:15:08.983	2025-10-24 23:36:16.158	\N	885b1d0b-c0cd-4682-b7aa-6b55bc994aff
c87c10e7-345c-41bf-bffd-646cea16bd85	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:11:34.581	2025-10-25 20:06:26.514	\N	\N
97d9cb83-ab79-4b31-958b-126eb288adbf	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:11:34.581	2025-10-25 20:06:26.514	\N	ea2fa485-80ca-4b6a-a161-23a8baab0bbb
59f0e328-c329-4d3a-9ee1-d3c0e7db3cba	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:13:31.23	2025-10-25 20:06:29.958	\N	b5febca0-dd8a-458a-8784-f93468322ec3
23203d0e-5c3b-437c-821c-a33d0bd630cc	JOHN DOE	\N	JOHN.DOE@EXAMPLE.COM	5555555555	417 MONTGOMERY ST # 5	\N	SAN FRANCISCO	CA	94104-1129	US	\N	2025-10-24 01:17:58.844	2025-10-24 22:31:39.316	\N	\N
4c92023c-c3a1-4ca0-931e-14232240b54b	JOHN DOE	\N	JOHN.DOE@EXAMPLE.COM	5555555555	417 MONTGOMERY ST # 5	\N	SAN FRANCISCO	CA	94104-1129	US	\N	2025-10-24 01:17:58.844	2025-10-24 22:31:39.316	\N	27c4b80c-38f5-40af-968a-878d546136d9
5b4c72b8-8408-441b-b8af-c93929ded195	JOHN DOE	\N	JOHN.DOE@EXAMPLE.COM	5555555555	417 MONTGOMERY ST # 5	\N	SAN FRANCISCO	CA	94104-1129	US	\N	2025-10-23 17:16:09.453	2025-10-24 23:18:18.361	\N	\N
e8ba1e32-fcc0-4977-bbfc-6ea82c99eea5	JOHN DOE	\N	JOHN.DOE@EXAMPLE.COM	5555555555	417 MONTGOMERY ST # 5	\N	SAN FRANCISCO	CA	94104-1129	US	\N	2025-10-23 17:16:09.453	2025-10-24 23:18:18.361	\N	28631bca-b9b4-416f-906f-5bc8391f34e0
9b7b96bd-7a08-4803-b9cc-c1cd9ed4e2f9	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 15:52:56.293	2025-10-24 23:35:45.036	\N	23af5b83-b35e-4285-afd0-b38a37e8f678
37439b78-4704-4771-9826-9286b4e43ca5	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-22 19:13:31.23	2025-10-25 20:06:29.958	\N	\N
922d8f95-bf23-41f0-9734-134016fa464d	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 17:00:48.203	2025-10-24 22:47:00.381	\N	\N
5acf9dcd-9a4d-4e21-a220-05e227482762	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 17:00:48.203	2025-10-24 22:47:00.381	\N	b9a8f675-f41c-4b2f-af07-7361989eaeb4
3f236a58-f58a-4736-b68c-861535107964	JOHN DOE	\N	JOHN.DOE@EXAMPLE.COM	5555555555	417 MONTGOMERY ST # 5	\N	SAN FRANCISCO	CA	94104-1129	US	\N	2025-10-23 17:17:56.194	2025-10-24 22:47:08.983	\N	\N
6037691e-2e82-4776-9fb7-af11d98cf2bc	JOHN DOE	\N	JOHN.DOE@EXAMPLE.COM	5555555555	417 MONTGOMERY ST # 5	\N	SAN FRANCISCO	CA	94104-1129	US	\N	2025-10-23 17:17:56.194	2025-10-24 22:47:08.983	\N	3f93c0d2-3951-4d59-b0c7-378f90850164
af404f8b-cb78-46c3-a761-8b0b5385fd79	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 15:52:14.431	2025-10-24 23:19:00.561	\N	\N
3ca6644b-3331-497c-99d7-02680e633f19	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 15:52:14.431	2025-10-24 23:19:00.561	\N	8ac96734-fd37-4c2c-9d46-a7cb12c8c96b
fbad87cc-8c64-4d2d-b594-df7e003de807	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 15:54:42.877	2025-10-24 23:20:06.976	\N	\N
3fb1f728-3e2c-4d0d-b021-d3073874028f	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 15:54:42.877	2025-10-24 23:20:06.976	\N	8ca5c72a-5034-4b3b-bf84-b6e97b8879c3
c24d2ea7-7cc6-4342-a330-393bedbf34fa	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 02:11:23.408	2025-10-24 23:20:16.222	\N	a038dba3-3c82-46f8-9c39-bcaa95829e15
0a1af156-1921-4de5-95ae-93be264f4e6f	JOHN DOE	\N	JOHN.DOE@EXAMPLE.COM	5555555555	417 MONTGOMERY ST # 5	\N	SAN FRANCISCO	CA	94104-1129	US	\N	2025-10-24 20:31:17.242	2025-10-24 22:33:42.277	\N	\N
b4c1e4ee-8d7d-44eb-9e61-1cffb3895205	JOHN DOE	\N	JOHN.DOE@EXAMPLE.COM	5555555555	417 MONTGOMERY ST # 5	\N	SAN FRANCISCO	CA	94104-1129	US	\N	2025-10-24 20:31:17.242	2025-10-24 22:33:42.277	\N	0fe61f1d-866a-489b-9eeb-d4158ad3ce16
8a56b8ce-c878-465f-ace0-d13fa4b13840	JASON MILLIS	\N	JAYMIKEMILL@GMAIL.COM	5133490717	5032 COLLEGE CORNER PIKE APT 68	\N	OXFORD	OH	45056-1144	US	\N	2025-10-23 15:52:56.293	2025-10-24 23:35:45.036	\N	\N
\.


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cart" (id, "sessionId", "userId", subtotal, total, "createdAt", "updatedAt", "totalItems") FROM stdin;
\.


--
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CartItem" (id, "cartId", "productId", "variantId", quantity, price, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, slug, description, "seoTitle", "seoKeywords", "createdAt", "updatedAt") FROM stdin;
36841477-3922-4b73-997a-60c6b924c942	Hiking Boots	boots	Durable footwear for any trail.		\N	2025-10-24 17:17:35.507	2025-10-24 17:17:35.507
4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9	Backpacks	backpacks	Carry your gear comfortably.\n		\N	2025-10-21 18:45:46.1	2025-10-21 23:19:56.752
574f40ca-014f-4f0c-b477-477de899bf2d	Camping Tents	tents	Bright, reliable outdoor lighting.		\N	2025-10-21 17:46:50.402	2025-10-21 17:46:50.402
f2a2d096-f617-45ea-9971-6246b2f872ac	Flashlights	flashlights	Camping shelters for all adventures.\n		\N	2025-10-24 16:45:12.894	2025-10-24 16:45:12.894
25fa6984-3a8f-48d3-be05-eaa87c2d75aa	Hiking Pants	hiking-pants	Comfortable, weather-ready outdoor pants.		\N	2025-10-24 17:17:54.413	2025-10-24 17:17:54.413
ae16210b-5967-4b73-8ed6-1e4ce664d1fb	Watches	watches	Reliable timepieces for adventure and navigation.		\N	2025-10-24 17:29:11.724	2025-10-24 17:29:11.724
\.


--
-- Data for Name: Collection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Collection" (id, name, slug, description, "seoTitle", "seoKeywords", "createdAt", "updatedAt") FROM stdin;
cb2df478-ae63-4e4d-8502-7b4e23d20899	Top Sellers	top-sellers			\N	2025-10-24 15:34:38.905	2025-10-24 15:34:38.905
26251ea7-8d4b-40c2-a5f1-01531daf0b81	Featured Items	featured-items			\N	2025-10-24 15:45:51.067	2025-10-24 15:45:51.067
c19c4961-8ff4-4717-a612-02e0fd9bf655	New Arrivals	new-arrivals			\N	2025-10-24 18:42:13.107	2025-10-24 18:42:13.107
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	Sale & Clearance	sale-and-clearance			\N	2025-10-24 18:42:55.116	2025-10-24 18:42:55.116
\.


--
-- Data for Name: CollectionImageSet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CollectionImageSet" (id, banner, preview, thumbnail, "collectionId", "categoryId") FROM stdin;
21c48e1b-d276-481d-aa77-c14e26b5ea3d				c19c4961-8ff4-4717-a612-02e0fd9bf655	\N
7331ef63-acc4-45a8-ab46-92adc7b9885b				ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	\N
5afe540b-4396-458c-970b-4f3c5e5d6962	\N	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Hiking%20Boots_preview?v=1761336893036		\N	36841477-3922-4b73-997a-60c6b924c942
f33c8875-522b-40db-8261-7f745ccb6d71	\N	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Backpacks_preview?v=1761336934252	\N	\N	4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9
5f158b74-d24a-4189-98bb-a262a72404dc	\N	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Camping%20Tents_preview?v=1761336944932	\N	\N	574f40ca-014f-4f0c-b477-477de899bf2d
53b51718-fd11-4bf7-be21-1e0cf5bce169		https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Flashlights_preview?v=1761336955677		\N	f2a2d096-f617-45ea-9971-6246b2f872ac
d19bc114-aab9-4614-92f5-df21f3e5cb44				cb2df478-ae63-4e4d-8502-7b4e23d20899	\N
8116d2cd-49f2-4920-bf0c-3e32fbf18516				26251ea7-8d4b-40c2-a5f1-01531daf0b81	\N
3121b4e2-12b6-4976-88fd-433e58133075		https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Hiking%20Pants_preview?v=1761336971436		\N	25fa6984-3a8f-48d3-be05-eaa87c2d75aa
7e9955c2-ff96-4bab-ae61-0bd9a23f3d7e	\N	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Watches_preview?v=1761336989625		\N	ae16210b-5967-4b73-8ed6-1e4ce664d1fb
\.


--
-- Data for Name: Coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Coupon" (id, code, "discountType", value, "usageLimit", "expiresAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: Invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Invoice" (id, "orderId", "invoiceNumber", "pdfUrl", "createdAt") FROM stdin;
eab26499-b4ee-42d1-a2a2-ba4a9c00f776	3342c166-ffeb-4023-a008-5ca29dd66969	INV-1761268677294	\N	2025-10-24 01:17:57.294
3379bbb7-ed22-4d61-bb05-1ea9ff0c2844	151762cc-bdca-4882-89ff-ce00a3131fef	INV-1761238843877	\N	2025-10-23 17:00:43.877
1ccb3735-215e-4c17-b83a-f3f6de7e093f	8450d737-67ca-4ff8-8a93-afe08e29f10f	INV-1761239873779	\N	2025-10-23 17:17:53.779
4e95d0c9-ef69-48ee-9794-0a804eed8011	9f46afa6-1a20-4442-b6b3-c5f1a5c8b9bf	INV-1761239766957	\N	2025-10-23 17:16:06.957
58c6145c-c50a-4335-b013-d84a2e1de698	66ae4502-ab43-49ab-aafc-839a12e8b493	INV-1761234733005	\N	2025-10-23 15:52:13.005
169c21b1-b183-4750-9275-ed13f3b788e8	04c97f3b-7a06-4859-9588-4d05704924f5	INV-1761234881057	\N	2025-10-23 15:54:41.057
8562b570-c28f-4ae0-8cf8-2a24d2e4718f	fd9b99da-40ea-4b35-8f4a-ea2e82b37373	INV-1761185481926	\N	2025-10-23 02:11:21.926
6daee737-852d-4318-9370-c4416e2a3ffe	12683c88-2426-4307-b898-d4a4d4030e2b	INV-1761180776224	\N	2025-10-23 00:52:56.224
5febf227-a9e0-4cc4-8e0c-a9327791465e	701c9b99-7d6a-47f9-8bc9-cecd2bf9a24d	INV-1761337876380	\N	2025-10-24 20:31:16.38
48d40c11-402d-4ea1-8c0a-7e4a5273d85a	b710d8d5-3750-49ca-ae3e-0da70432d6e1	INV-1761234774593	\N	2025-10-23 15:52:54.593
955672ed-c2a7-438f-b946-2b1ad7562e86	758a161e-3c61-44a3-8bc1-3ef65a2ba65c	INV-1760799723446	\N	2025-10-18 15:02:03.446
0b368845-60d1-4899-8117-efd9a92c8881	693d8658-5e84-4716-b81f-ec2db9d590e5	INV-1761095178333	\N	2025-10-22 01:06:18.333
9fc51cdb-b581-4bcd-9aba-b57a08f5d5f4	edc3b29a-0a47-49cb-9be5-dadf5223f19c	INV-1761095298253	\N	2025-10-22 01:08:18.253
617d4443-4ddb-404f-a024-0f29f4143398	8e9909d8-2e25-4038-ae63-39b4aad1f144	INV-1761145941380	\N	2025-10-22 15:12:21.38
a9021bb4-fc0a-4bf4-b7ff-b680977f0f63	c3316227-1a7c-43d5-8309-125fda440627	INV-1761152516950	\N	2025-10-22 17:01:56.95
d88869c4-0d8a-4516-87bf-59068b6c71d7	e0977458-0138-43e2-a6dd-38645dc662ba	INV-1761155260214	\N	2025-10-22 17:47:40.214
aea4176c-5659-4a00-8dc9-3925bdafd3bd	03224cd1-5454-4de6-9037-d31ac972ebcd	INV-1761153063607	\N	2025-10-22 17:11:03.607
858ad16a-6d2d-42ef-9a6d-f27644b7acb1	b0a83e43-f6e4-47a5-8b43-76fa0a6c6873	INV-1761152916629	\N	2025-10-22 17:08:36.629
be57bd61-3504-432c-92ca-9c8605f29b45	6f540d58-397a-43bf-accb-186247bf8cef	INV-1761156527287	\N	2025-10-22 18:08:47.287
4b3e6c9d-682c-47e1-8de0-b731c929f11e	ff0fa19c-6dc9-4a0a-aa2d-c33b87d4e766	INV-1761095457987	\N	2025-10-22 01:10:57.987
fac97976-9e48-4741-a0b3-ec8a367c9640	06c5eebd-2df9-4a6a-9262-4f74dcc7dfce	INV-1761160543429	\N	2025-10-22 19:15:43.429
74513a27-1892-4f9c-9cd8-0b452c4aa7a9	9ba49219-dfcd-4e4f-815d-c39c424cee81	INV-1761181681758	\N	2025-10-23 01:08:01.758
9aa28616-60a4-494b-ada8-b72023fff5fb	5596fb59-e0a1-4480-928e-9186e4af9ba0	INV-1761160506495	\N	2025-10-22 19:15:06.495
fa4fa594-b94e-4202-ac35-0e39aecf3451	d6cb61f3-482b-470e-b5d5-c8aa5683ad1d	INV-1761160488694	\N	2025-10-22 19:14:48.694
d99f463e-39ff-4db7-8e6a-44eed60cebe7	e1a7fb4c-4c07-419c-a3a0-0620b5e6d8f8	INV-1761160292756	\N	2025-10-22 19:11:32.756
632db76f-c50f-4dd3-9e79-26bd5c5c7063	9a596e9b-9688-4011-9970-e049db132e4f	INV-1761160407656	\N	2025-10-22 19:13:27.656
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "userId", status, total, tax, "shippingCost", notes, "createdAt", "updatedAt", "shippingInfoId") FROM stdin;
9f46afa6-1a20-4442-b6b3-c5f1a5c8b9bf	\N	PENDING	18102	1104	0	\N	2025-10-23 17:16:09.453	2025-10-24 23:18:18.361	\N
66ae4502-ab43-49ab-aafc-839a12e8b493	\N	PENDING	16930	1033	0	\N	2025-10-23 15:52:14.431	2025-10-24 23:19:00.561	\N
04c97f3b-7a06-4859-9588-4d05704924f5	\N	PENDING	46423	2833	0	\N	2025-10-23 15:54:42.877	2025-10-24 23:20:06.976	\N
fd9b99da-40ea-4b35-8f4a-ea2e82b37373	\N	PENDING	4578	279	0	\N	2025-10-23 02:11:23.408	2025-10-24 23:20:16.222	\N
12683c88-2426-4307-b898-d4a4d4030e2b	\N	PENDING	209566	12790	0	\N	2025-10-23 00:52:57.647	2025-10-24 23:20:30.259	\N
701c9b99-7d6a-47f9-8bc9-cecd2bf9a24d	\N	PENDING	27473	1676	0	\N	2025-10-24 20:31:17.242	2025-10-24 22:33:42.277	\N
b710d8d5-3750-49ca-ae3e-0da70432d6e1	\N	PENDING	92846	5666	0	\N	2025-10-23 15:52:56.293	2025-10-24 23:35:45.036	\N
5596fb59-e0a1-4480-928e-9186e4af9ba0	\N	PENDING	21298	1299	0	\N	2025-10-22 19:15:08.983	2025-10-24 23:36:16.158	\N
d6cb61f3-482b-470e-b5d5-c8aa5683ad1d	\N	PENDING	6707	409	0	\N	2025-10-22 19:14:51.199	2025-10-25 01:44:03.878	\N
e1a7fb4c-4c07-419c-a3a0-0620b5e6d8f8	\N	PENDING	50907	3107	0	\N	2025-10-22 19:11:34.581	2025-10-25 20:06:26.514	\N
9a596e9b-9688-4011-9970-e049db132e4f	\N	PENDING	6707	409	0	\N	2025-10-22 19:13:31.23	2025-10-25 20:06:29.958	\N
758a161e-3c61-44a3-8bc1-3ef65a2ba65c	\N	PENDING	4260	260	0	\N	2025-10-18 15:02:05.342	2025-10-18 22:17:32.318	\N
693d8658-5e84-4716-b81f-ec2db9d590e5	\N	PENDING	21298	1299	0	\N	2025-10-22 01:06:21.414	2025-10-22 01:06:21.414	\N
edc3b29a-0a47-49cb-9be5-dadf5223f19c	\N	PENDING	21298	1299	0	\N	2025-10-22 01:08:22.381	2025-10-22 01:08:22.381	\N
8e9909d8-2e25-4038-ae63-39b4aad1f144	\N	PENDING	6707	409	0	\N	2025-10-22 15:12:23.822	2025-10-22 15:12:23.822	\N
c3316227-1a7c-43d5-8309-125fda440627	\N	PENDING	56012	3418	0	\N	2025-10-22 17:01:58.953	2025-10-22 17:01:58.953	\N
e0977458-0138-43e2-a6dd-38645dc662ba	\N	PENDING	6707	409	0	\N	2025-10-22 17:47:42.574	2025-10-22 17:47:42.574	\N
03224cd1-5454-4de6-9037-d31ac972ebcd	\N	PENDING	6707	409	0	\N	2025-10-22 17:11:06.449	2025-10-22 20:03:34.041	\N
b0a83e43-f6e4-47a5-8b43-76fa0a6c6873	\N	PENDING	56012	3418	0	\N	2025-10-22 17:08:38.886	2025-10-22 20:04:05.103	\N
6f540d58-397a-43bf-accb-186247bf8cef	\N	PENDING	6707	409	0	\N	2025-10-22 18:08:49.746	2025-10-22 20:04:07.706	\N
ff0fa19c-6dc9-4a0a-aa2d-c33b87d4e766	\N	PENDING	21298	1299	0	\N	2025-10-22 01:11:01.894	2025-10-22 20:04:09.483	\N
06c5eebd-2df9-4a6a-9262-4f74dcc7dfce	\N	PENDING	21298	1299	0	\N	2025-10-22 19:15:45.86	2025-10-22 20:04:20.145	\N
9ba49219-dfcd-4e4f-815d-c39c424cee81	\N	PENDING	128100	7818	0	\N	2025-10-23 01:08:03.475	2025-10-23 01:08:29.818	\N
3342c166-ffeb-4023-a008-5ca29dd66969	\N	PENDING	28216	1722	0	\N	2025-10-24 01:17:58.844	2025-10-24 22:31:39.316	\N
151762cc-bdca-4882-89ff-ce00a3131fef	\N	PENDING	54623	3333	0	\N	2025-10-23 17:00:48.203	2025-10-24 22:47:00.381	\N
8450d737-67ca-4ff8-8a93-afe08e29f10f	\N	PENDING	83694	5108	0	\N	2025-10-23 17:17:56.194	2025-10-24 22:47:08.983	\N
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", product, variant, quantity, price) FROM stdin;
5c0abc1a-ca29-4df4-b25d-0a363208b833	693d8658-5e84-4716-b81f-ec2db9d590e5	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [{"id": "076b49e5-5016-4dd8-9321-88e085cc3883", "name": "Super Deal!", "color": "#e77919ff", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "textColor": "#ffffff"}], "price": 49999, "stock": 0, "images": [{"id": "5fe1bc1d-2e96-457e-a4c0-83b6b676e95b", "main": "https://i.ibb.co/BH8bJ9dy/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/ymZs82tg/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/vCGcLqZ2/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "fbdd7b33-4485-4271-a1c6-a9d9924bb9d6", "main": "https://i.ibb.co/8Zc0kqG/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/TBJ5vKd6/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/67TwShm8/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "e5507b64-ec6b-4071-833c-09905ada44b8", "main": "https://i.ibb.co/Z1Rk7jbM/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/bMN6CX5h/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/k2VsLrvT/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "3a2a5036-7a0b-4ffa-816e-c3dde73fd879", "main": "https://i.ibb.co/Wvr8QbKP/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/FkxnHcVB/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/v49R1cSd/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "2b0edf82-7f08-4b22-9243-1b6bf8f4b498", "main": "https://i.ibb.co/7x8dr4yx/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/ZpHLy151/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/xS1Rmn3K/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 30000, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-21T18:18:21.349Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 19999, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	19999
74978210-b501-463a-9607-76549da81458	edc3b29a-0a47-49cb-9be5-dadf5223f19c	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [{"id": "076b49e5-5016-4dd8-9321-88e085cc3883", "name": "Super Deal!", "color": "#e77919ff", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "textColor": "#ffffff"}], "price": 49999, "stock": 0, "images": [{"id": "5fe1bc1d-2e96-457e-a4c0-83b6b676e95b", "main": "https://i.ibb.co/BH8bJ9dy/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/ymZs82tg/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/vCGcLqZ2/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "fbdd7b33-4485-4271-a1c6-a9d9924bb9d6", "main": "https://i.ibb.co/8Zc0kqG/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/TBJ5vKd6/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/67TwShm8/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "e5507b64-ec6b-4071-833c-09905ada44b8", "main": "https://i.ibb.co/Z1Rk7jbM/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/bMN6CX5h/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/k2VsLrvT/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "3a2a5036-7a0b-4ffa-816e-c3dde73fd879", "main": "https://i.ibb.co/Wvr8QbKP/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/FkxnHcVB/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/v49R1cSd/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "2b0edf82-7f08-4b22-9243-1b6bf8f4b498", "main": "https://i.ibb.co/7x8dr4yx/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/ZpHLy151/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/xS1Rmn3K/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 30000, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-21T18:18:21.349Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 19999, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	19999
f332a9b2-f8a4-46a5-9d62-b50a0aeabde2	66ae4502-ab43-49ab-aafc-839a12e8b493	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 5999, "stock": null, "images": [{"id": "dbeba953-398c-4961-b498-853e0af43af9", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "00098913-bfc7-421e-9d0c-eb8170f27419", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "ed63516d-59f8-4f9b-bf5c-594ab5cb2ef1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}, {"id": "ef61b828-6fe0-41fc-bee2-0c1d5eeb235a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "a25bf386-f52f-4f37-ac98-de523129ee56", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 700, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-23T00:52:58.043Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 5579, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": "PERCENTAGE", "averageRating": 0}	null	3	5299
81bc8d3c-952d-4ec0-ada8-863eaec8ccfc	8e9909d8-2e25-4038-ae63-39b4aad1f144	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "c6c61fdf-a504-4112-9b01-9c35063fbf8a", "main": "https://i.ibb.co/m5PmFBMP/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/N2Ntdsd0/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/nsD3TM5s/CAMPROS-CP-Tents-thumbnail.webp"}, {"id": "9f19fbb0-6ef2-4289-830d-a02d9b636c0c", "main": "https://i.ibb.co/TqTVPZ7V/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/HTfrwWrQ/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/1fyfSMng/CAMPROS-CP-Tents-thumbnail.webp"}, {"id": "22fb13e3-ad91-4303-a654-c66f8deddaeb", "main": "https://i.ibb.co/Fqm30DK4/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/0LXK4Qx/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/cjHCvn4/CAMPROS-CP-Tents-thumbnail.webp"}, {"id": "45a76f86-317c-4685-a0c2-8235d2e3f6be", "main": "https://i.ibb.co/TBCPNBBq/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/C51f6BCp/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/d0KxJYVs/CAMPROS-CP-Tents-thumbnail.webp"}, {"id": "9a0d66fa-f975-4190-87d0-8dda1b9d59bd", "main": "https://i.ibb.co/xKZ0pncv/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/cKgYDCqY/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/5gqKrMTv/CAMPROS-CP-Tents-thumbnail.webp"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-21T18:21:45.812Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	6298
1ce4c5fd-4220-4f35-9ced-818a88ccb005	758a161e-3c61-44a3-8bc1-3ef65a2ba65c	{"id": "2ee38fe6-ef4f-4378-b660-e8a05e501932", "sku": null, "name": "IT WORKS", "tags": [], "price": 1000, "stock": null, "images": [{"id": "7e246530-8faa-43e6-a922-c9402d1b3270", "main": "https://i.ibb.co/XwmMXhk/IT-WORKS-main.webp", "preview": "https://i.ibb.co/398MXpb9/IT-WORKS-preview.webp", "productId": "2ee38fe6-ef4f-4378-b660-e8a05e501932", "thumbnail": "https://i.ibb.co/tMczYSpv/IT-WORKS-thumbnail.webp"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "variants": [], "createdAt": "2025-10-18T01:50:29.254Z", "updatedAt": "2025-10-18T01:50:29.254Z", "categories": [], "dimensions": {"id": "5a2145aa-a7d6-41d0-8190-e2e2195cfe4c", "width": null, "height": null, "length": null, "weight": null, "productId": "2ee38fe6-ef4f-4378-b660-e8a05e501932"}, "collections": [], "description": "YEA!s", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	4	1000
20420c11-5f6e-49fc-9590-6c6276d4f775	c3316227-1a7c-43d5-8309-125fda440627	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [{"id": "076b49e5-5016-4dd8-9321-88e085cc3883", "name": "Super Deal!", "color": "#e77919ff", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "textColor": "#ffffff"}], "price": 49999, "stock": 52, "images": [{"id": "ba0713ee-03f6-4d77-9f84-996a193e5d5f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "6a836edc-b726-4421-8775-d42f7d3aea31", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "4b2cba52-2b8c-48e8-83d9-a8b57fcad54e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "0878bd8f-1f97-4000-bc25-f4763ba3363f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "e2bf3ef4-98dc-452b-a8cc-1999cc717c77", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 30000, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-22T01:11:09.229Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 19999, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	19999
30abc059-aa1b-4400-8093-84b83563bc97	c3316227-1a7c-43d5-8309-125fda440627	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "133fb5d6-32c1-4731-98a6-d603d23c6aa3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "aa68533d-29ef-4514-88f1-e1b01d6eacde", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}, {"id": "d6183102-7bf8-467d-8fb7-4ab9359adabe", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "31ac0705-c6fa-4674-8ea7-f3b716e240f1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "dc375e5d-7bc0-4a36-9b57-54b2110212bf", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-22T15:12:28.367Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	6298
3ef0c01e-725b-43a5-ba59-426f8cb0d7f7	e0977458-0138-43e2-a6dd-38645dc662ba	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "133fb5d6-32c1-4731-98a6-d603d23c6aa3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "aa68533d-29ef-4514-88f1-e1b01d6eacde", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}, {"id": "d6183102-7bf8-467d-8fb7-4ab9359adabe", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "31ac0705-c6fa-4674-8ea7-f3b716e240f1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "dc375e5d-7bc0-4a36-9b57-54b2110212bf", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-22T17:11:09.623Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	6298
3b67983c-c41e-41f0-9098-5dbb95350147	03224cd1-5454-4de6-9037-d31ac972ebcd	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "c6c61fdf-a504-4112-9b01-9c35063fbf8a", "main": "https://i.ibb.co/m5PmFBMP/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/N2Ntdsd0/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/nsD3TM5s/CAMPROS-CP-Tents-thumbnail.webp"}, {"id": "9f19fbb0-6ef2-4289-830d-a02d9b636c0c", "main": "https://i.ibb.co/TqTVPZ7V/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/HTfrwWrQ/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/1fyfSMng/CAMPROS-CP-Tents-thumbnail.webp"}, {"id": "22fb13e3-ad91-4303-a654-c66f8deddaeb", "main": "https://i.ibb.co/Fqm30DK4/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/0LXK4Qx/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/cjHCvn4/CAMPROS-CP-Tents-thumbnail.webp"}, {"id": "45a76f86-317c-4685-a0c2-8235d2e3f6be", "main": "https://i.ibb.co/TBCPNBBq/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/C51f6BCp/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/d0KxJYVs/CAMPROS-CP-Tents-thumbnail.webp"}, {"id": "9a0d66fa-f975-4190-87d0-8dda1b9d59bd", "main": "https://i.ibb.co/xKZ0pncv/CAMPROS-CP-Tents-main.webp", "preview": "https://i.ibb.co/cKgYDCqY/CAMPROS-CP-Tents-preview.webp", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://i.ibb.co/5gqKrMTv/CAMPROS-CP-Tents-thumbnail.webp"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-21T18:21:45.812Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	6298
a31b8445-558b-4707-9067-e26e26870d72	b0a83e43-f6e4-47a5-8b43-76fa0a6c6873	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [{"id": "076b49e5-5016-4dd8-9321-88e085cc3883", "name": "Super Deal!", "color": "#e77919ff", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "textColor": "#ffffff"}], "price": 49999, "stock": 52, "images": [{"id": "ba0713ee-03f6-4d77-9f84-996a193e5d5f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "6a836edc-b726-4421-8775-d42f7d3aea31", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "4b2cba52-2b8c-48e8-83d9-a8b57fcad54e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "0878bd8f-1f97-4000-bc25-f4763ba3363f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "e2bf3ef4-98dc-452b-a8cc-1999cc717c77", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 30000, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-22T01:11:09.229Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 19999, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	19999
702c0068-292f-4da7-ab0b-19a30ade39d1	b0a83e43-f6e4-47a5-8b43-76fa0a6c6873	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "133fb5d6-32c1-4731-98a6-d603d23c6aa3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "aa68533d-29ef-4514-88f1-e1b01d6eacde", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}, {"id": "d6183102-7bf8-467d-8fb7-4ab9359adabe", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "31ac0705-c6fa-4674-8ea7-f3b716e240f1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "dc375e5d-7bc0-4a36-9b57-54b2110212bf", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-22T15:12:28.367Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	6298
8674af9c-7f8c-4a51-aa91-49c78911069d	6f540d58-397a-43bf-accb-186247bf8cef	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "133fb5d6-32c1-4731-98a6-d603d23c6aa3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "aa68533d-29ef-4514-88f1-e1b01d6eacde", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}, {"id": "d6183102-7bf8-467d-8fb7-4ab9359adabe", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "31ac0705-c6fa-4674-8ea7-f3b716e240f1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "dc375e5d-7bc0-4a36-9b57-54b2110212bf", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-22T17:47:46.644Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	6298
7165b936-168e-4183-80f4-8a7ae5e7362d	ff0fa19c-6dc9-4a0a-aa2d-c33b87d4e766	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [{"id": "076b49e5-5016-4dd8-9321-88e085cc3883", "name": "Super Deal!", "color": "#e77919ff", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "textColor": "#ffffff"}], "price": 49999, "stock": 0, "images": [{"id": "5fe1bc1d-2e96-457e-a4c0-83b6b676e95b", "main": "https://i.ibb.co/BH8bJ9dy/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/ymZs82tg/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/vCGcLqZ2/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "fbdd7b33-4485-4271-a1c6-a9d9924bb9d6", "main": "https://i.ibb.co/8Zc0kqG/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/TBJ5vKd6/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/67TwShm8/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "e5507b64-ec6b-4071-833c-09905ada44b8", "main": "https://i.ibb.co/Z1Rk7jbM/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/bMN6CX5h/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/k2VsLrvT/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "3a2a5036-7a0b-4ffa-816e-c3dde73fd879", "main": "https://i.ibb.co/Wvr8QbKP/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/FkxnHcVB/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/v49R1cSd/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}, {"id": "2b0edf82-7f08-4b22-9243-1b6bf8f4b498", "main": "https://i.ibb.co/7x8dr4yx/MOON-LENCE-Instant-Pop-Up-Tent-main.webp", "preview": "https://i.ibb.co/ZpHLy151/MOON-LENCE-Instant-Pop-Up-Tent-preview.webp", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://i.ibb.co/xS1Rmn3K/MOON-LENCE-Instant-Pop-Up-Tent-thumbnail.webp"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 30000, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-21T18:18:21.349Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 19999, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	19999
4524bacd-427c-4aa1-8e44-1138a0c9fe01	06c5eebd-2df9-4a6a-9262-4f74dcc7dfce	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [{"id": "076b49e5-5016-4dd8-9321-88e085cc3883", "name": "Super Deal!", "color": "#e77919ff", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "textColor": "#ffffff"}], "price": 49999, "stock": 48, "images": [{"id": "ba0713ee-03f6-4d77-9f84-996a193e5d5f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "6a836edc-b726-4421-8775-d42f7d3aea31", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "4b2cba52-2b8c-48e8-83d9-a8b57fcad54e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "0878bd8f-1f97-4000-bc25-f4763ba3363f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "e2bf3ef4-98dc-452b-a8cc-1999cc717c77", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 30000, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-22T17:08:39.012Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 19999, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	19999
bc05a78e-012d-4819-880f-25d6352c3fed	9ba49219-dfcd-4e4f-815d-c39c424cee81	{"id": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "sku": null, "name": "Coleman Sundome Camping Tent", "tags": [], "price": 28900, "stock": null, "images": [{"id": "2c7eae10-a70e-43d3-961f-5cc37603b85a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail"}, {"id": "83863200-e57f-4af8-bc70-b8cf404681b4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail"}, {"id": "324410aa-a785-43d5-be4b-aabef7c2680a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail"}, {"id": "c1f3e7cc-04db-4ed5-abe7-660c49e191ff", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail"}, {"id": "96b18e5d-aaa7-4388-a9d0-c92a318b326b", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 5000, "longName": "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More", "variants": [], "createdAt": "2025-10-21T17:13:11.682Z", "updatedAt": "2025-10-23T00:52:57.840Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "557e37c8-fcba-4e82-babb-b188863071e4", "width": 32, "height": 160, "length": 32, "weight": 4000, "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4"}, "finalPrice": 23900, "collections": [], "description": "Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	23900
8238b488-6549-4689-a47b-c3cd94beb028	9ba49219-dfcd-4e4f-815d-c39c424cee81	{"id": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "sku": null, "name": "MOUNTAINTOP 30L Hiking Backpack", "tags": [], "price": 49191, "stock": null, "images": [{"id": "d507221b-631e-4a32-acdc-e2fdc9e1d7d4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_thumbnail"}, {"id": "4bb06b4e-0fc5-43dc-a5b5-feb0224b9623", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_thumbnail"}, {"id": "8e9c9580-a5ec-4b25-8c38-6df37aa6525b", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_thumbnail"}, {"id": "4156dcab-a204-4d37-8f26-423e6e593dc5", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_thumbnail"}, {"id": "26b7408a-f121-4fbd-8d13-88d5553e156d", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_thumbnail"}, {"id": "34a4c7a6-ac9a-4ed5-89ff-e81841cd32f3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 1000, "longName": "MOUNTAINTOP 30L Hiking Backpack,Men Women Camping Backpack,Lightweight Trekking Travel Backpacks for Climbing Skiing Cycling", "variants": [], "createdAt": "2025-10-21T18:44:38.531Z", "updatedAt": "2025-10-23T00:52:57.910Z", "categories": [{"id": "4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9", "name": "Backpacks", "slug": "backpacks", "seoTitle": "", "createdAt": "2025-10-21T18:45:46.100Z", "updatedAt": "2025-10-21T23:19:56.752Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "d91b2f88-001d-422d-9ecb-c5fbf0514231", "width": 50, "height": 60, "length": 40, "weight": 3000, "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0"}, "finalPrice": 48191, "collections": [], "description": "【Premium Comfort & Durability】: MOUNTAINTOP hiking daypack is made of high-density 500D polyester, which is lightweight, anti-tear, water repellent. In addition, all of the backpack's stress points and shoulder straps are reinforced with lap-knots to ensure long lasting durability.\\n【Spacious And Organized Storage Space】: With a 30L capacity for 1-2 day hike or 3 day trip, our travel backpack features a multi-compartment design including one main roomy compartment with a interior sleeve for hydration bladder,One front pocket with buckle closure, one front pocket and 2 side pockets.\\n【Durable And Ergonomically Designed】: rucking backpack is equipped with ergonomic shoulder straps and back support system, load compression strap system on both sides and bottom to adjust and tighten the backpack. Provides a good sense of comfort and support, helping to reduce fatigue during long hiking trips.\\n【Unique Functional Design】:The main pocket of the camping backpack has a strap for binding the water bag liner and a hose hole on the top side for assembling the water bag system; the side straps and buckles can be used to fix water bottles or trekking poles, and the bottom straps can be used to fix a tripod or a sleeping pad.\\n【Lightweight & Multi-Purpose】:Hiking backpack men is lightweight, weighing only 1.8 pound; the large capacity and multiple pockets are perfect for hiking, camping, hiking, fishing and the rest of outdoor activities. It meets the size requirements of most airlines. This camping backpack can be used as a hiking backpack, travel bag and business bag, suitable for both men and women.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	48191
eb5a8509-6999-4f3b-ba10-de5a2dabd16c	fd9b99da-40ea-4b35-8f4a-ea2e82b37373	{"id": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "sku": null, "name": "Coleman Sundome Camping Tent", "tags": [], "price": 4799, "stock": null, "images": [{"id": "ed23e349-bdb2-4af8-8a49-07a8b1571cbc", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail"}, {"id": "fc25c906-ab0e-4c00-8cb7-3ac59035ae23", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail"}, {"id": "8b296f5e-4978-4789-a5b4-758c3f87178f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail"}, {"id": "f1785312-c52d-4563-97de-4d13bc84c880", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail"}, {"id": "30f69f78-5965-40bd-883b-71e5fec7224a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More", "variants": [], "createdAt": "2025-10-21T17:13:11.682Z", "updatedAt": "2025-10-23T01:08:03.610Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "557e37c8-fcba-4e82-babb-b188863071e4", "width": 32, "height": 160, "length": 32, "weight": 4000, "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4"}, "finalPrice": 4299, "collections": [], "description": "Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	4299
615ce88a-1890-448d-b87d-8ddd83c96cbe	12683c88-2426-4307-b898-d4a4d4030e2b	{"id": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "sku": null, "name": "Coleman Sundome Camping Tent", "tags": [], "price": 28900, "stock": null, "images": [{"id": "2c7eae10-a70e-43d3-961f-5cc37603b85a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail"}, {"id": "83863200-e57f-4af8-bc70-b8cf404681b4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail"}, {"id": "324410aa-a785-43d5-be4b-aabef7c2680a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail"}, {"id": "c1f3e7cc-04db-4ed5-abe7-660c49e191ff", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail"}, {"id": "96b18e5d-aaa7-4388-a9d0-c92a318b326b", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 5000, "longName": "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More", "variants": [], "createdAt": "2025-10-21T17:13:11.682Z", "updatedAt": "2025-10-22T19:11:34.721Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "557e37c8-fcba-4e82-babb-b188863071e4", "width": 32, "height": 160, "length": 32, "weight": 4000, "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4"}, "finalPrice": 23900, "collections": [], "description": "Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	23900
a9cff026-57de-4bb6-9f41-f4ccd11d6b71	12683c88-2426-4307-b898-d4a4d4030e2b	{"id": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "sku": null, "name": "MOUNTAINTOP 30L Hiking Backpack", "tags": [], "price": 49191, "stock": null, "images": [{"id": "d507221b-631e-4a32-acdc-e2fdc9e1d7d4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_thumbnail"}, {"id": "4bb06b4e-0fc5-43dc-a5b5-feb0224b9623", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_thumbnail"}, {"id": "8e9c9580-a5ec-4b25-8c38-6df37aa6525b", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_thumbnail"}, {"id": "4156dcab-a204-4d37-8f26-423e6e593dc5", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_thumbnail"}, {"id": "26b7408a-f121-4fbd-8d13-88d5553e156d", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_thumbnail"}, {"id": "34a4c7a6-ac9a-4ed5-89ff-e81841cd32f3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 1000, "longName": "MOUNTAINTOP 30L Hiking Backpack,Men Women Camping Backpack,Lightweight Trekking Travel Backpacks for Climbing Skiing Cycling", "variants": [], "createdAt": "2025-10-21T18:44:38.531Z", "updatedAt": "2025-10-21T18:44:38.531Z", "categories": [{"id": "4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9", "name": "Backpacks", "slug": "backpacks", "seoTitle": "", "createdAt": "2025-10-21T18:45:46.100Z", "updatedAt": "2025-10-21T23:19:56.752Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "d91b2f88-001d-422d-9ecb-c5fbf0514231", "width": 50, "height": 60, "length": 40, "weight": 3000, "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0"}, "finalPrice": 48191, "collections": [], "description": "【Premium Comfort & Durability】: MOUNTAINTOP hiking daypack is made of high-density 500D polyester, which is lightweight, anti-tear, water repellent. In addition, all of the backpack's stress points and shoulder straps are reinforced with lap-knots to ensure long lasting durability.\\n【Spacious And Organized Storage Space】: With a 30L capacity for 1-2 day hike or 3 day trip, our travel backpack features a multi-compartment design including one main roomy compartment with a interior sleeve for hydration bladder,One front pocket with buckle closure, one front pocket and 2 side pockets.\\n【Durable And Ergonomically Designed】: rucking backpack is equipped with ergonomic shoulder straps and back support system, load compression strap system on both sides and bottom to adjust and tighten the backpack. Provides a good sense of comfort and support, helping to reduce fatigue during long hiking trips.\\n【Unique Functional Design】:The main pocket of the camping backpack has a strap for binding the water bag liner and a hose hole on the top side for assembling the water bag system; the side straps and buckles can be used to fix water bottles or trekking poles, and the bottom straps can be used to fix a tripod or a sleeping pad.\\n【Lightweight & Multi-Purpose】:Hiking backpack men is lightweight, weighing only 1.8 pound; the large capacity and multiple pockets are perfect for hiking, camping, hiking, fishing and the rest of outdoor activities. It meets the size requirements of most airlines. This camping backpack can be used as a hiking backpack, travel bag and business bag, suitable for both men and women.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	48191
4f5e564c-064d-49cc-8332-79a3f7fd1385	12683c88-2426-4307-b898-d4a4d4030e2b	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [{"id": "076b49e5-5016-4dd8-9321-88e085cc3883", "name": "Super Deal!", "color": "#e77919ff", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "textColor": "#ffffff"}], "price": 49999, "stock": 46, "images": [{"id": "ba0713ee-03f6-4d77-9f84-996a193e5d5f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "6a836edc-b726-4421-8775-d42f7d3aea31", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "4b2cba52-2b8c-48e8-83d9-a8b57fcad54e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "0878bd8f-1f97-4000-bc25-f4763ba3363f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "e2bf3ef4-98dc-452b-a8cc-1999cc717c77", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 30000, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-22T19:15:49.362Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 19999, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	19999
65a938ac-4bff-48ec-b13a-b74ad2064a95	12683c88-2426-4307-b898-d4a4d4030e2b	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "133fb5d6-32c1-4731-98a6-d603d23c6aa3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "31ac0705-c6fa-4674-8ea7-f3b716e240f1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "dc375e5d-7bc0-4a36-9b57-54b2110212bf", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}, {"id": "d6183102-7bf8-467d-8fb7-4ab9359adabe", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "aa68533d-29ef-4514-88f1-e1b01d6eacde", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-22T19:14:51.369Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	6298
68e0d565-6b87-4b81-bd7a-6f661e67efbb	b710d8d5-3750-49ca-ae3e-0da70432d6e1	{"id": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "sku": null, "name": "Coleman Sundome Camping Tent", "tags": [], "price": 4799, "stock": null, "images": [{"id": "ed23e349-bdb2-4af8-8a49-07a8b1571cbc", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail"}, {"id": "fc25c906-ab0e-4c00-8cb7-3ac59035ae23", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail"}, {"id": "8b296f5e-4978-4789-a5b4-758c3f87178f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail"}, {"id": "f1785312-c52d-4563-97de-4d13bc84c880", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail"}, {"id": "30f69f78-5965-40bd-883b-71e5fec7224a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More", "variants": [], "createdAt": "2025-10-21T17:13:11.682Z", "updatedAt": "2025-10-23T02:11:23.598Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "557e37c8-fcba-4e82-babb-b188863071e4", "width": 32, "height": 160, "length": 32, "weight": 4000, "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4"}, "finalPrice": 4299, "collections": [], "description": "Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	4299
5e59be5c-5f8b-44dd-9a69-630a76152069	b710d8d5-3750-49ca-ae3e-0da70432d6e1	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [], "price": 8499, "stock": 44, "images": [{"id": "384c72b8-5e39-44e8-9089-27288bccb488", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "dba62c21-36d7-4972-a6b8-f5b5c8540ef9", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "45c90c52-c546-408d-b99e-0fe0acf71601", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "c159b08d-9335-41aa-8a3b-88d3a28b761e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "b7f16b5f-8055-4375-8c0c-3d92723813d6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-23T00:52:57.980Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 8499, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	8499
4463f412-f0b5-4482-80e8-50e4dfd1460d	b710d8d5-3750-49ca-ae3e-0da70432d6e1	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 5999, "stock": null, "images": [{"id": "dbeba953-398c-4961-b498-853e0af43af9", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "00098913-bfc7-421e-9d0c-eb8170f27419", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "ed63516d-59f8-4f9b-bf5c-594ab5cb2ef1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}, {"id": "ef61b828-6fe0-41fc-bee2-0c1d5eeb235a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "a25bf386-f52f-4f37-ac98-de523129ee56", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 700, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-23T15:52:14.683Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 5579, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": "PERCENTAGE", "averageRating": 0}	null	2	5299
33ace6ef-7e4b-4d21-8c95-bf441f62f800	b710d8d5-3750-49ca-ae3e-0da70432d6e1	{"id": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "sku": null, "name": "MOUNTAINTOP 30L Hiking Backpack", "tags": [{"id": "5dfc504f-1326-41a7-b3bf-b92234414f9d", "name": "TOP SELLER", "color": "#f6ffa7", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "textColor": "#000000"}], "price": 4999, "stock": null, "images": [{"id": "a8802d32-f9e8-47b4-92b6-afec2f929a55", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_thumbnail"}, {"id": "98773de4-0fe3-4f7a-9b15-98f53daebe8b", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_thumbnail"}, {"id": "b22e4ccd-d92b-431e-88b3-cc32da1c5f85", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_thumbnail"}, {"id": "dfac7d69-5d96-4896-9ef1-3b99197dafcd", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_thumbnail"}, {"id": "554d0ae9-7262-452a-9af8-aeb87bae348b", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_thumbnail"}, {"id": "532e82ca-ad72-4bff-b8dc-7519fe118587", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 1000, "longName": "MOUNTAINTOP 30L Hiking Backpack,Men Women Camping Backpack,Lightweight Trekking Travel Backpacks for Climbing Skiing Cycling", "variants": [], "createdAt": "2025-10-21T18:44:38.531Z", "updatedAt": "2025-10-23T01:08:03.681Z", "categories": [{"id": "4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9", "name": "Backpacks", "slug": "backpacks", "seoTitle": "", "createdAt": "2025-10-21T18:45:46.100Z", "updatedAt": "2025-10-21T23:19:56.752Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "d91b2f88-001d-422d-9ecb-c5fbf0514231", "width": 50, "height": 60, "length": 40, "weight": 3000, "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0"}, "finalPrice": 3999, "collections": [], "description": "【Premium Comfort & Durability】: MOUNTAINTOP hiking daypack is made of high-density 500D polyester, which is lightweight, anti-tear, water repellent. In addition, all of the backpack's stress points and shoulder straps are reinforced with lap-knots to ensure long lasting durability.\\n【Spacious And Organized Storage Space】: With a 30L capacity for 1-2 day hike or 3 day trip, our travel backpack features a multi-compartment design including one main roomy compartment with a interior sleeve for hydration bladder,One front pocket with buckle closure, one front pocket and 2 side pockets.\\n【Durable And Ergonomically Designed】: rucking backpack is equipped with ergonomic shoulder straps and back support system, load compression strap system on both sides and bottom to adjust and tighten the backpack. Provides a good sense of comfort and support, helping to reduce fatigue during long hiking trips.\\n【Unique Functional Design】:The main pocket of the camping backpack has a strap for binding the water bag liner and a hose hole on the top side for assembling the water bag system; the side straps and buckles can be used to fix water bottles or trekking poles, and the bottom straps can be used to fix a tripod or a sleeping pad.\\n【Lightweight & Multi-Purpose】:Hiking backpack men is lightweight, weighing only 1.8 pound; the large capacity and multiple pockets are perfect for hiking, camping, hiking, fishing and the rest of outdoor activities. It meets the size requirements of most airlines. This camping backpack can be used as a hiking backpack, travel bag and business bag, suitable for both men and women.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	3999
776919cf-13a9-41ce-94ff-e7fdd264e677	b710d8d5-3750-49ca-ae3e-0da70432d6e1	{"id": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "sku": null, "name": "MOLLE Assault Backpack", "tags": [{"id": "e1bebb28-1136-4293-814e-e1302aa1c20c", "name": "GREAT DEAL", "color": "#ffc366", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "textColor": "#000000"}], "price": 3995, "stock": null, "images": [{"id": "b76ce76f-d8eb-4c71-99eb-8db04a55b07e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_thumbnail"}, {"id": "2ee7b570-bd8b-41ae-9a32-c4f569241f59", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_thumbnail"}, {"id": "c06217e0-915b-4f18-bcd3-d69e66387a16", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_thumbnail"}, {"id": "5b8ba41f-467e-4aae-9148-3d802c6e7916", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_thumbnail"}, {"id": "ab785bdd-5db2-40dd-9808-09af5a32b4f9", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 1000, "longName": "MOLLE Assault Backpack, Tactical Backpack Military Army Camping Rucksack, 3-Day Pack Trip w/USA Flag Patch, D-Rings, Black", "variants": [], "createdAt": "2025-10-21T18:48:30.682Z", "updatedAt": "2025-10-21T18:48:30.682Z", "categories": [{"id": "4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9", "name": "Backpacks", "slug": "backpacks", "seoTitle": "", "createdAt": "2025-10-21T18:45:46.100Z", "updatedAt": "2025-10-21T23:19:56.752Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "30ae6549-dc81-4720-9182-6c941ae59392", "width": 50, "height": 56, "length": 40, "weight": 2500, "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a"}, "finalPrice": 2995, "collections": [], "description": "LARGE CAPACITY - Military tactical backpack size approx.:12\\"*20\\"*13\\" / 30*50*33CM (W*H*D) Capacity:40L, This tactical military assault backpack is made of quality and water-resistant High Density fabric, With Large Capacity allow you to carry all your tactical gears, it can be used as 3 day assault pack, bug out bag backpack, emergency backpack, combat backpack, range bag, molle emt backpack, EDC outdoor backpack, hunting backpack, travel backpack, survival backpack or trekking backpack\\nMULTI-FUNCTIONAL - This tactical assault pack have 2 main compartments, 2 small compartments in front, and a back compartment for a hydration bladder. Each of the compartments has variety pockets to help with organization. The large compartment area has an elastic strap to hold laptops or anything you don't want to move around. Each pocket has two zipper pulls, and one of the compartments that can fully open all the way down to the bottom like suitcase.\\nCOMFORTABLE & TOUGH - The shoulder straps are padded and adjustable and the waist belt expands enough. The thick mesh padding back area and shoulder straps will not pinch you under heavy duty. Thick padded back panel pocket works great with 3L hydration bladder(hydration bladder do not include)\\nARMY MOLLE SYSTEM - The front and both sides come with MOLLE system, Molle webbing throughout for attaching additional tactical pouches or gear as 3 day assault pack backpack combat molle backpack. The Y strap and buckle on the front is great to roll up a sweatshirt or light jacket. And the straps at the bottom can be used to hold a tent or sleeping pad.\\nPACKAGE INCLUDED - 1 Tactical backpack, US Flag patch, 2pcs D-Ring, 1pc MOLLE Webbing Dominators. Should you have any additional problem, please let us know without hesitation at any time.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	2995
9133c3f4-bb8f-4b15-9136-660ee55263c3	5596fb59-e0a1-4480-928e-9186e4af9ba0	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [{"id": "076b49e5-5016-4dd8-9321-88e085cc3883", "name": "Super Deal!", "color": "#e77919ff", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "textColor": "#ffffff"}], "price": 49999, "stock": 48, "images": [{"id": "ba0713ee-03f6-4d77-9f84-996a193e5d5f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "6a836edc-b726-4421-8775-d42f7d3aea31", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "4b2cba52-2b8c-48e8-83d9-a8b57fcad54e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "0878bd8f-1f97-4000-bc25-f4763ba3363f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "e2bf3ef4-98dc-452b-a8cc-1999cc717c77", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 30000, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-22T17:08:39.012Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 19999, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	19999
3ed021a6-af3e-4070-8a60-43cbf31d2141	d6cb61f3-482b-470e-b5d5-c8aa5683ad1d	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "133fb5d6-32c1-4731-98a6-d603d23c6aa3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "aa68533d-29ef-4514-88f1-e1b01d6eacde", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}, {"id": "d6183102-7bf8-467d-8fb7-4ab9359adabe", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "31ac0705-c6fa-4674-8ea7-f3b716e240f1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "dc375e5d-7bc0-4a36-9b57-54b2110212bf", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-22T19:13:35.540Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	6298
9411a56b-8496-4de1-b1a3-bd43bbef5bce	e1a7fb4c-4c07-419c-a3a0-0620b5e6d8f8	{"id": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "sku": null, "name": "Coleman Sundome Camping Tent", "tags": [], "price": 28900, "stock": null, "images": [{"id": "2c7eae10-a70e-43d3-961f-5cc37603b85a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail"}, {"id": "83863200-e57f-4af8-bc70-b8cf404681b4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail"}, {"id": "324410aa-a785-43d5-be4b-aabef7c2680a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail"}, {"id": "c1f3e7cc-04db-4ed5-abe7-660c49e191ff", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail"}, {"id": "96b18e5d-aaa7-4388-a9d0-c92a318b326b", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 5000, "longName": "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More", "variants": [], "createdAt": "2025-10-21T17:13:11.682Z", "updatedAt": "2025-10-21T17:13:11.682Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "557e37c8-fcba-4e82-babb-b188863071e4", "width": 32, "height": 160, "length": 32, "weight": 4000, "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4"}, "finalPrice": 23900, "collections": [], "description": "Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	23900
c54fd5ec-97ab-416e-9260-9f46e98e3b75	9a596e9b-9688-4011-9970-e049db132e4f	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 6798, "stock": null, "images": [{"id": "133fb5d6-32c1-4731-98a6-d603d23c6aa3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "aa68533d-29ef-4514-88f1-e1b01d6eacde", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}, {"id": "d6183102-7bf8-467d-8fb7-4ab9359adabe", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "31ac0705-c6fa-4674-8ea7-f3b716e240f1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "dc375e5d-7bc0-4a36-9b57-54b2110212bf", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-22T18:08:53.908Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 6299, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	6298
49fae59e-fea8-40f5-ab6e-295947595d12	b710d8d5-3750-49ca-ae3e-0da70432d6e1	{"id": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "sku": null, "name": "Hewolf 2/3/4 Person Camping Tent", "tags": [{"id": "f2d90042-a58a-451e-ae50-ddbbcd02176e", "name": "Popular!", "color": "#478d03", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "textColor": "#eefff1"}], "price": 12999, "stock": null, "images": [{"id": "97a64d9b-cc87-447b-a581-3ce88cd87ac7", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_thumbnail"}, {"id": "d3a7a367-9b90-4f29-bbab-00ce77d474d4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_thumbnail"}, {"id": "75c1ac86-ce4a-487e-a89e-63b4c80fd720", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_thumbnail"}, {"id": "f42ff997-8cbc-4d2a-89f6-76d673bbac8e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_thumbnail"}, {"id": "1e87e2b6-a756-4570-8c37-46fec624f364", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_thumbnail"}, {"id": "dcc8cfb0-4ca3-4f0d-9131-b97466cd82d1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 2000, "longName": "Hewolf 2/3/4 Person Camping Tent - Instant Pop Up Waterproof 2 Doors Tent with Easy Setup | 3-Season Hexagonal Dome Design for Family, Hiking & Traveling", "variants": [], "createdAt": "2025-10-21T17:56:40.417Z", "updatedAt": "2025-10-21T17:56:40.417Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "745c789f-42bd-4645-92ab-caaf3f81f013", "width": 40, "height": 80, "length": 40, "weight": 6000, "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2"}, "finalPrice": 10999, "collections": [], "description": "Multi-Season Use: Designed for all-season performance, this camping tent is your ultimate companion for camping, hiking, and backpacking. With a spacious interior that comfortably accommodates 2-4 adults, it’s perfect for family camping trips, weekend getaways, or solo expeditions. Whether you’re braving winter snow or summer rain, its durable construction ensures reliable shelter in any weather\\nInstallation design: Simple disassembly quick installation Open the top of the tent, according to the picture shows, just lift the top, open the mechanical device, and then fix the joint at the bottom in place, press down the position of the rod and spring instantaneously automatic installation\\nWaterproof material: We use outdoor 4500mm exclusive waterproof grade, using SBS zipper, 210T material at the bottom, 10000+ waterproof. With sealed seams and unique waterproof strips, it's the perfect companion to keep you dry and comfortable while camping in harsh climates\\nEnjoy outdoor: The tent can be detachable, two doors circulate air, give you enough air flow to have better ventilation, mesh screen to prevent mosquitoes from entering the tent, family tent with lantern hooks, mesh storage bag to store small items\\nExclusive patent: Using high-grade Oxford cloth, fine workmanship", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	10999
fb3b4667-91c2-482a-aabf-46bb64755f9e	151762cc-bdca-4882-89ff-ce00a3131fef	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [], "price": 8499, "stock": 44, "images": [{"id": "384c72b8-5e39-44e8-9089-27288bccb488", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "dba62c21-36d7-4972-a6b8-f5b5c8540ef9", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "45c90c52-c546-408d-b99e-0fe0acf71601", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "c159b08d-9335-41aa-8a3b-88d3a28b761e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "b7f16b5f-8055-4375-8c0c-3d92723813d6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-23T00:52:57.980Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 8499, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	3	8499
941aa08d-0bd8-4a42-a2e5-d4a89cae5507	151762cc-bdca-4882-89ff-ce00a3131fef	{"id": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "sku": null, "name": "Coleman Sundome Camping Tent", "tags": [], "price": 4799, "stock": 9998, "images": [{"id": "e5f2c68f-085c-4d0f-9a07-1b15edcd2bd8", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail"}, {"id": "8b8460b5-1d55-4853-bad4-e9fc3e829b95", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail"}, {"id": "d144803d-fc76-4429-8504-5ef45f5afe18", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail"}, {"id": "decb9e56-590f-49a3-b87b-5ba0a9ccc0d4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail"}, {"id": "b36c61f0-e499-4115-8b8c-7c0a8e8ac31a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More", "variants": [], "createdAt": "2025-10-21T17:13:11.682Z", "updatedAt": "2025-10-23T15:54:43.134Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "557e37c8-fcba-4e82-babb-b188863071e4", "width": 32, "height": 160, "length": 32, "weight": 4000, "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4"}, "finalPrice": 4299, "collections": [], "description": "Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	4299
ffaded2b-eee2-4643-a658-3c0f5f60de97	151762cc-bdca-4882-89ff-ce00a3131fef	{"id": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "sku": null, "name": "Hewolf 2/3/4 Person Camping Tent", "tags": [{"id": "f2d90042-a58a-451e-ae50-ddbbcd02176e", "name": "Popular!", "color": "#478d03", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "textColor": "#eefff1"}], "price": 12999, "stock": 9998, "images": [{"id": "2493baf5-886e-4dc5-8080-932f246335fa", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_thumbnail"}, {"id": "d58bb5b7-2cf7-4c4c-b587-f4f0b4c9efc6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_thumbnail"}, {"id": "c64102aa-b8ac-48ad-807f-d3df46e760a6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_thumbnail"}, {"id": "4f7e761b-f2c7-4f45-a89a-fa76fb380991", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_thumbnail"}, {"id": "38415c44-83bc-454c-a347-b7372c67e3be", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_thumbnail"}, {"id": "774837ee-374b-4b67-9794-24741b43a5c0", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 2000, "longName": "Hewolf 2/3/4 Person Camping Tent - Instant Pop Up Waterproof 2 Doors Tent with Easy Setup | 3-Season Hexagonal Dome Design for Family, Hiking & Traveling", "variants": [], "createdAt": "2025-10-21T17:56:40.417Z", "updatedAt": "2025-10-23T15:54:43.461Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "745c789f-42bd-4645-92ab-caaf3f81f013", "width": 40, "height": 80, "length": 40, "weight": 6000, "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2"}, "finalPrice": 10999, "collections": [], "description": "Multi-Season Use: Designed for all-season performance, this camping tent is your ultimate companion for camping, hiking, and backpacking. With a spacious interior that comfortably accommodates 2-4 adults, it’s perfect for family camping trips, weekend getaways, or solo expeditions. Whether you’re braving winter snow or summer rain, its durable construction ensures reliable shelter in any weather\\nInstallation design: Simple disassembly quick installation Open the top of the tent, according to the picture shows, just lift the top, open the mechanical device, and then fix the joint at the bottom in place, press down the position of the rod and spring instantaneously automatic installation\\nWaterproof material: We use outdoor 4500mm exclusive waterproof grade, using SBS zipper, 210T material at the bottom, 10000+ waterproof. With sealed seams and unique waterproof strips, it's the perfect companion to keep you dry and comfortable while camping in harsh climates\\nEnjoy outdoor: The tent can be detachable, two doors circulate air, give you enough air flow to have better ventilation, mesh screen to prevent mosquitoes from entering the tent, family tent with lantern hooks, mesh storage bag to store small items\\nExclusive patent: Using high-grade Oxford cloth, fine workmanship", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	10999
dc4443a2-dfa7-4d63-8515-08cbffda7fe8	151762cc-bdca-4882-89ff-ce00a3131fef	{"id": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "sku": null, "name": "MOLLE Assault Backpack", "tags": [{"id": "e1bebb28-1136-4293-814e-e1302aa1c20c", "name": "GREAT DEAL", "color": "#ffc366", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "textColor": "#000000"}], "price": 3995, "stock": 9998, "images": [{"id": "70226307-dcdb-4abe-87cf-31a3949f7472", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_thumbnail"}, {"id": "6d06dfb6-d4dd-4eb5-a44e-4892a2e76e5d", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_thumbnail"}, {"id": "cc36e88e-df81-496c-9a4a-1573cad7e260", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_thumbnail"}, {"id": "a8caca66-3e68-419d-9ca2-aa6c30dff640", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_thumbnail"}, {"id": "57a7f2a6-58a5-4029-905c-d1b49d7ddf37", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 1000, "longName": "MOLLE Assault Backpack, Tactical Backpack Military Army Camping Rucksack, 3-Day Pack Trip w/USA Flag Patch, D-Rings, Black", "variants": [], "createdAt": "2025-10-21T18:48:30.682Z", "updatedAt": "2025-10-23T15:54:43.671Z", "categories": [{"id": "4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9", "name": "Backpacks", "slug": "backpacks", "seoTitle": "", "createdAt": "2025-10-21T18:45:46.100Z", "updatedAt": "2025-10-21T23:19:56.752Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "30ae6549-dc81-4720-9182-6c941ae59392", "width": 50, "height": 56, "length": 40, "weight": 2500, "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a"}, "finalPrice": 2995, "collections": [], "description": "LARGE CAPACITY - Military tactical backpack size approx.:12\\"*20\\"*13\\" / 30*50*33CM (W*H*D) Capacity:40L, This tactical military assault backpack is made of quality and water-resistant High Density fabric, With Large Capacity allow you to carry all your tactical gears, it can be used as 3 day assault pack, bug out bag backpack, emergency backpack, combat backpack, range bag, molle emt backpack, EDC outdoor backpack, hunting backpack, travel backpack, survival backpack or trekking backpack\\nMULTI-FUNCTIONAL - This tactical assault pack have 2 main compartments, 2 small compartments in front, and a back compartment for a hydration bladder. Each of the compartments has variety pockets to help with organization. The large compartment area has an elastic strap to hold laptops or anything you don't want to move around. Each pocket has two zipper pulls, and one of the compartments that can fully open all the way down to the bottom like suitcase.\\nCOMFORTABLE & TOUGH - The shoulder straps are padded and adjustable and the waist belt expands enough. The thick mesh padding back area and shoulder straps will not pinch you under heavy duty. Thick padded back panel pocket works great with 3L hydration bladder(hydration bladder do not include)\\nARMY MOLLE SYSTEM - The front and both sides come with MOLLE system, Molle webbing throughout for attaching additional tactical pouches or gear as 3 day assault pack backpack combat molle backpack. The Y strap and buckle on the front is great to roll up a sweatshirt or light jacket. And the straps at the bottom can be used to hold a tent or sleeping pad.\\nPACKAGE INCLUDED - 1 Tactical backpack, US Flag patch, 2pcs D-Ring, 1pc MOLLE Webbing Dominators. Should you have any additional problem, please let us know without hesitation at any time.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	2995
11b5d2dd-57ff-4bc5-8c83-909a081673a3	9f46afa6-1a20-4442-b6b3-c5f1a5c8b9bf	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [], "price": 8499, "stock": 38, "images": [{"id": "384c72b8-5e39-44e8-9089-27288bccb488", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "dba62c21-36d7-4972-a6b8-f5b5c8540ef9", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "45c90c52-c546-408d-b99e-0fe0acf71601", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "c159b08d-9335-41aa-8a3b-88d3a28b761e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "b7f16b5f-8055-4375-8c0c-3d92723813d6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-23T17:00:52.185Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 8499, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	8499
ae96a1c0-8bed-4c93-a0c5-35730f414ace	04c97f3b-7a06-4859-9588-4d05704924f5	{"id": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "sku": null, "name": "MOUNTAINTOP 30L Hiking Backpack", "tags": [{"id": "5dfc504f-1326-41a7-b3bf-b92234414f9d", "name": "TOP SELLER", "color": "#f6ffa7", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "textColor": "#000000"}], "price": 4999, "stock": 9999, "images": [{"id": "3fe247e3-9a77-4a24-8fe7-4a133c3467c1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_thumbnail"}, {"id": "36970e11-03d4-446c-904c-f132f7510333", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_thumbnail"}, {"id": "81802493-45de-4c98-87b9-1c7899d327de", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_thumbnail"}, {"id": "63fb0f62-e9d8-4a22-b7f1-9a3c3ede1e6f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_thumbnail"}, {"id": "3e98aa47-03d6-44e0-9dee-ec23fadec8b1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_thumbnail"}, {"id": "d75080df-e3ed-44cd-9bc7-2c25ae2006b3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 1000, "longName": "MOUNTAINTOP 30L Hiking Backpack,Men Women Camping Backpack,Lightweight Trekking Travel Backpacks for Climbing Skiing Cycling", "variants": [], "createdAt": "2025-10-21T18:44:38.531Z", "updatedAt": "2025-10-23T15:52:56.987Z", "categories": [{"id": "4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9", "name": "Backpacks", "slug": "backpacks", "seoTitle": "", "createdAt": "2025-10-21T18:45:46.100Z", "updatedAt": "2025-10-21T23:19:56.752Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "d91b2f88-001d-422d-9ecb-c5fbf0514231", "width": 50, "height": 60, "length": 40, "weight": 3000, "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0"}, "finalPrice": 3999, "collections": [], "description": "【Premium Comfort & Durability】: MOUNTAINTOP hiking daypack is made of high-density 500D polyester, which is lightweight, anti-tear, water repellent. In addition, all of the backpack's stress points and shoulder straps are reinforced with lap-knots to ensure long lasting durability.\\n【Spacious And Organized Storage Space】: With a 30L capacity for 1-2 day hike or 3 day trip, our travel backpack features a multi-compartment design including one main roomy compartment with a interior sleeve for hydration bladder,One front pocket with buckle closure, one front pocket and 2 side pockets.\\n【Durable And Ergonomically Designed】: rucking backpack is equipped with ergonomic shoulder straps and back support system, load compression strap system on both sides and bottom to adjust and tighten the backpack. Provides a good sense of comfort and support, helping to reduce fatigue during long hiking trips.\\n【Unique Functional Design】:The main pocket of the camping backpack has a strap for binding the water bag liner and a hose hole on the top side for assembling the water bag system; the side straps and buckles can be used to fix water bottles or trekking poles, and the bottom straps can be used to fix a tripod or a sleeping pad.\\n【Lightweight & Multi-Purpose】:Hiking backpack men is lightweight, weighing only 1.8 pound; the large capacity and multiple pockets are perfect for hiking, camping, hiking, fishing and the rest of outdoor activities. It meets the size requirements of most airlines. This camping backpack can be used as a hiking backpack, travel bag and business bag, suitable for both men and women.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	3999
11462d35-981d-4ea6-947b-c29a104d98a2	04c97f3b-7a06-4859-9588-4d05704924f5	{"id": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "sku": null, "name": "Coleman Sundome Camping Tent", "tags": [], "price": 4799, "stock": 9999, "images": [{"id": "e5f2c68f-085c-4d0f-9a07-1b15edcd2bd8", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail"}, {"id": "8b8460b5-1d55-4853-bad4-e9fc3e829b95", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail"}, {"id": "d144803d-fc76-4429-8504-5ef45f5afe18", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail"}, {"id": "decb9e56-590f-49a3-b87b-5ba0a9ccc0d4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail"}, {"id": "b36c61f0-e499-4115-8b8c-7c0a8e8ac31a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More", "variants": [], "createdAt": "2025-10-21T17:13:11.682Z", "updatedAt": "2025-10-23T15:52:56.456Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "557e37c8-fcba-4e82-babb-b188863071e4", "width": 32, "height": 160, "length": 32, "weight": 4000, "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4"}, "finalPrice": 4299, "collections": [], "description": "Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	4299
42a527d3-bde0-47d5-b1e5-31f627c6ece1	04c97f3b-7a06-4859-9588-4d05704924f5	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [], "price": 8499, "stock": 42, "images": [{"id": "384c72b8-5e39-44e8-9089-27288bccb488", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "dba62c21-36d7-4972-a6b8-f5b5c8540ef9", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "45c90c52-c546-408d-b99e-0fe0acf71601", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "c159b08d-9335-41aa-8a3b-88d3a28b761e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "b7f16b5f-8055-4375-8c0c-3d92723813d6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-23T15:52:56.577Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 8499, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	8499
1c1dee0b-ee19-4692-bc0c-35d1b6cf61b7	04c97f3b-7a06-4859-9588-4d05704924f5	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 5999, "stock": 9999, "images": [{"id": "efc483ad-d7c6-4cac-817e-23d19fa82968", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "7e92296e-6fc0-4b7f-98bb-c45915a790ca", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "7502606c-4306-41a8-916a-adc0054e7702", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}, {"id": "890ea596-4b85-4fe0-a1db-54e5d846dedc", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "89615284-373e-44f6-9a25-1f65506b6630", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 700, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-23T15:52:56.865Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 5579, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": "PERCENTAGE", "averageRating": 0}	null	1	5299
c13f9ce3-9d88-4ac2-85f3-b1c3da9fafd9	04c97f3b-7a06-4859-9588-4d05704924f5	{"id": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "sku": null, "name": "Hewolf 2/3/4 Person Camping Tent", "tags": [{"id": "f2d90042-a58a-451e-ae50-ddbbcd02176e", "name": "Popular!", "color": "#478d03", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "textColor": "#eefff1"}], "price": 12999, "stock": 9999, "images": [{"id": "2493baf5-886e-4dc5-8080-932f246335fa", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_thumbnail"}, {"id": "d58bb5b7-2cf7-4c4c-b587-f4f0b4c9efc6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_thumbnail"}, {"id": "c64102aa-b8ac-48ad-807f-d3df46e760a6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_thumbnail"}, {"id": "4f7e761b-f2c7-4f45-a89a-fa76fb380991", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_thumbnail"}, {"id": "38415c44-83bc-454c-a347-b7372c67e3be", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_thumbnail"}, {"id": "774837ee-374b-4b67-9794-24741b43a5c0", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 2000, "longName": "Hewolf 2/3/4 Person Camping Tent - Instant Pop Up Waterproof 2 Doors Tent with Easy Setup | 3-Season Hexagonal Dome Design for Family, Hiking & Traveling", "variants": [], "createdAt": "2025-10-21T17:56:40.417Z", "updatedAt": "2025-10-23T15:52:57.353Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "745c789f-42bd-4645-92ab-caaf3f81f013", "width": 40, "height": 80, "length": 40, "weight": 6000, "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2"}, "finalPrice": 10999, "collections": [], "description": "Multi-Season Use: Designed for all-season performance, this camping tent is your ultimate companion for camping, hiking, and backpacking. With a spacious interior that comfortably accommodates 2-4 adults, it’s perfect for family camping trips, weekend getaways, or solo expeditions. Whether you’re braving winter snow or summer rain, its durable construction ensures reliable shelter in any weather\\nInstallation design: Simple disassembly quick installation Open the top of the tent, according to the picture shows, just lift the top, open the mechanical device, and then fix the joint at the bottom in place, press down the position of the rod and spring instantaneously automatic installation\\nWaterproof material: We use outdoor 4500mm exclusive waterproof grade, using SBS zipper, 210T material at the bottom, 10000+ waterproof. With sealed seams and unique waterproof strips, it's the perfect companion to keep you dry and comfortable while camping in harsh climates\\nEnjoy outdoor: The tent can be detachable, two doors circulate air, give you enough air flow to have better ventilation, mesh screen to prevent mosquitoes from entering the tent, family tent with lantern hooks, mesh storage bag to store small items\\nExclusive patent: Using high-grade Oxford cloth, fine workmanship", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	10999
f8e4f0e3-98d5-4064-aecc-de11e866ec78	04c97f3b-7a06-4859-9588-4d05704924f5	{"id": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "sku": null, "name": "MOLLE Assault Backpack", "tags": [{"id": "e1bebb28-1136-4293-814e-e1302aa1c20c", "name": "GREAT DEAL", "color": "#ffc366", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "textColor": "#000000"}], "price": 3995, "stock": 9999, "images": [{"id": "70226307-dcdb-4abe-87cf-31a3949f7472", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_thumbnail"}, {"id": "6d06dfb6-d4dd-4eb5-a44e-4892a2e76e5d", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_thumbnail"}, {"id": "cc36e88e-df81-496c-9a4a-1573cad7e260", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_thumbnail"}, {"id": "a8caca66-3e68-419d-9ca2-aa6c30dff640", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_thumbnail"}, {"id": "57a7f2a6-58a5-4029-905c-d1b49d7ddf37", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_preview", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 1000, "longName": "MOLLE Assault Backpack, Tactical Backpack Military Army Camping Rucksack, 3-Day Pack Trip w/USA Flag Patch, D-Rings, Black", "variants": [], "createdAt": "2025-10-21T18:48:30.682Z", "updatedAt": "2025-10-23T15:52:57.112Z", "categories": [{"id": "4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9", "name": "Backpacks", "slug": "backpacks", "seoTitle": "", "createdAt": "2025-10-21T18:45:46.100Z", "updatedAt": "2025-10-21T23:19:56.752Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "30ae6549-dc81-4720-9182-6c941ae59392", "width": 50, "height": 56, "length": 40, "weight": 2500, "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a"}, "finalPrice": 2995, "collections": [], "description": "LARGE CAPACITY - Military tactical backpack size approx.:12\\"*20\\"*13\\" / 30*50*33CM (W*H*D) Capacity:40L, This tactical military assault backpack is made of quality and water-resistant High Density fabric, With Large Capacity allow you to carry all your tactical gears, it can be used as 3 day assault pack, bug out bag backpack, emergency backpack, combat backpack, range bag, molle emt backpack, EDC outdoor backpack, hunting backpack, travel backpack, survival backpack or trekking backpack\\nMULTI-FUNCTIONAL - This tactical assault pack have 2 main compartments, 2 small compartments in front, and a back compartment for a hydration bladder. Each of the compartments has variety pockets to help with organization. The large compartment area has an elastic strap to hold laptops or anything you don't want to move around. Each pocket has two zipper pulls, and one of the compartments that can fully open all the way down to the bottom like suitcase.\\nCOMFORTABLE & TOUGH - The shoulder straps are padded and adjustable and the waist belt expands enough. The thick mesh padding back area and shoulder straps will not pinch you under heavy duty. Thick padded back panel pocket works great with 3L hydration bladder(hydration bladder do not include)\\nARMY MOLLE SYSTEM - The front and both sides come with MOLLE system, Molle webbing throughout for attaching additional tactical pouches or gear as 3 day assault pack backpack combat molle backpack. The Y strap and buckle on the front is great to roll up a sweatshirt or light jacket. And the straps at the bottom can be used to hold a tent or sleeping pad.\\nPACKAGE INCLUDED - 1 Tactical backpack, US Flag patch, 2pcs D-Ring, 1pc MOLLE Webbing Dominators. Should you have any additional problem, please let us know without hesitation at any time.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	2995
8888b227-03a5-494b-8756-3bb7d176b6a2	b710d8d5-3750-49ca-ae3e-0da70432d6e1	{"id": "e10e7d79-138d-4b23-a511-831ce674c392", "sku": null, "name": "CAMEL CROWN Tents", "tags": [], "price": 7500, "stock": null, "images": [{"id": "c75232b0-30ed-4113-a3d4-19a1c9e2741e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_thumbnail"}, {"id": "5a925223-ee0a-49eb-b567-4738e705c9bc", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_thumbnail"}, {"id": "4fd40953-a971-4d5b-9cd8-024c4695ba21", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_thumbnail"}, {"id": "c1933a3a-0fb6-4e23-bdff-d2d50f6108ff", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "CAMEL CROWN Tents for Camping 2/3/4/5 Person Camping Dome Tent, Waterproof,Spacious, Lightweight Portable Backpacking Tent for Outdoor Camping/Hiking", "variants": [], "createdAt": "2025-10-21T18:20:05.017Z", "updatedAt": "2025-10-21T18:20:05.017Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "175e366f-35b7-4cdc-be25-ca725e3665d0", "width": 35, "height": 67, "length": 35, "weight": 3000, "productId": "e10e7d79-138d-4b23-a511-831ce674c392"}, "finalPrice": 7500, "collections": [], "description": "Polyester\\nImported\\nWaterproof Design: The tent is made with water-resistant materials to keep you dry in wet conditions.\\nSpacious Interior: The dome shape provides ample headroom and space for up to 2 people.\\nLightweight and Portable: Weighing just 2.5 lbs, this tent is easy to carry and set up.\\nEasy Setup: The tent pops up quickly with the included stakes for quick and simple setup.\\nMulti-Season Use: With 4-season use, this tent can handle varying weather conditions.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	7500
b9b68ba4-5274-40b6-bf7c-57363cb8d037	3342c166-ffeb-4023-a008-5ca29dd66969	{"id": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "sku": null, "name": "MOUNTAINTOP 30L Hiking Backpack", "tags": [{"id": "5dfc504f-1326-41a7-b3bf-b92234414f9d", "name": "TOP SELLER", "color": "#f6ffa7", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "textColor": "#000000"}], "price": 4999, "stock": 9994, "images": [{"id": "3fe247e3-9a77-4a24-8fe7-4a133c3467c1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_thumbnail"}, {"id": "36970e11-03d4-446c-904c-f132f7510333", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_thumbnail"}, {"id": "81802493-45de-4c98-87b9-1c7899d327de", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_thumbnail"}, {"id": "63fb0f62-e9d8-4a22-b7f1-9a3c3ede1e6f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_thumbnail"}, {"id": "3e98aa47-03d6-44e0-9dee-ec23fadec8b1", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_thumbnail"}, {"id": "d75080df-e3ed-44cd-9bc7-2c25ae2006b3", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_preview", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 1000, "longName": "MOUNTAINTOP 30L Hiking Backpack,Men Women Camping Backpack,Lightweight Trekking Travel Backpacks for Climbing Skiing Cycling", "variants": [], "createdAt": "2025-10-21T18:44:38.531Z", "updatedAt": "2025-10-23T17:18:02.989Z", "categories": [{"id": "4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9", "name": "Backpacks", "slug": "backpacks", "seoTitle": "", "createdAt": "2025-10-21T18:45:46.100Z", "updatedAt": "2025-10-21T23:19:56.752Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "d91b2f88-001d-422d-9ecb-c5fbf0514231", "width": 50, "height": 60, "length": 40, "weight": 3000, "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0"}, "finalPrice": 3999, "collections": [], "description": "【Premium Comfort & Durability】: MOUNTAINTOP hiking daypack is made of high-density 500D polyester, which is lightweight, anti-tear, water repellent. In addition, all of the backpack's stress points and shoulder straps are reinforced with lap-knots to ensure long lasting durability.\\n【Spacious And Organized Storage Space】: With a 30L capacity for 1-2 day hike or 3 day trip, our travel backpack features a multi-compartment design including one main roomy compartment with a interior sleeve for hydration bladder,One front pocket with buckle closure, one front pocket and 2 side pockets.\\n【Durable And Ergonomically Designed】: rucking backpack is equipped with ergonomic shoulder straps and back support system, load compression strap system on both sides and bottom to adjust and tighten the backpack. Provides a good sense of comfort and support, helping to reduce fatigue during long hiking trips.\\n【Unique Functional Design】:The main pocket of the camping backpack has a strap for binding the water bag liner and a hose hole on the top side for assembling the water bag system; the side straps and buckles can be used to fix water bottles or trekking poles, and the bottom straps can be used to fix a tripod or a sleeping pad.\\n【Lightweight & Multi-Purpose】:Hiking backpack men is lightweight, weighing only 1.8 pound; the large capacity and multiple pockets are perfect for hiking, camping, hiking, fishing and the rest of outdoor activities. It meets the size requirements of most airlines. This camping backpack can be used as a hiking backpack, travel bag and business bag, suitable for both men and women.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	5	3999
37885477-f4f0-4355-8f4f-8a3f301eb243	8450d737-67ca-4ff8-8a93-afe08e29f10f	{"id": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "sku": null, "name": "Hewolf 2/3/4 Person Camping Tent", "tags": [{"id": "f2d90042-a58a-451e-ae50-ddbbcd02176e", "name": "Popular!", "color": "#478d03", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "textColor": "#eefff1"}], "price": 12999, "stock": 9998, "images": [{"id": "2493baf5-886e-4dc5-8080-932f246335fa", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_thumbnail"}, {"id": "d58bb5b7-2cf7-4c4c-b587-f4f0b4c9efc6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_thumbnail"}, {"id": "c64102aa-b8ac-48ad-807f-d3df46e760a6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_thumbnail"}, {"id": "4f7e761b-f2c7-4f45-a89a-fa76fb380991", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_thumbnail"}, {"id": "38415c44-83bc-454c-a347-b7372c67e3be", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_thumbnail"}, {"id": "774837ee-374b-4b67-9794-24741b43a5c0", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_preview", "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 2000, "longName": "Hewolf 2/3/4 Person Camping Tent - Instant Pop Up Waterproof 2 Doors Tent with Easy Setup | 3-Season Hexagonal Dome Design for Family, Hiking & Traveling", "variants": [], "createdAt": "2025-10-21T17:56:40.417Z", "updatedAt": "2025-10-23T15:54:43.461Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "745c789f-42bd-4645-92ab-caaf3f81f013", "width": 40, "height": 80, "length": 40, "weight": 6000, "productId": "e2ae736e-464e-47a3-bea4-9b04c39e4eb2"}, "finalPrice": 10999, "collections": [], "description": "Multi-Season Use: Designed for all-season performance, this camping tent is your ultimate companion for camping, hiking, and backpacking. With a spacious interior that comfortably accommodates 2-4 adults, it’s perfect for family camping trips, weekend getaways, or solo expeditions. Whether you’re braving winter snow or summer rain, its durable construction ensures reliable shelter in any weather\\nInstallation design: Simple disassembly quick installation Open the top of the tent, according to the picture shows, just lift the top, open the mechanical device, and then fix the joint at the bottom in place, press down the position of the rod and spring instantaneously automatic installation\\nWaterproof material: We use outdoor 4500mm exclusive waterproof grade, using SBS zipper, 210T material at the bottom, 10000+ waterproof. With sealed seams and unique waterproof strips, it's the perfect companion to keep you dry and comfortable while camping in harsh climates\\nEnjoy outdoor: The tent can be detachable, two doors circulate air, give you enough air flow to have better ventilation, mesh screen to prevent mosquitoes from entering the tent, family tent with lantern hooks, mesh storage bag to store small items\\nExclusive patent: Using high-grade Oxford cloth, fine workmanship", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	2	10999
c3c0278b-15a0-420d-9adb-6111ad7779c5	8450d737-67ca-4ff8-8a93-afe08e29f10f	{"id": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "sku": null, "name": "MOLLE Assault Backpack", "price": 3999, "stock": null, "images": [{"id": "6a6742ab-7185-4041-950d-3a5374490566", "main": "https://i.ibb.co/5xGFB59n/MOLLE-Assault-Backpack-main.webp", "preview": "https://i.ibb.co/Y4XrCxcp/MOLLE-Assault-Backpack-preview.webp", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://i.ibb.co/PGq4HZKZ/MOLLE-Assault-Backpack-thumbnail.webp"}, {"id": "a1ec67a5-cfed-4d91-8c7e-ac7bd3f453b7", "main": "https://i.ibb.co/S4brF7cF/MOLLE-Assault-Backpack-main.webp", "preview": "https://i.ibb.co/Dg1PGkkw/MOLLE-Assault-Backpack-preview.webp", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://i.ibb.co/Hp49dsMf/MOLLE-Assault-Backpack-thumbnail.webp"}, {"id": "87364b06-ea07-44fc-a0e8-5bf4a63d7e11", "main": "https://i.ibb.co/bM4KZQgw/MOLLE-Assault-Backpack-main.webp", "preview": "https://i.ibb.co/KzjMdzD0/MOLLE-Assault-Backpack-preview.webp", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://i.ibb.co/LDR23yTP/MOLLE-Assault-Backpack-thumbnail.webp"}, {"id": "1959c8c8-d6fb-4308-8a20-74a54f56b0da", "main": "https://i.ibb.co/s90fPqxp/MOLLE-Assault-Backpack-main.webp", "preview": "https://i.ibb.co/5tc5ccs/MOLLE-Assault-Backpack-preview.webp", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://i.ibb.co/V0PYHw62/MOLLE-Assault-Backpack-thumbnail.webp"}, {"id": "67691e65-fb3f-499c-9c49-0d4218bde4d9", "main": "https://i.ibb.co/6JX949r2/MOLLE-Assault-Backpack-main.webp", "preview": "https://i.ibb.co/0V8SNGXS/MOLLE-Assault-Backpack-preview.webp", "productId": "b0f22f97-445f-495a-9e1c-8d2792fc800a", "thumbnail": "https://i.ibb.co/WvHJ9gYV/MOLLE-Assault-Backpack-thumbnail.webp"}], "status": "ACTIVE", "discount": 1000, "longName": "MOLLE Assault Backpack, Tactical Backpack Military Army Camping Rucksack, 3-Day Pack Trip w/USA Flag Patch, D-Rings, Black", "createdAt": "2025-10-21T18:48:30.682Z", "updatedAt": "2025-10-21T18:48:30.682Z", "finalPrice": 2999, "description": "LARGE CAPACITY - Military tactical backpack size approx.:12\\"*20\\"*13\\" / 30*50*33CM (W*H*D) Capacity:40L, This tactical military assault backpack is made of quality and water-resistant High Density fabric, With Large Capacity allow you to carry all your tactical gears, it can be used as 3 day assault pack, bug out bag backpack, emergency backpack, combat backpack, range bag, molle emt backpack, EDC outdoor backpack, hunting backpack, travel backpack, survival backpack or trekking backpack\\nMULTI-FUNCTIONAL - This tactical assault pack have 2 main compartments, 2 small compartments in front, and a back compartment for a hydration bladder. Each of the compartments has variety pockets to help with organization. The large compartment area has an elastic strap to hold laptops or anything you don't want to move around. Each pocket has two zipper pulls, and one of the compartments that can fully open all the way down to the bottom like suitcase.\\nCOMFORTABLE & TOUGH - The shoulder straps are padded and adjustable and the waist belt expands enough. The thick mesh padding back area and shoulder straps will not pinch you under heavy duty. Thick padded back panel pocket works great with 3L hydration bladder(hydration bladder do not include)\\nARMY MOLLE SYSTEM - The front and both sides come with MOLLE system, Molle webbing throughout for attaching additional tactical pouches or gear as 3 day assault pack backpack combat molle backpack. The Y strap and buckle on the front is great to roll up a sweatshirt or light jacket. And the straps at the bottom can be used to hold a tent or sleeping pad.\\nPACKAGE INCLUDED - 1 Tactical backpack, US Flag patch, 2pcs D-Ring, 1pc MOLLE Webbing Dominators. Should you have any additional problem, please let us know without hesitation at any time.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	5	2999
636fdaaa-e7f0-4e47-b1a7-ba0c96d48981	8450d737-67ca-4ff8-8a93-afe08e29f10f	{"id": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "sku": null, "name": "MOUNTAINTOP 30L Hiking Backpack", "price": 4999, "stock": null, "images": [{"id": "46029550-7c07-4757-88c2-6a231ff053fb", "main": "https://i.ibb.co/C500QMtc/MOUNTAINTOP-30-L-Hiking-Backpack-main.webp", "preview": "https://i.ibb.co/k25xjtds/MOUNTAINTOP-30-L-Hiking-Backpack-preview.webp", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://i.ibb.co/TxGB10xd/MOUNTAINTOP-30-L-Hiking-Backpack-thumbnail.webp"}, {"id": "8c6c4a44-eff6-4ec5-a532-5b1939ca0dee", "main": "https://i.ibb.co/rK0BxYq2/MOUNTAINTOP-30-L-Hiking-Backpack-main.webp", "preview": "https://i.ibb.co/MkDsxBf5/MOUNTAINTOP-30-L-Hiking-Backpack-preview.webp", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://i.ibb.co/rKWC2ZP2/MOUNTAINTOP-30-L-Hiking-Backpack-thumbnail.webp"}, {"id": "27006eb0-b99e-47a2-848e-0ae41dff3db8", "main": "https://i.ibb.co/cSgDm5JH/MOUNTAINTOP-30-L-Hiking-Backpack-main.webp", "preview": "https://i.ibb.co/MkP1Zd7w/MOUNTAINTOP-30-L-Hiking-Backpack-preview.webp", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://i.ibb.co/WvhmYcVp/MOUNTAINTOP-30-L-Hiking-Backpack-thumbnail.webp"}, {"id": "d341fcf1-6efb-47d9-a01c-d73825fb7604", "main": "https://i.ibb.co/QjT38w6n/MOUNTAINTOP-30-L-Hiking-Backpack-main.webp", "preview": "https://i.ibb.co/k2VDyQ75/MOUNTAINTOP-30-L-Hiking-Backpack-preview.webp", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://i.ibb.co/39w2hqfY/MOUNTAINTOP-30-L-Hiking-Backpack-thumbnail.webp"}, {"id": "47e2bb9a-507c-412d-95ca-cbb00b8282cd", "main": "https://i.ibb.co/Psgp1jsd/MOUNTAINTOP-30-L-Hiking-Backpack-main.webp", "preview": "https://i.ibb.co/b5s07rTG/MOUNTAINTOP-30-L-Hiking-Backpack-preview.webp", "productId": "55d68f8f-9344-4f16-bd67-33c246eb33a0", "thumbnail": "https://i.ibb.co/VYnSvF50/MOUNTAINTOP-30-L-Hiking-Backpack-thumbnail.webp"}], "status": "ACTIVE", "discount": 1000, "longName": "MOUNTAINTOP 30L Hiking Backpack,Men Women Camping Backpack,Lightweight Trekking Travel Backpacks for Climbing Skiing Cycling", "createdAt": "2025-10-21T18:44:38.531Z", "updatedAt": "2025-10-21T18:44:38.531Z", "finalPrice": 3999, "description": "【Premium Comfort & Durability】: MOUNTAINTOP hiking daypack is made of high-density 500D polyester, which is lightweight, anti-tear, water repellent. In addition, all of the backpack's stress points and shoulder straps are reinforced with lap-knots to ensure long lasting durability.\\n【Spacious And Organized Storage Space】: With a 30L capacity for 1-2 day hike or 3 day trip, our travel backpack features a multi-compartment design including one main roomy compartment with a interior sleeve for hydration bladder,One front pocket with buckle closure, one front pocket and 2 side pockets.\\n【Durable And Ergonomically Designed】: rucking backpack is equipped with ergonomic shoulder straps and back support system, load compression strap system on both sides and bottom to adjust and tighten the backpack. Provides a good sense of comfort and support, helping to reduce fatigue during long hiking trips.\\n【Unique Functional Design】:The main pocket of the camping backpack has a strap for binding the water bag liner and a hose hole on the top side for assembling the water bag system; the side straps and buckles can be used to fix water bottles or trekking poles, and the bottom straps can be used to fix a tripod or a sleeping pad.\\n【Lightweight & Multi-Purpose】:Hiking backpack men is lightweight, weighing only 1.8 pound; the large capacity and multiple pockets are perfect for hiking, camping, hiking, fishing and the rest of outdoor activities. It meets the size requirements of most airlines. This camping backpack can be used as a hiking backpack, travel bag and business bag, suitable for both men and women.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	4	3999
836a6086-c590-4168-84dd-46d3eea7aa81	8450d737-67ca-4ff8-8a93-afe08e29f10f	{"id": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "sku": null, "name": "Coleman Sundome Camping Tent", "tags": [], "price": 4799, "stock": 9998, "images": [{"id": "e5f2c68f-085c-4d0f-9a07-1b15edcd2bd8", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail"}, {"id": "8b8460b5-1d55-4853-bad4-e9fc3e829b95", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail"}, {"id": "d144803d-fc76-4429-8504-5ef45f5afe18", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail"}, {"id": "decb9e56-590f-49a3-b87b-5ba0a9ccc0d4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail"}, {"id": "b36c61f0-e499-4115-8b8c-7c0a8e8ac31a", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview", "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More", "variants": [], "createdAt": "2025-10-21T17:13:11.682Z", "updatedAt": "2025-10-23T15:54:43.134Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "557e37c8-fcba-4e82-babb-b188863071e4", "width": 32, "height": 160, "length": 32, "weight": 4000, "productId": "6cd34fff-71e2-4244-af48-20a5bcc413a4"}, "finalPrice": 4299, "collections": [], "description": "Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	4299
386636b7-2b4e-4088-9876-60ca7a4b0bde	8450d737-67ca-4ff8-8a93-afe08e29f10f	{"id": "7cf49f7c-3217-436b-b265-2686cfac49cb", "sku": null, "name": "CAMPROS CP Tents", "tags": [], "price": 5999, "stock": 9998, "images": [{"id": "efc483ad-d7c6-4cac-817e-23d19fa82968", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail"}, {"id": "7e92296e-6fc0-4b7f-98bb-c45915a790ca", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail"}, {"id": "7502606c-4306-41a8-916a-adc0054e7702", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail"}, {"id": "890ea596-4b85-4fe0-a1db-54e5d846dedc", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail"}, {"id": "89615284-373e-44f6-9a25-1f65506b6630", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview", "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 700, "longName": "CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking", "variants": [], "createdAt": "2025-10-21T18:21:45.812Z", "updatedAt": "2025-10-23T15:54:43.352Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "45e759f0-1551-49e4-adc0-b9483f13612d", "width": null, "height": null, "length": null, "weight": null, "productId": "7cf49f7c-3217-436b-b265-2686cfac49cb"}, "finalPrice": 5579, "collections": [], "description": "polyester\\nImported\\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50\\"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24\\" x 7.2\\" x 7.2\\", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage", "reviewCount": 0, "discountType": "PERCENTAGE", "averageRating": 0}	null	1	5299
c9710930-e7b3-4250-b163-8d713f78a4df	8450d737-67ca-4ff8-8a93-afe08e29f10f	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [], "price": 8499, "stock": 41, "images": [{"id": "384c72b8-5e39-44e8-9089-27288bccb488", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "dba62c21-36d7-4972-a6b8-f5b5c8540ef9", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "45c90c52-c546-408d-b99e-0fe0acf71601", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "c159b08d-9335-41aa-8a3b-88d3a28b761e", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "b7f16b5f-8055-4375-8c0c-3d92723813d6", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-23T15:54:43.244Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 8499, "collections": [], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	8499
ca863e3c-90cf-4ba2-8e39-f7c73cf7c455	8450d737-67ca-4ff8-8a93-afe08e29f10f	{"id": "e10e7d79-138d-4b23-a511-831ce674c392", "sku": null, "name": "CAMEL CROWN Tents", "tags": [], "price": 7500, "stock": 9998, "images": [{"id": "2c5f42e5-be35-417d-ae96-77ffdc0aee8f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_thumbnail"}, {"id": "e334fe30-f30e-4020-b016-23ed2bc78046", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_thumbnail"}, {"id": "b48721ba-ee3f-4469-ad0a-9ec61750860f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_thumbnail"}, {"id": "490483c3-af48-44a2-8df8-100e2e4053ef", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "CAMEL CROWN Tents for Camping 2/3/4/5 Person Camping Dome Tent, Waterproof,Spacious, Lightweight Portable Backpacking Tent for Outdoor Camping/Hiking", "variants": [], "createdAt": "2025-10-21T18:20:05.017Z", "updatedAt": "2025-10-23T15:54:43.567Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "175e366f-35b7-4cdc-be25-ca725e3665d0", "width": 35, "height": 67, "length": 35, "weight": 3000, "productId": "e10e7d79-138d-4b23-a511-831ce674c392"}, "finalPrice": 7500, "collections": [], "description": "Polyester\\nImported\\nWaterproof Design: The tent is made with water-resistant materials to keep you dry in wet conditions.\\nSpacious Interior: The dome shape provides ample headroom and space for up to 2 people.\\nLightweight and Portable: Weighing just 2.5 lbs, this tent is easy to carry and set up.\\nEasy Setup: The tent pops up quickly with the included stakes for quick and simple setup.\\nMulti-Season Use: With 4-season use, this tent can handle varying weather conditions.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	7500
97e944e3-a894-455b-b58b-9667c1c3dbcd	701c9b99-7d6a-47f9-8bc9-cecd2bf9a24d	{"id": "7727922d-bb16-453b-bd6d-62dc45880057", "sku": null, "name": "MOON LENCE Instant Pop Up Tent", "tags": [], "price": 8499, "stock": 35, "images": [{"id": "fd1d48b5-78e3-4961-bc69-e5b49728fa47", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail"}, {"id": "a6396e96-0427-48b6-bd79-2182ceae46a4", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail"}, {"id": "250a8039-c91c-4b8a-a7c9-22ef9b32910f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail"}, {"id": "c451f922-96f0-46c3-939d-0cabfd3aaff5", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail"}, {"id": "2becdaeb-c5d2-4948-9ac5-f5879185537d", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview", "productId": "7727922d-bb16-453b-bd6d-62dc45880057", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": 500, "longName": "MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,", "variants": [], "createdAt": "2025-10-21T18:18:21.349Z", "updatedAt": "2025-10-23T17:18:12.862Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Camping Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "Bright, reliable outdoor lighting.", "seoKeywords": null}], "dimensions": {"id": "02e318f4-1446-44c1-8515-b8103f8b5ba3", "width": 45, "height": 75, "length": 40, "weight": 5500, "productId": "7727922d-bb16-453b-bd6d-62dc45880057"}, "finalPrice": 7998, "collections": [{"id": "cb2df478-ae63-4e4d-8502-7b4e23d20899", "name": "Top Sellers", "slug": "top-sellers", "seoTitle": "", "createdAt": "2025-10-24T15:34:38.905Z", "updatedAt": "2025-10-24T15:34:38.905Z", "description": "", "seoKeywords": null}, {"id": "26251ea7-8d4b-40c2-a5f1-01531daf0b81", "name": "Featured Items", "slug": "featured-items", "seoTitle": "", "createdAt": "2025-10-24T15:45:51.067Z", "updatedAt": "2025-10-24T15:45:51.067Z", "description": "", "seoKeywords": null}], "description": "Polyester\\nImported\\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	3	7999
6aa4a7ec-bd74-4102-9e95-cf0dfe343d6e	151762cc-bdca-4882-89ff-ce00a3131fef	{"id": "e10e7d79-138d-4b23-a511-831ce674c392", "sku": null, "name": "CAMEL CROWN Tents", "tags": [], "price": 7500, "stock": 9998, "images": [{"id": "2c5f42e5-be35-417d-ae96-77ffdc0aee8f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_thumbnail"}, {"id": "e334fe30-f30e-4020-b016-23ed2bc78046", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_thumbnail"}, {"id": "b48721ba-ee3f-4469-ad0a-9ec61750860f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_thumbnail"}, {"id": "490483c3-af48-44a2-8df8-100e2e4053ef", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "CAMEL CROWN Tents for Camping 2/3/4/5 Person Camping Dome Tent, Waterproof,Spacious, Lightweight Portable Backpacking Tent for Outdoor Camping/Hiking", "variants": [], "createdAt": "2025-10-21T18:20:05.017Z", "updatedAt": "2025-10-23T15:54:43.567Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "175e366f-35b7-4cdc-be25-ca725e3665d0", "width": 35, "height": 67, "length": 35, "weight": 3000, "productId": "e10e7d79-138d-4b23-a511-831ce674c392"}, "finalPrice": 7500, "collections": [], "description": "Polyester\\nImported\\nWaterproof Design: The tent is made with water-resistant materials to keep you dry in wet conditions.\\nSpacious Interior: The dome shape provides ample headroom and space for up to 2 people.\\nLightweight and Portable: Weighing just 2.5 lbs, this tent is easy to carry and set up.\\nEasy Setup: The tent pops up quickly with the included stakes for quick and simple setup.\\nMulti-Season Use: With 4-season use, this tent can handle varying weather conditions.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	7500
6e07fcfe-64e8-4b71-a443-df581adddea5	04c97f3b-7a06-4859-9588-4d05704924f5	{"id": "e10e7d79-138d-4b23-a511-831ce674c392", "sku": null, "name": "CAMEL CROWN Tents", "tags": [], "price": 7500, "stock": 9999, "images": [{"id": "2c5f42e5-be35-417d-ae96-77ffdc0aee8f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_thumbnail"}, {"id": "e334fe30-f30e-4020-b016-23ed2bc78046", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_thumbnail"}, {"id": "b48721ba-ee3f-4469-ad0a-9ec61750860f", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_thumbnail"}, {"id": "490483c3-af48-44a2-8df8-100e2e4053ef", "main": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_main", "preview": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_preview", "productId": "e10e7d79-138d-4b23-a511-831ce674c392", "thumbnail": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_thumbnail"}], "status": "ACTIVE", "options": [], "reviews": [], "discount": null, "longName": "CAMEL CROWN Tents for Camping 2/3/4/5 Person Camping Dome Tent, Waterproof,Spacious, Lightweight Portable Backpacking Tent for Outdoor Camping/Hiking", "variants": [], "createdAt": "2025-10-21T18:20:05.017Z", "updatedAt": "2025-10-23T15:52:57.233Z", "categories": [{"id": "574f40ca-014f-4f0c-b477-477de899bf2d", "name": "Tents", "slug": "tents", "seoTitle": "", "createdAt": "2025-10-21T17:46:50.402Z", "updatedAt": "2025-10-21T17:46:50.402Z", "description": "", "seoKeywords": null}], "dimensions": {"id": "175e366f-35b7-4cdc-be25-ca725e3665d0", "width": 35, "height": 67, "length": 35, "weight": 3000, "productId": "e10e7d79-138d-4b23-a511-831ce674c392"}, "finalPrice": 7500, "collections": [], "description": "Polyester\\nImported\\nWaterproof Design: The tent is made with water-resistant materials to keep you dry in wet conditions.\\nSpacious Interior: The dome shape provides ample headroom and space for up to 2 people.\\nLightweight and Portable: Weighing just 2.5 lbs, this tent is easy to carry and set up.\\nEasy Setup: The tent pops up quickly with the included stakes for quick and simple setup.\\nMulti-Season Use: With 4-season use, this tent can handle varying weather conditions.", "reviewCount": 0, "discountType": null, "averageRating": 0}	null	1	7500
\.


--
-- Data for Name: OrderStatusHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderStatusHistory" (id, "orderId", status, "timestamp") FROM stdin;
e5086321-bb1c-4e0d-8900-425c6097d26f	151762cc-bdca-4882-89ff-ce00a3131fef	PENDING	2025-10-23 17:00:43.877
d9da00d2-7745-489b-860c-7c2e3a7e3305	8450d737-67ca-4ff8-8a93-afe08e29f10f	PENDING	2025-10-23 17:17:53.778
a51b12ed-81a9-4d1e-b54b-21f7c64abfc7	9f46afa6-1a20-4442-b6b3-c5f1a5c8b9bf	PENDING	2025-10-23 17:16:06.957
9acfb2c3-b9e3-4f4e-961c-dce781334c4f	66ae4502-ab43-49ab-aafc-839a12e8b493	PENDING	2025-10-23 15:52:13.005
a63441d6-212f-4bc3-8fd4-8e055edd78d0	04c97f3b-7a06-4859-9588-4d05704924f5	PENDING	2025-10-23 15:54:41.057
2b54ff8f-cfd9-4fdd-9197-3bc53e96fafe	fd9b99da-40ea-4b35-8f4a-ea2e82b37373	PENDING	2025-10-23 02:11:21.926
21582c7e-019d-4cda-a567-ead6c8c12e9c	12683c88-2426-4307-b898-d4a4d4030e2b	PENDING	2025-10-23 00:52:56.224
9e23711e-7fa8-4a7b-8010-7081beb8f6d0	701c9b99-7d6a-47f9-8bc9-cecd2bf9a24d	PENDING	2025-10-24 20:31:16.38
dc92ca51-feb6-496e-958e-171ab83247a5	b710d8d5-3750-49ca-ae3e-0da70432d6e1	PENDING	2025-10-23 15:52:54.593
ced05a1d-0585-4069-a674-9ac4c984c74e	5596fb59-e0a1-4480-928e-9186e4af9ba0	PENDING	2025-10-22 19:15:06.495
ea6c68fa-3b48-46d3-b296-8166910c2c13	d6cb61f3-482b-470e-b5d5-c8aa5683ad1d	PENDING	2025-10-22 19:14:48.694
e003ad95-4a94-4a9b-a38e-ba4632711f5b	e1a7fb4c-4c07-419c-a3a0-0620b5e6d8f8	PENDING	2025-10-22 19:11:32.756
2c0ae70a-729c-4d4b-9fe1-a55de6f33227	9a596e9b-9688-4011-9970-e049db132e4f	PENDING	2025-10-22 19:13:27.656
c4ac95d6-10d8-4103-841f-c947b15d004c	758a161e-3c61-44a3-8bc1-3ef65a2ba65c	PENDING	2025-10-18 15:02:03.445
aa9ec104-fd8e-4ddf-bca0-02dffbc165b3	693d8658-5e84-4716-b81f-ec2db9d590e5	PENDING	2025-10-22 01:06:18.333
c37f1406-018f-437d-b7bb-1807852d66c3	edc3b29a-0a47-49cb-9be5-dadf5223f19c	PENDING	2025-10-22 01:08:18.253
298ee69f-d40a-4f9f-902c-18e030ad1ac5	8e9909d8-2e25-4038-ae63-39b4aad1f144	PENDING	2025-10-22 15:12:21.38
5beb43e6-8311-4802-893d-3496678c3e2c	c3316227-1a7c-43d5-8309-125fda440627	PENDING	2025-10-22 17:01:56.95
d61256c3-b44e-449a-a5e4-8c908aba5ca8	e0977458-0138-43e2-a6dd-38645dc662ba	PENDING	2025-10-22 17:47:40.214
044be102-ee87-4727-af25-ec277a016821	03224cd1-5454-4de6-9037-d31ac972ebcd	PENDING	2025-10-22 17:11:03.607
f8677366-946c-41e3-a182-3076666f273b	b0a83e43-f6e4-47a5-8b43-76fa0a6c6873	PENDING	2025-10-22 17:08:36.629
4560ea05-54b7-4b7c-9b7d-86e565402324	6f540d58-397a-43bf-accb-186247bf8cef	PENDING	2025-10-22 18:08:47.287
518b6ba1-c72f-4f33-9c1e-215c3aee2fcf	ff0fa19c-6dc9-4a0a-aa2d-c33b87d4e766	PENDING	2025-10-22 01:10:57.987
7b06efaf-0a1f-41fa-8074-e2fd0b7ffce9	06c5eebd-2df9-4a6a-9262-4f74dcc7dfce	PENDING	2025-10-22 19:15:43.429
fdabedf7-bf88-4653-94c0-c152f86ea645	9ba49219-dfcd-4e4f-815d-c39c424cee81	PENDING	2025-10-23 01:08:01.758
8d2ff18c-7bbd-4180-aeca-07c87c4dbc65	3342c166-ffeb-4023-a008-5ca29dd66969	PENDING	2025-10-24 01:17:57.294
\.


--
-- Data for Name: ParcelDimensions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ParcelDimensions" (id, "ShippingInfoId", weight, length, width, height) FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, sku, price, discount, "discountType", description, stock, review_count, average_rating, status, "createdAt", "updatedAt", "finalPrice", "longName") FROM stdin;
e10e7d79-138d-4b23-a511-831ce674c392	CAMEL CROWN Tents	\N	7500	500	\N	Polyester\nImported\nWaterproof Design: The tent is made with water-resistant materials to keep you dry in wet conditions.\nSpacious Interior: The dome shape provides ample headroom and space for up to 2 people.\nLightweight and Portable: Weighing just 2.5 lbs, this tent is easy to carry and set up.\nEasy Setup: The tent pops up quickly with the included stakes for quick and simple setup.\nMulti-Season Use: With 4-season use, this tent can handle varying weather conditions.	9996	0	0	ACTIVE	2025-10-21 18:20:05.017	2025-10-23 17:18:16.026	7000	CAMEL CROWN Tents for Camping 2/3/4/5 Person Camping Dome Tent, Waterproof,Spacious, Lightweight Portable Backpacking Tent for Outdoor Camping/Hiking
7727922d-bb16-453b-bd6d-62dc45880057	MOON LENCE Instant Pop Up Tent	\N	8499	500	\N	Polyester\nImported\nEasy Setup and Portability: Experience quick tent assembly with our pop-up design. Just lift the hub tent's top, press down the top mechanism, and snap the bottom joints into place. This lets you have more time to enjoy your adventures. When it's time to pack up, this tent conveniently folds into a compact size and fits snugly into the included carrying bag(32.7x7.1x7.1in), making it easy to carry and store\nSpacious and Versatile: With a generous 83 x 50-inch interior and a towering center height of 50 inches, our dome tent comfortably accommodates 3-4 people, making it perfect for cozy family getaways or enjoyable camping trips with friends. With its generous dimensions and clever layout, this ultralight tent is an excellent choice for any adventure\nAll-Season Performance: Revel in nature's beauty all year long. Designed to tackle various weather conditions, this outdoor tent features sealed seams and waterproof strips to effectively keep moisture out. Whether it's rain or shine, summer or winter, you can trust it to provide a safe and comfortable shelter\nSmart Interior Design: Stay organized with built-in storage pockets. No more searching through your bag – keep essentials close at hand and enjoy a neat living space. The included partition in our instant pop up tent adds an extra layer of convenience, enabling you to create private areas\nReliable Quality: Boasting a 2000 mm polyurethane hydrostatic coating for waterproofing and equipped with SBS dual-directional zippers, this waterproof tent ensures easy entry and exit. Sturdy glass fiber poles guarantee stability and durability, while nylon ropes ensure your shelter remains steadfast against the wind. Camp confidently, knowing you're ready to face the elements	32	0	0	ACTIVE	2025-10-21 18:18:21.349	2025-10-24 20:31:17.451	7998	MOON LENCE Instant Pop Up Tent for 3-4 Person - Automatic Portable, Windproof for Camping, Hiking,
6cd34fff-71e2-4244-af48-20a5bcc413a4	Coleman Sundome Camping Tent	\N	4799	500	\N	Weather Protection You Can Trust: Stay dry and comfortable with the WeatherTec system’s welded corners and inverted seams that help keep water out, even during unexpected rain showers.\nQuick & Easy Setup: Spend more time outdoors and less time pitching your tent. Snag-free, continuous pole sleeves and Insta-Clip pole attachments make setup fast and frustration-free.\nBuilt for Comfort & Ventilation: Large windows and a ground vent provide superior airflow and reduce condensation, keeping you cool on warm nights and comfortable year-round.\nCompact and Travel-Ready: Designed for two campers, this lightweight tent packs easily into a convenient carry bag—perfect for car camping, festivals, or quick weekend getaways.\nDurable Design for Every Adventure: The sturdy frame withstands winds up to 35+ mph, while the durable Polyguard fabric ensures long-lasting use season after season.	9996	0	0	ACTIVE	2025-10-21 17:13:11.682	2025-10-23 17:18:06.658	4299	Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person Tent Sets Up in 10 Mins, Weatherproof Shelter for Camping, Festivals, Backyard, Sleepovers, & More
d9b702e7-4564-49ad-9522-f256a1e1406c	Casio Men's Pro Trek PRG-270-1	\N	29999	4500	\N	Tough Solar Power, 100M Water Resistant, Low Temperature Resistant (-10 C / 14 F), Altimeter, Digital Compass, Barometer, Thermometer. Thermometer Display range: -10 to 60 C (14 to 140 F) Display unit: 0.1 C (0.2 F)\nFull Auto LED (Super Illuminator) Backlight with Afterglow, World Time, 31 time zones (48 cities + UTC), city name display, daylight saving on/off, Sunrise/Sunset Data, 5 Daily Alarms (4 one-time and 1 snooze alarm)\nHourly Time Signal, 1/10 Second Stopwatch, Countdown Timer, 12/24 Hour Formats, Button operation tone on/off\nStorage Battery: Solar Rechargeable Battery, Battery Level Indicator\nPower Saving Function, Approx. Battery Life: 9 months on full charge (without further exposure to light), Module 3415\nTough solar power; low temperature resistant (-10c/14f); digital compass w/bearing memory\n	9999	0	0	ACTIVE	2025-10-24 18:03:09.675	2025-10-24 18:03:09.675	25499	Casio Men's Pro Trek PRG-270-1 Tough Solar Triple Sensor Multifunction Digital Sport Watch
55d68f8f-9344-4f16-bd67-33c246eb33a0	MOUNTAINTOP 30L Hiking Backpack	\N	4999	1000	\N	【Premium Comfort & Durability】: MOUNTAINTOP hiking daypack is made of high-density 500D polyester, which is lightweight, anti-tear, water repellent. In addition, all of the backpack's stress points and shoulder straps are reinforced with lap-knots to ensure long lasting durability.\n【Spacious And Organized Storage Space】: With a 30L capacity for 1-2 day hike or 3 day trip, our travel backpack features a multi-compartment design including one main roomy compartment with a interior sleeve for hydration bladder,One front pocket with buckle closure, one front pocket and 2 side pockets.\n【Durable And Ergonomically Designed】: rucking backpack is equipped with ergonomic shoulder straps and back support system, load compression strap system on both sides and bottom to adjust and tighten the backpack. Provides a good sense of comfort and support, helping to reduce fatigue during long hiking trips.\n【Unique Functional Design】:The main pocket of the camping backpack has a strap for binding the water bag liner and a hose hole on the top side for assembling the water bag system; the side straps and buckles can be used to fix water bottles or trekking poles, and the bottom straps can be used to fix a tripod or a sleeping pad.\n【Lightweight & Multi-Purpose】:Hiking backpack men is lightweight, weighing only 1.8 pound; the large capacity and multiple pockets are perfect for hiking, camping, hiking, fishing and the rest of outdoor activities. It meets the size requirements of most airlines. This camping backpack can be used as a hiking backpack, travel bag and business bag, suitable for both men and women.	9989	0	0	ACTIVE	2025-10-21 18:44:38.531	2025-10-24 01:17:59.093	3999	MOUNTAINTOP 30L Hiking Backpack,Men Women Camping Backpack,Lightweight Trekking Travel Backpacks for Climbing Skiing Cycling
fd734d12-8abf-41c1-b10d-c11ccaee006d	HAIX Scout 2.0 Ultra Durable  Boots	\N	30400	5000	\N	UNBEATABLE TRACTION AND COLD-WEATHER PROTECTION: Our women and men's hiking boots feature anti-slip soles and provide unbeatable traction on various surfaces and in diverse weather conditions, including cold and wet environments.\nALL-WEATHER COMFORT: Experience all-weather comfort with our Scout 2.0 waterproof boots, thanks to the advanced GORE-TEX inner lining technology; Regardless of the weather, your feet will stay dry and comfortable\nEUROPEAN CRAFTSMANSHIP: The Scout Shoes 2.0 are meticulously crafted from European Nubuk bull hide and durable textiles, ensuring long-lasting durability; It's the ideal choice for rugged outdoor adventures\nBREATHABLE AND FRESH: The HAIX Climate System in the Scout 2.0 waterproof hiking boots allows your feet to breathe, keeping moisture at bay while introducing fresh air with every step. It's like an air conditioning system for your boots, ensuring long-lasting comfort\nOUTSTANDING PROTECTION AND STABILITY: With a lightweight bruise plate and anti-torsion design, the Scout 2.0 shields your feet from sharp rocks and stones, even in rugged terrain, while providing unbeatable stability.	7992	0	0	ACTIVE	2025-10-24 17:24:50.885	2025-10-24 17:24:50.885	25400	HAIX Scout 2.0 Ultra Durable Waterproof Hiking and Hunting Boots With Anti Slip Sole
e8179689-dff5-4179-a13d-092afbe851c5	Danner Skyridge Hiking Boots for Men	\N	17995	2000	\N	DURABLE men’s hiking boots with smooth suede and cotton ripstop upper, built to last on the trail and be comfortable right out of the box\nWATERPROOF hiking boots featuring 100% waterproof Danner Dry barrier, allowing moisture to escape without letting water in, keeping your feet dry and comfortable all day\nORTHOLITE triple-density polyurethane hiking boot footbed for maximum comfort and support. Open-cell construction improves heat dissipation and air circulation\nEVA MIDSOLE designed to be lightweight and provide long-lasting cushioning and shock-absorption\nSLIP-RESISTANT Mountain Tread outsole featuring multi-directional lugs suitable for everything from trail to town	7992	0	0	ACTIVE	2025-10-24 17:28:17.746	2025-10-24 17:28:17.746	15995	Danner Skyridge Hiking Boots for Men - Waterproof, with Durable Suede & Cotton Ripstop Upper, Breathable Lining, Comfort Footbed & Traction Outsole
2f9c5917-a52e-430b-a88b-f15e7e104c5d	Merrell Men's Waterproof Hiking Boot	\N	16699	1000	\N	Waterproof membrane seals out water and lets moisture escape\nPig suede leather and breathable mesh upper\nMerrell Air Cushion in the heel absorbs shock and adds stability\nSuper Rebound Compound midsole provides durable shock absorption to help reduce torque and allow for a smooth transition into the midfoot\nVibram TC5+ outsole provides exceptional traction for outdoor multi-sport activities, formulated exclusively for Merrell\n	7992	0	0	ACTIVE	2025-10-24 17:26:35.56	2025-10-24 17:26:35.56	15699	Merrell Men's Moab 3 Mid Waterproof Hiking Boot
f5cf2fb3-26f3-48ab-8338-b981a0b682d4	Helikon-Tex Men UTP Ripstop Pants	\N	13999	500	\N	COMFORT-FIT WAIST - Elastic VersaStretch panels in crotch and neck area\nRUGGED DURABILITY - Crafted with a blend of cotton and nylon, these tactical pants for men feature enhanced stitching for outdoor resilience\nPROFESSIONAL COMFORT - A patented U.S. and EU design, these Helikon-Tex tactical pants even feature internal pockets for extra padding and knee pads\nCLIMATE RESILIENT - Whether you are going hunting, hiking, trail riding, or planning a SWAT assault, these men pants can withstand a variety of climates\nLOW-PROFILE POCKETS - Keep clips, ammo, first aid or tactical equipment accessible with 12 load-bearing pockets located across the front, rear and thighs. European Patent No. 001832254-0001. ACCESSORIES AND BELT NOT INCLUDED	495	0	0	ACTIVE	2025-10-24 17:49:14.314	2025-10-24 17:49:14.314	13499	Helikon-Tex Men UTP Ripstop Pants
def049c8-0ea5-4c0b-87b7-2806925a65c4	COROS PACE 3 GPS Sport Watch	\N	22999	1500	\N	Comfort, Lightweight, Durable: Designed as the ultimate running watch, the COROS PACE 3 GPS sports watch merges an 11.7mm ultra-slim profile and 30g featherweight design (with nylon band) for 24/7 wear in completely distraction-free comfort.\nAlways-On 1.2" Transflective Touchscreen: COROS PACE 3 GPS sports watch features a touchscreen experience (Backlight Display settings include three modes: Always On, Navigation & Activity, or Navigation Only)\nExtended Battery Life: Transform your training with a GPS running watch built for endurance and speed. 38 hours of continuous GPS tracking or 24 days of daily use on a single charge.\nAccurate GPS with Dual-Frequency: Built with a redesigned Dual-Frequency satellite chipset, the PACE 3 GPS Sport Watch will keep your GPS tracks and GPS coordinates accurate, even in high-rise cities. It also records air pressure and elevation gain.\nROUTE PLANNER: Easily build custom routes or search for a destination on the COROS App, then sync the navigation directly to your COROS PACE 3 GPS Sport Watch. The Breadcrumb navigation feature helps you stay on track without losing sight of your other activity data.\nExtensive Activity Modes: Run, trail run, bike, swim, strength, Snowboard, Ski and XC Ski. COROS PACE 3 Sports GPS watch for men and women provides an extensive range of activity modes that are optimized to help you reach your goals and track your data accurately.	999	0	0	ACTIVE	2025-10-24 18:00:39.765	2025-10-24 18:00:39.765	21499	COROS PACE 3 GPS Sport Watch– Lightweight, Comfortable Running Watch, 17-Day Battery Life, Accurate GPS, Heart Rate Monitor, Navigation, Sleep Tracking, Training Plan, Run, Bike, and Ski-Black silicon
e2ae736e-464e-47a3-bea4-9b04c39e4eb2	Hewolf 2/3/4 Person Camping Tent	\N	12999	2000	\N	Multi-Season Use: Designed for all-season performance, this camping tent is your ultimate companion for camping, hiking, and backpacking. With a spacious interior that comfortably accommodates 2-4 adults, it’s perfect for family camping trips, weekend getaways, or solo expeditions. Whether you’re braving winter snow or summer rain, its durable construction ensures reliable shelter in any weather\nInstallation design: Simple disassembly quick installation Open the top of the tent, according to the picture shows, just lift the top, open the mechanical device, and then fix the joint at the bottom in place, press down the position of the rod and spring instantaneously automatic installation\nWaterproof material: We use outdoor 4500mm exclusive waterproof grade, using SBS zipper, 210T material at the bottom, 10000+ waterproof. With sealed seams and unique waterproof strips, it's the perfect companion to keep you dry and comfortable while camping in harsh climates\nEnjoy outdoor: The tent can be detachable, two doors circulate air, give you enough air flow to have better ventilation, mesh screen to prevent mosquitoes from entering the tent, family tent with lantern hooks, mesh storage bag to store small items\nExclusive patent: Using high-grade Oxford cloth, fine workmanship	9995	0	0	ACTIVE	2025-10-21 17:56:40.417	2025-10-23 17:18:18.81	10999	Hewolf 2/3/4 Person Camping Tent - Instant Pop Up Waterproof 2 Doors Tent with Easy Setup | 3-Season Hexagonal Dome Design for Family, Hiking & Traveling
7bff667c-f977-4e72-b079-3c35609f6cbf	mazfit T-Rex 3 Pro Outdoor Smart Watch	\N	39900	5000	\N	Rugged by Design: The T-Rex 3 Pro smart watch is adventure-ready with sapphire glass, a bright 3000-nit AMOLED display, and a titanium alloy bezel and buttons - available in 48mm or 44mm to match your style.\nOffline Maps with Route Planning: Stay on track anywhere with offline POI search, auto rerouting, round-trip route creation, and detailed ski maps - your ultimate outdoor companion for every adventure.\nIndustry-Leading GPS: Accurately track every move, even under tall buildings or dense tree cover. Dual-band support from six satellite systems delivers fast, reliable connection, through rugged hikes to intense trail runs.\nBuilt for Every Adventure: With 180+ sport modes, HYROX training, 10 ATM water resistance, and diving certification to 45m, the Amazfit T-Rex 3 Pro activity tracker is built to excel from ocean depths to mountain peaks.\nBuilt-In Flashlight: Stay visible with a built-in two-color flashlight. Switch between soft red for low interference, bright white for clarity, or Turbo Mode for maximum visibility. An SOS signal offers added peace of mind when needed.\nUp to 3 Weeks of Battery Life: Built to keep up with you, this watch delivers exceptional battery life - up to 25 days - so you can focus on the journey, not the charger. Whether on multi-day treks or remote missions, it stays powered when you need it.\nEvery Beat Counts: The T-Rex 3 Pro’s BioTracker sensor delivers precise heart-rate tracking. Pair with the Helio Strap for a 24/7 training and recovery system, ensuring every hike, race, and workout is backed by the most reliable data possible.\nStay Connected Without Stopping: Take Bluetooth calls from the trail, use Zepp Flow to reply to instant messages hands-free (connection to Android phone required), listen to training notifications, and more with the built-in speaker and mic.	9999	0	0	ACTIVE	2025-10-24 17:59:19.766	2025-10-24 17:59:19.766	34900	Amazfit T-Rex 3 Pro Outdoor Smart Watch 48mm Sapphire AMOLED Display, Ti Bezel, Dual Band GPS, Offline Maps, 25 Days Battery, Built-in Flashlight, 10 ATM, 180+ Sports Mode for Android & iPhone, Black
42551e2e-c1f8-44bb-bcd8-dd22486ea992	SITKA Men's Hunting Pants	\N	23900	2000	\N	DIAGONAL THIGH ZIP POCKETS: The Diagonal diagonal thigh zip pockets offer security for small essentials, easy access from the seated position and additional ventilation when necessary.\nLOW-PROFILE BELT SYSTEM: The low-profile belt system keeps the pant comfortably in place , even when you weighted down the pockets with shells.\nARTICULATED PATTERNING: The fit is athletic with tapered legs and a low-profile waist that won’t bunch or chafe under waders. An offset waist button further reduces bulk when layering.\nDURABLE WATER REPELLENT FINISH: It resists light precipitation and prevents the face fabric from wetting out.\nPURPOSE: Worn under waders or bibs, these pants double as an excellent insulation layer.	594	0	0	ACTIVE	2025-10-24 17:57:28.805	2025-10-24 17:57:28.805	21900	SITKA Men's Grinder Waterfowl Concealing Hunting Pants
3b0f3e9a-6edc-46de-9335-6c99d6f02100	Loowoko 50L Hiking Backpack	\N	5199	500	\N	Cpmprehensive Upgraded Version - The Loowoko hiking travel backpack has been completely upgraded with better materials, stronger straps and more durable zippers, making it one of the most popular hiking daypack options for consumers.\nRain Cover Included - Made with high quality tear Polyester and nylon fabric, tear resistant, anti-scratch, wear resistant. Come with extra waterproof rain cover pouch on the bottom pouch, prevent the water and dust into the backpack, protect your valuables from heavy rain and keep everything dry.\nNo Internal Frame - This lightweight & comfortable hiker backpack is specially designed for outdoor enthusiasts. Breathable mesh shoulder straps with plentiful sponge padding help relieve the stress from your shoulder. Widened and thickened S-type shoulder straps and high elastic breathable back support for best ventilation and easing burden, gives you more comfortable experience.\nOutstanding Organizational Features - With an large main compartment, separate shoe separator, and six external pockets, this rucksack makes it easy to distribute and organize your gear. The bag also allows you to customize your external organization, along with ample compression straps and attachment points to carry sleeping bag, tent, trekking poles, ice axes, and more.\nCamping Essential Gear - With 50 liter large capacity but only 2.1 pounds weight, it's enough for 3-5 days travel or outdoor adventure. Fits women and men and meets size requirements for most airlines. A must have daypack for hiking, camping, backpacking, trekking, mountaineering and traveling.\n	9999	0	0	ACTIVE	2025-10-24 16:40:27.286	2025-10-24 16:40:27.286	4699	Loowoko 50L Hiking Backpack, Waterproof Camping Essentials Bag with Rain Cover, 45+5 Liter Lightweight Backpacking Back Pack
003faa07-aa20-4eb8-b8b6-d9bf533b081d	Nitecore EDC35 5000	\N	8995	500	\N	ILLUMINATION SPECIFICATIONS: The Nitecore EDC35 flashlight delivers 5000 lumens with a beam range of 601 yards. Featuring the innovative NiteLab UHi 40 MAX LED, it offers four brightness levels and includes a sensor protection function that decreases the EDC35's brightness when it's too close to objects to prevent overheating.\nCHARGING AND RUNTIME: Equipped with a 6000mAh battery and via the built-in waterproof charging port, this flashlight achieves a full charge in 3.5 hours and provides up to 90 hours of continuous use on low mode.\nDURABILITY FEATURES: holds an IP68 rating and can withstand impacts up to 2 meters, ensuring reliable performance. The flashlight includes tail stand capability for hands-free operation.\nINCLUDED ACCESSORIES: Comes complete with a clip, lanyard, USB-C charging cable, Holster N312, and Nitecore sticker. The flashlight weighs 6.28 ounces with clip attached and measures 4.89 inches in length.	9999	0	0	ACTIVE	2025-10-24 17:14:40.651	2025-10-24 17:14:40.651	8495	Nitecore EDC35 5000 Lumen EDC Flashlight, USB-C Rechargeable, High Power Super Bright Sticker for Everyday Carry
b10a9534-0b3f-46bd-8c53-bbd6ca671a13	Nitecore P20iX Tactical Flashlight	\N	9995	2000	\N	CONSTRUCTION AND DURABILITY: With an IP68 waterproof and anti-impact protection, the P20i is ready for high intensity tactical operations. Features a steel bezel with glass breaking capability.\nILLUMINATION CAPABILITIES: Features four LEDs producing 4000 lumens with beam distance reaching 241 yards. Includes four brightness levels plus strobe mode accessed via tailcap switch.\nPOWER AND RUNTIME: USB-C rechargeable battery provides 30 minutes runtime at 4000 lumens turbo mode and extends to 350 hours on low setting.\nINCLUDED ACCESSORIES: Comes with NTH20 tactical holster compatible with duty belts and MOLLE systems, USB-C charging cable, lanyard, clip, and LumenTac organizer.\nDisclaimer: AI summary based on product information\n	9999	0	0	ACTIVE	2025-10-24 16:50:27.372	2025-10-24 16:50:27.372	7995	Nitecore P20iX Tactical Flashlight, 4000 Lumen USB-C Rechargeable High Lumen Super Bright with LumenTac Organizer
ae192202-e9f2-43fd-b372-78de9ab2ac03	MOUNTAINTOP 50L Internal Frame Backpack	\N	7498	500	\N	【50L Large Capacity & Multi Compartment】This lightweight hiking backpack only weights 1.45kg. The Size of backpack is 73X32X21cm and the loading capacity up to 50L.With multiple storage compartments and the large main compartment with extra zipped internal pocket,makes your items organized well.Good daypack for a short outdoor trips\n【Comfortable & Breathable】Breathable mesh padded with durable open-cell foam on the ergonomic back panel and lumbar offer better ventilation to dissipate heat and give you more comfortable feeling.Thickened shoulder straps and waist belt with plenty sponge padding help to relieve your burden\n【Universal Fit with Adjustable Belt】Built-in the adjustable shoulder strap,chest belt and waist belt allow to adjust the tightness as you need and friendly provide a wide range of stretch space for your body.Multi-position torso adjustment offers a perfect customizable fit.Perfect backpack fits for man and women at any age\n【High Performance Backpack】Backpack with the shape-forming backer board.Designed with multiple compression strap, provides better strength and stability.Thoughtfully equipped with built-in practical whistle buckle and handing straps.And these handing straps can be well used to hang tent,sleeping bag,trekking pole and other gears.Very convenient for outdoors hiking, climbing, camping,mountaineering\n【Durable Fabric & Rain Cover】Made of tear resistant nylon fabric material and high dense stitching and well-sewn craftsmanship to ensure this climbing backpack is durable.This backpack comes with a rain cover for waterproof	9999	0	0	ACTIVE	2025-10-24 16:44:17.814	2025-10-24 16:44:17.814	6998	MOUNTAINTOP 30L Hiking Backpack,Men Women Camping Backpack,Lightweight Trekking Travel Backpacks for Climbing Skiing Cycling
0ca37889-3c98-4945-a870-735dff527022	VSGO Pocket Ranger Backpack	\N	9900	3000	\N	Nature-Inspired Design with Waterproof Protection: Inspired by nature’s adaptability, Pocket Ranger combines breathable design with rugged durability. Teflon water-repellent coating and PVC waterproof fabric shield your gear from rain, mud, and dust—ready for any adventure.\n3-in-1 Adaptive Camera Backpack: Switch seamlessly between modes with the patented foldable liner. Use it as a half-camera/half-outdoor bag, a full photography pack, or remove the liner to create a lightweight hiking or travel backpack. Compresses down to just 2 cm for effortless storage.\nFull-Access Back Panel with Load Support: Move freely with the lightweight exoskeleton frame and full-access back panel, allowing quick gear retrieval from any side. Built-in ultralight aluminum support distributes weight evenly, keeping you agile and comfortable even when fully packed.\nPatented Snap-Opening System for Instant Access: VSGO’s exclusive Snap-Opening system, paired with a German Fidlock magnetic buckle, lets you open and close the backpack in one smooth pull. Instantly grab gear or snacks without breaking stride—combining fast access with secure closure.\nOne Backpack, Endless Adventures: Customizable compartments adapt to photography, hiking, camping, or daily commuting. Expandable design grows from 25L to 33L (or 35L to 43L), giving you the flexibility to carry everything you need—without ever switching bags.\n	9999	0	0	ACTIVE	2025-10-24 16:42:48.356	2025-10-24 16:42:48.356	6900	VSGO Pocket Ranger Expandable 25L-33L Photography & Outdoor Backpack – Lightweight Camera Bag for Hiking, Mountaineering, Travel
dd790a92-177f-4049-a668-18caafa545f1	Lighting EVER LED Flashlight	\N	7098	3000	\N	COMPACT DESIGN: LED flashlight measures 4.2 inches in length and 1.2 inches in diameter, weighing 128g for easy portability and pocket carry.\nILLUMINATION SPECS: Features LED technology with 140 lumen output and 492ft beam distance. Adjustable focus allows switching between spot beam and flood beam modes.\nDURABILITY FEATURES: Impact and Water Resistant (IPX4), premium aluminum casing resists rust and corrosion. Solid State Shockproof and vibration proof.\nPOWER AND ACCESSORIES: Includes three AAA batteries and instruction manual.\nDisclaimer: AI summary based on product information\n	9999	0	0	ACTIVE	2025-10-24 16:47:12.458	2025-10-24 16:47:12.458	4099	Lighting EVER LED Flashlights High Lumens, Small Flashlight, Waterproof, Adjustable Focus Flash Light for Outdoor, Emergency, AAA Batteries Included, Tactical & Camping Accessories
bdec1acb-bb77-41e7-ae08-076453fa07ca	Garmin Instinct 2X Solar - Tactical Edition	\N	9999	1000	\N	Bold, rugged GPS smartwatch is built to U.S. military standard 810 for thermal, shock and water resistance — with a large solar-charged display and durable 50 mm polymer case\nSolar charging: Power Glass lens extends battery life, producing 50% more energy than the standard Instinct 2 solar watch\nInfinite battery life in smartwatch mode when exposed to 3 hours of direct sunlight (50,000 lux) per day\nBuilt-in LED flashlight with variable intensities and strobe modes gives you greater visibility while you train at night and provides convenient illumination when you need it\n24/7 health and wellness tracking helps you stay on top of your body metrics with wrist-based heart rate, advanced sleep monitoring, respiration tracking, Pulse Ox and more (this is not a medical device, and data presented is intended to be a close estimation of metrics tracked. Pulse Ox not available in all countries.)\nGain a deeper understanding of your overall health, training and recovery through heart rate variability while you sleep, based on technology developed by our Firstbeat Analytics team\nBuilt-in sports apps to take on running, biking, swimming, strength training and more, plus VO2 max and other training features	9999	0	0	ACTIVE	2025-10-24 18:01:51.315	2025-10-24 18:01:51.315	8999	Garmin Instinct 2X Solar - Tactical Edition, Rugged GPS Smartwatch, Built-in Flashlight, Ballistics Calculator, Solar Charging Capability, Coyote Tan
1070cd3b-c3a3-4f40-8513-9686cf2c9083	NEXTORCH P91 Tactical Flashlight	\N	5999	1000	\N	【P SERIES FLASHLIGHTS】NEXTORCH P91 rechargeable flashlight high performance produces up to 5000 lumens of output with a beam distance of up to 300 meters. 160 mm (L) 36 mm (head diameter) 28.5 mm (barrel diameter) compact LED flashlight weighs 5.82 oz (without battery), achieves a balance between performance and size with ruggedness and compact size for one-handed duty use.\n【MULTI-FUNCTIONAL UNIQUE DESIGN】NEXTORCH rechargeable flashlight design features a tail-press and side-press switch that can be operated independently of each other, making it easy and efficient to operate with precision regardless of whether you're holding the flashlight in your forehand or backhand. Six lighting modes 5000 lm (300 meters), 1100 lm (136 meters), 350 lm (80 meters), 45 lm (28 meters), momentary on, tactical strobe.\n【WATERPROOF & INDESTRUCTIBLE QUALITY】NEXTORCH high quality rechargeable flashlight is waterproof and drop-proof, reliable and durable. 2 meters drop-proof, IPX7 (1 meter) waterproof, harsh use of the environment, but also can easily cope with, more comprehensive and more peace of mind! The hard anodized finish and selected aircraft-grade aluminum alloy material make this flashlight sturdy and stable enough to be used as a law enforcement flashlight for changing environments.\n【RUGGEDIZED FLASHLIGHT】NEXTORCH rechargeable flashlight high-performance industrial-grade components with advanced circuit design ensure reliable operation in extreme environments ranging from -20°C to 40°C. When you turn on/off the flashlight, the power display light will light up for 2 seconds to indicate the remaining power, and the maximum battery life is 60 hours, which meets the demand of long time power use. Hidden Type-C charging port for easy power renewal and water and dust resistant.\n【WHAT PRODUCTS AND SERVICES YOU CAN GET】NEXTORCH purchase gets you P91 flashlight, multi-language use manual, Type-C cable, hand strap, seal ring*2. Our professional team offers a five-year warranty on all flashlights, if you have any questions about the product, please feel free to contact us.	9999	0	0	ACTIVE	2025-10-24 16:49:05.784	2025-10-24 16:49:05.784	4999	NEXTORCH P91 Tactical Flashlight High Lumens, 5000 Lumens Dual Switch Rechargeable Flashlight with 6 Modes & Strobe & Ceramic Glass Breaker for Night Duty, Breakout Operations, Tactical Training, etc
f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	FORLOH Men's BTM Pro Pant 	\N	25900	2500	\N	DURABLE & COMFORTABLE: The BTM Pro Pant offers exceptional durability and comfort with military-proven nylon and cotton ripstop fabric. The wax emulsion treatment enhances water, abrasion, and thorn resistance by over 50%, perfect for rugged outdoor activities like hiking, hunting, and fishing. Strategically placed 4-way stretch panels provide maximum flexibility and mobility.\nENHANCED PROTECTION: These pants feature built-in knee pad pockets for added protection during kneeling or climbing. The wax ripstop fabric can be reapplied in the field, boosting abrasion resistance. Articulated knees and snap-adjustable cuffs ensure comfort and versatility, making these pants ideal for any terrain and weather conditions.\nTEMPERATURE REGULATION: Stay comfortable with two zippered side vents for optimal temperature control. The pants' nylon/cotton ripstop fabric adds breathability while resisting tearing and snagging. The internal waist silicone gripper ensures a secure fit, preventing the pants from riding up or down during movement.\nMULTIPLE FUNCTIONAL POCKETS: Designed for practicality, these pants include two hand pockets with reinforced areas for knives, two cargo pockets (one zippered for added security), and snap-adjustable pant cuffs. Quiet field-reliable YKK reverse coil zippers provide a noise-free experience, ideal for stalking prey.\nMADE IN THE USA: Proudly sourced and manufactured in America, the BTM Pro Pant reflects superior craftsmanship and quality. These pants are perfect for upland hunting, hiking, fishing, and other outdoor adventures, offering unmatched performance and durability.\n	8091	0	0	ACTIVE	2025-10-24 17:47:53.876	2025-10-24 17:47:53.876	23400	FORLOH Men's BTM Pro Pant - Ultimate Upland Brush Pants | Water Resistant | Hiking, Hunting | Wax Ripstop Fabric
1e332cf0-620b-4da1-a283-1b9674b36b3d	THE NORTH FACE Men's Freedom Pant 	\N	17000	2000	\N	ALL-MOUNTAIN SNOW PANTS: With reinforced nylon kick patches, the Men's Freedom Pants have the durability to match their waterproof, breathable performance and all-conditions style.\nWATERPROOF & BREATHABLE: A DryVent 2L shell with a non-PFC Durable Water Repellent (DWR) finish keeps snow and rain out, while the Chimney Venting system with mesh-lined inner-thigh vents and mesh gaiter panels allows superior temperature regulation.\nSTANDARD FIT: Featuring a tailored feel that's trim but not tight, these ski and snowboard pants feature a waistband with adjustable hook-and-loop tabs & belt loops and articulated knees for increased mobility. Inseam: S 30", R 32", L 34".\nBLOCK THE SNOW: Breathable StretchVent gaiters with gripper elastic help keep the snow out of your boots, while a reinforced hem and kickpatches enhance durability for lasting wear, season after season.\nOUTDOOR VERSATILITY: Secure-zip hand pockets keep your phone, wallet and ski pass safe, while a cargo pocket with a hook-and-loop closure gives you a place to stash your goggles. Includes a zip-fly with a snap-tab closure for added convenience.	594	0	0	ACTIVE	2025-10-24 17:56:07.479	2025-10-24 17:56:07.479	15000	THE NORTH FACE Men's Freedom Pant | Waterproof, Non-insulated Snow Pants for Ski & Snowboard, Gaiters, Adjustable Waist
da19b771-4df9-46b3-ac41-48de4fab14dc	SHULOOK Men's Waterproof Hiking Boots 	\N	9999	1000	\N	Mens hiking boots made of premium synthetic suede. SL-TEX waterproof membrane prevents water from entering and volatilizes water vapor. Ultra-light weight: 1.25lb (size 10)\nBreathable and skin-friendly D01 lining has efficient ventilation effect and keeps comfortable and dry throughout the day. Features a lace-up for an adjustable, secure fit.\nClosed-cell tongue prevents rain, muck and sand from entering. Rubber anti-collision toe design and the waterproof sealing structure, bring you comprehensive protection and comfort.\nRemovable memory foam insole provides excellent arch support to the natural contours of the foot. Targeted heel cushioning improves overall comfort by reducing stress on your foot with each step.\nFlexible EVA midsole bring superior cushioning and high energy return, reduces foot fatigue and absorbs shock. Advanced traction rubber sole provides stable and reliable grip in a variety of environments. Designed for both daily life and outdoor sports like hiking, walking, hunting, camping, climbing, cycling, fishing, jungle, running, backpacking, trekking, mountaineering, traveling, etc..	7992	0	0	ACTIVE	2025-10-24 17:22:47.314	2025-10-24 17:22:47.314	8999	SHULOOK Men's Waterproof Hiking Boots Non-Slip Lightweight Mid Top Ankle Boot Breathable Hiker Trekking Shoes
aeb498e2-9208-4374-9dbb-5d024b2d4220	Amazfit T-Rex 3 Outdoor Smart Watch 	\N	24999	5000	\N	ULTRA-BRIGHT AMOLED DISPLAY: With peak brightness of 2,000 nits, the Amazfit smart watch delivers easy reading of maps and workout data in any light. Night mode and Glove Mode enhance visibility for clear viewing\nDURABILITY FOR EXTREME CONDITIONS: This rugged smart watch, engineered with a 316L stainless steel bezel, withstands temperatures from -22°F to 158°F, and is water-resistant to 328 feet and can be used for freediving to a depth of 147 Feet\nEXTENDED BATTERY LIFE: The Amazfit T Rex 3 offers over 3 weeks of power with typical use or up to 180 hours in GPS mode, providing long-lasting performance for hiking trips or outdoor activities\nPRECISION NAVIGATION TOOLS: The smart watch for men and women provides free global maps with dual-band positioning. Six satellite systems offer fast, accurate GPS connections and precise turn-by-turn navigation\nEXPANSIVE FITNESS TRACKING: This fitness watch offers 170+ workout modes and AI-generated training plans, providing real-time updates to guide your fitness journey from hiking to surfing	9999	0	0	ACTIVE	2025-10-24 18:04:19.413	2025-10-24 18:04:19.413	19999	Amazfit T-Rex 3 Outdoor Smart Watch 48mm AMOLED Display, Offline Maps & Navigation, 6 Satellite Systems Dual Band GPS, 27 Days Battery Life, 170+ Sports Mode, 45m Freediving for Android, iPhone
7cf49f7c-3217-436b-b265-2686cfac49cb	CAMPROS CP Tents	\N	5999	700	PERCENTAGE	polyester\nImported\nSpacious Camping Tent: This 4 Person tent offers a roomy 8' x 7' x 50"H (Recommended for 2-3 Campers + Gears). ideal for couples, friends, or small families.\nEnhanced Ventilation & Stargazing Experience: Designed with large mesh windows and a breathable mesh ceiling, this 4 person tent promotes excellent airflow while keeping insects out. Remove the included rainfly at night to enjoy an open sky—perfect for stargazing in warm weather\nDurable Materials: Made from 185T polyester with a PU 1500mm waterproof coating, this tents for camping stands up to light rain and wind. The floor features a thick PE tarp for added moisture resistance, and the B3-grade mesh blocks out bugs while allowing fresh air in\nQuick Setup: Includes upgraded dual-way zippers, internal storage pockets to keep your tents dry and organized. Setup takes just 5 minutes with two people—great for both new and experienced campers\nLightweight & Easy to Carry: This portable dome tent weighs just 8.2 lbs and packs down to 24" x 7.2" x 7.2", making it easy to carry in your car or by hand. Comes with a convenient carry bag for transport and storage	9997	0	0	ACTIVE	2025-10-21 18:21:45.812	2025-10-23 17:18:09.871	5579	CAMPROS CP Tents for Camping 4 Person Tent Waterproof Windproof Double Layer Camping Tent, Easy Setup Dome Tent with Large Mesh Windows & Wider Door for Outdoor Camping & Hiking
2286f8e2-2206-4b7b-914c-ce2c74ee1538	Bseash 60L Hiking Camping Backpack	\N	3999	500	\N	Comfortable Daypack: This climbing backpack is specially designed for travelling enthusiasts, ergonomic padded shoulder straps and back support, gives you more comfortable feeling. Breathable mesh shoulder straps with plenty of sponge padding help relieve the stress from your shoulder. Widened and thickened S-type shoulder straps and high elastic, breathable back panel for best ventilation and load distribution. And this pack has no internal or external frame.\nLarge Capacity & Multiple Compartment: Large capacity with a spacious main compartment and multiple pockets provide enough room for 3 or 4 day trips. Special main compartment drawstring closure design to prevent items from falling out of the backpack. With an inner pouch for a water bladder, two side pockets to carry extra water bottles. Separate shoe storage pouch to prevent items inside the backpack from getting dirty, convenient and practical. Meets most airline size requirements.\nWith 8 Adjustable Straps: for tying up your backpack or hanging your sleeping bag, mat, hammock, tripod and other gear, practical for hiking, climbing, camping enthusiasts. Reflective stripes make it easier to identify at night, making it safer to travel.\nWater-resistant: Made of high-quality and safe material, it is durable for long-time use. The nylon fabric material made of High-quality ripstop polyester material, is water-resistant and tear-resistant. There is also an extra rain cover included in the bottom pouch to prevent the water and dust from getting into the backpack, protecting your valuables from heavy rain and keeping everything dry.\nLightweight backpack for outdoor, Ultralight, only 2.4 lbs for a large 60L capacity, reducing the weight of the backpack so you can carry more other items. The maximum load bearing capacity is 33 lbs. Unfolded size: 68 x 32 x 24 cm / 26.7 x 12.6 x 9.5 inches.\n	9999	0	0	ACTIVE	2025-10-24 16:37:01.556	2025-10-24 16:37:01.556	3499	Bseash 60L Hiking Camping Backpack with Rain Cover, Waterproof Large Capacity Outdoor Sport Travel Daypack Climbing Touring (Army Green)
b0f22f97-445f-495a-9e1c-8d2792fc800a	MOLLE Assault Backpack	\N	3995	1000	\N	LARGE CAPACITY - Military tactical backpack size approx.:12"*20"*13" / 30*50*33CM (W*H*D) Capacity:40L, This tactical military assault backpack is made of quality and water-resistant High Density fabric, With Large Capacity allow you to carry all your tactical gears, it can be used as 3 day assault pack, bug out bag backpack, emergency backpack, combat backpack, range bag, molle emt backpack, EDC outdoor backpack, hunting backpack, travel backpack, survival backpack or trekking backpack\nMULTI-FUNCTIONAL - This tactical assault pack have 2 main compartments, 2 small compartments in front, and a back compartment for a hydration bladder. Each of the compartments has variety pockets to help with organization. The large compartment area has an elastic strap to hold laptops or anything you don't want to move around. Each pocket has two zipper pulls, and one of the compartments that can fully open all the way down to the bottom like suitcase.\nCOMFORTABLE & TOUGH - The shoulder straps are padded and adjustable and the waist belt expands enough. The thick mesh padding back area and shoulder straps will not pinch you under heavy duty. Thick padded back panel pocket works great with 3L hydration bladder(hydration bladder do not include)\nARMY MOLLE SYSTEM - The front and both sides come with MOLLE system, Molle webbing throughout for attaching additional tactical pouches or gear as 3 day assault pack backpack combat molle backpack. The Y strap and buckle on the front is great to roll up a sweatshirt or light jacket. And the straps at the bottom can be used to hold a tent or sleeping pad.\nPACKAGE INCLUDED - 1 Tactical backpack, US Flag patch, 2pcs D-Ring, 1pc MOLLE Webbing Dominators. Should you have any additional problem, please let us know without hesitation at any time.	9992	0	0	ACTIVE	2025-10-21 18:48:30.682	2025-10-23 17:18:00.09	2995	MOLLE Assault Backpack, Tactical Backpack Military Army Camping Rucksack, 3-Day Pack Trip w/USA Flag Patch, D-Rings, Black
8aecdb16-2f4c-4d56-bc1a-40795dc8c857	THE NORTH FACE Men's Freedom Insulated Pant	\N	20000	2000	\N	ALL-MOUNTAIN SNOW PANTS: This leveled-up version of our Men's Freedom Pants features recycled Heatseeker Eco insulation to go with the waterproof, breathable performance, durability, and all-conditions style you've come to expect from its predecessor.\nWATERPROOF & INSULATED: Made with a DryVent 2L shell and our Chimney Venting system, these waterproof snowpants feature sealed seams and breathable mesh-lined inner-thigh vents. 60g Heatseeker Eco synthetic insulation offers warmth, even when wet.\nSTANDARD FIT: Featuring a tailored feel that's trim but not tight, these ski and snowboard pants feature a waistband with adjustable hook-and-loop tabs & belt loops and articulated knees for increased mobility. Inseam: S 30", R 32", L 34".\nBLOCK THE SNOW: Breathable StretchVent gaiters with gripper elastic help keep the snow out of your boots, while a reinforced hem and kickpatches enhance durability for lasting wear, season after season.\nOUTDOOR VERSATILITY: Secure-zip hand pockets keep your phone, wallet and ski pass safe, while a cargo pocket with a hook-and-loop closure gives you a place to stash your goggles. Includes a zip-fly with a snap-tab closure for added convenience.	603	0	0	ACTIVE	2025-10-24 17:50:40.981	2025-10-24 17:50:40.981	18000	THE NORTH FACE Men's Freedom Insulated Pant | Waterproof Snow Pants, Gaiters, Adjustable Waist, Zip Pockets
00a1f59d-618c-4e28-9c49-06c1fb90c155	NORTIV 8 Hiking Boots	\N	6798	500	\N	Roomy Toe Box: These men's hiking boots feature a wide toe box that provides more space for toes to spread naturally, improving walking balance and overall foot health.\nLow Drop Design: With a 5-mm heel-to-toe drop, these waterproof hiking boots for men keep your feet in a natural position while balancing weight distribution and reduces pressure on the forefoot.\nWaterproof Build: With a built-in waterproof membrane, these men's work boots have passed strict waterproof testing, ensuring your feet stay dry and comfortable no matter where the trail takes you.\nDurable Craftsmanship: Built for outdoor adventures, these outdoor boots for men are crafted with a wear-resistant upper that combines premium leather, nylon fabric, and supportive TPU, providing reliable support for lasting wear.\nComfortable & Slip-Resistant: These men's boots boast a thick EVA midsole that offers bouncy support with every step. The lugged rubber outsole ensures you stay grounded on challenging terrains.\n	7992	0	0	ACTIVE	2025-10-24 17:20:35.678	2025-10-24 17:20:35.678	6298	NORTIV 8 Men's Wide Toe Box Hiking Boots Low Drop Waterproof Outdoor Trekking Camping Shoes Katahdin
2cfb7d29-b15e-404a-b01d-b851a2521400	OLIGHT Seeker 4 Pro Rechargeable Flashlight	\N	10999	2000	\N	[High Performance LEDs] Equipped with four high performance LEDs, this flashlight delivers a maximum output of 4,600 lumens with a beam distance reaching 260 meters for powerful illumination.\n[Advanced Charging Options] Features dual charging capabilities through Type-C charging with holster or magnetic charging compatibility with optional MCC3 charging cable.\n[Waterproof Construction] keeps the high-power flashlight IPX8 waterproof with hidden brightness and battery indicators for reliable performance.\n[Enhanced Control] Features an enlarged metal side switch with 360° rotation dimming capabilities, allowing for easy operation even while wearing heavy gloves.\nDisclaimer: AI summary based on product information	9999	0	0	ACTIVE	2025-10-24 16:52:11.949	2025-10-24 16:52:11.949	8999	OLIGHT Seeker 4 Pro Rechargeable Flashlights, 4600 Lumens High Powerful Bright Light with USB C Holster, Waterproof IPX8 for Emergencies, Camping, Searching (Midnight Blue Cool White)
\.


--
-- Data for Name: ProductDimensions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductDimensions" (id, "productId", weight, length, width, height) FROM stdin;
989b8d24-1834-4883-8082-18954c583cb0	7bff667c-f977-4e72-b079-3c35609f6cbf	\N	\N	\N	\N
bb7d023e-2df0-41ca-be3e-420888e70435	1e332cf0-620b-4da1-a283-1b9674b36b3d	\N	\N	\N	\N
44fc5663-f659-4979-a8b1-e2905ef82b3b	fd734d12-8abf-41c1-b10d-c11ccaee006d	2050	34	23	23
3cd5785c-5dc8-4829-bdc1-bf7939e6a2c0	da19b771-4df9-46b3-ac41-48de4fab14dc	1500	34	34	22
c8979d2b-781a-44ab-a757-0aff234491a3	00a1f59d-618c-4e28-9c49-06c1fb90c155	2000	32	22	44
8b2b0533-f1a1-4f5d-8a74-74c934602591	003faa07-aa20-4eb8-b8b6-d9bf533b081d	300	17	5	5
45e759f0-1551-49e4-adc0-b9483f13612d	7cf49f7c-3217-436b-b265-2686cfac49cb	\N	\N	\N	\N
d128f59f-bdad-4f42-9a7b-54cb30cdcbee	dd790a92-177f-4049-a668-18caafa545f1	200	15	4	4
b8ad682b-2ac4-4ade-b6eb-f4247002fef1	ae192202-e9f2-43fd-b372-78de9ab2ac03	1400	45	45	33
f4dde180-a38c-4ac5-add5-fcd7c1c1cd69	3b0f3e9a-6edc-46de-9335-6c99d6f02100	1020	58	32	23
7631bafe-cbd0-4c8a-9e19-946150f65232	2286f8e2-2206-4b7b-914c-ce2c74ee1538	1200	68	32	24
745c789f-42bd-4645-92ab-caaf3f81f013	e2ae736e-464e-47a3-bea4-9b04c39e4eb2	6000	40	40	80
557e37c8-fcba-4e82-babb-b188863071e4	6cd34fff-71e2-4244-af48-20a5bcc413a4	4000	32	32	160
175e366f-35b7-4cdc-be25-ca725e3665d0	e10e7d79-138d-4b23-a511-831ce674c392	3000	35	35	67
02e318f4-1446-44c1-8515-b8103f8b5ba3	7727922d-bb16-453b-bd6d-62dc45880057	5500	40	45	75
d4a19a79-8f9e-4187-9b0d-3c89110b6842	aeb498e2-9208-4374-9dbb-5d024b2d4220	\N	\N	\N	\N
d91b2f88-001d-422d-9ecb-c5fbf0514231	55d68f8f-9344-4f16-bd67-33c246eb33a0	3000	40	50	60
30ae6549-dc81-4720-9182-6c941ae59392	b0f22f97-445f-495a-9e1c-8d2792fc800a	2500	40	50	56
6297bd89-4584-4ff4-a8c3-93f3fc28ed06	0ca37889-3c98-4945-a870-735dff527022	1200	34	34	54
69ea08a7-d791-4feb-85de-abe30d18207a	1070cd3b-c3a3-4f40-8513-9686cf2c9083	300	15	5	5
f5c05d88-47f2-47c8-b74f-e6b118fa56fa	b10a9534-0b3f-46bd-8c53-bbd6ca671a13	\N	\N	\N	\N
f784425d-4f6b-460a-9df1-8905c0739fa2	2cfb7d29-b15e-404a-b01d-b851a2521400	250	16	6	6
5fb85de6-ebc6-4a67-a380-4a08e4b2e3e9	d9b702e7-4564-49ad-9522-f256a1e1406c	120	5	5	3
b3d64ba1-fe6a-4652-9b82-34eddef1c54d	bdec1acb-bb77-41e7-ae08-076453fa07ca	90	5	5	4
727bd1b0-f5b0-4913-8107-7a9c97e3da24	def049c8-0ea5-4c0b-87b7-2806925a65c4	44	6	6	3
36f9951d-9449-4bac-9c7f-f8f397a23486	42551e2e-c1f8-44bb-bcd8-dd22486ea992	500	24	24	3
e3b5d998-348e-4b52-8e93-f7a830f0151c	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	400	25	25	4
bda9540c-ceed-4dc3-a66e-e40d264a4ea4	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	500	22	22	2
b87241c5-0fc9-4dc3-8703-0f4184cc6e60	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	500	22	22	2
080d3389-102c-4204-8906-7c3d8ffa0a01	e8179689-dff5-4179-a13d-092afbe851c5	1200	34	23	23
88f4c792-483b-4dd2-bff6-1012a18b19fe	2f9c5917-a52e-430b-a88b-f15e7e104c5d	1200	34	23	15
\.


--
-- Data for Name: ProductImageSet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductImageSet" (id, "productId", main, preview, thumbnail) FROM stdin;
2dbdeaec-83a3-4b05-b10b-8d8381f27b2e	ae192202-e9f2-43fd-b372-78de9ab2ac03	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_0_thumbnail
44f3bfc0-f4ce-4ba4-abe1-9f77047744b0	ae192202-e9f2-43fd-b372-78de9ab2ac03	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_1_thumbnail
bddc7524-219b-4db9-9dc0-8eb3eb59b556	ae192202-e9f2-43fd-b372-78de9ab2ac03	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_2_thumbnail
46ac92e4-a563-4553-b23b-78e25f4b4c5d	ae192202-e9f2-43fd-b372-78de9ab2ac03	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2050L%20Internal%20Frame%20Backpack_image_3_thumbnail
63fb323e-b9af-4259-b985-d6bebb7eec26	3b0f3e9a-6edc-46de-9335-6c99d6f02100	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_0_thumbnail
17eee4d4-6fec-4456-ab35-337f45ea826f	3b0f3e9a-6edc-46de-9335-6c99d6f02100	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_4_thumbnail
4f339a9c-29f8-4d3d-aa42-94eb23a484f1	3b0f3e9a-6edc-46de-9335-6c99d6f02100	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_5_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_5_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_5_thumbnail
3b828362-30e9-464d-9ef5-6ce231eb10db	3b0f3e9a-6edc-46de-9335-6c99d6f02100	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_1_thumbnail
6ff3bdf2-2d81-4a6b-82ee-07088920b514	3b0f3e9a-6edc-46de-9335-6c99d6f02100	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_2_thumbnail
fd69f39f-6f05-4fdd-8861-d3aad2fa00c1	3b0f3e9a-6edc-46de-9335-6c99d6f02100	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Loowoko%2050L%20Hiking%20Backpack_image_3_thumbnail
5a70442a-2899-427a-bb39-681a2333aa12	2286f8e2-2206-4b7b-914c-ce2c74ee1538	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_0_thumbnail
9dc5191e-c1ef-44aa-a990-32990afdf8ab	2286f8e2-2206-4b7b-914c-ce2c74ee1538	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_1_thumbnail
47f82180-4c30-450f-a575-c54fe9145559	2286f8e2-2206-4b7b-914c-ce2c74ee1538	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_2_thumbnail
9cef2d2c-3bf0-4552-82fc-8acda5fdeb74	2286f8e2-2206-4b7b-914c-ce2c74ee1538	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_3_thumbnail
0c44f616-9457-4434-9d76-7b5eb50c0c52	2286f8e2-2206-4b7b-914c-ce2c74ee1538	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Bseash%2060L%20Hiking%20Camping%20Backpack_image_4_thumbnail
0d165068-64bb-4beb-9ce5-e57659a6c172	e10e7d79-138d-4b23-a511-831ce674c392	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_0_thumbnail
2780b37b-18dc-4021-9c2f-db5afb3e8e0e	e10e7d79-138d-4b23-a511-831ce674c392	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_3_thumbnail
eb2f3050-3724-465f-9f4a-c237d5e171a8	e10e7d79-138d-4b23-a511-831ce674c392	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_2_thumbnail
abdc712e-686e-4768-8496-a6c3d1674740	e10e7d79-138d-4b23-a511-831ce674c392	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMEL%20CROWN%20Tents_4_thumbnail
fd1d48b5-78e3-4961-bc69-e5b49728fa47	7727922d-bb16-453b-bd6d-62dc45880057	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_0_thumbnail
a6396e96-0427-48b6-bd79-2182ceae46a4	7727922d-bb16-453b-bd6d-62dc45880057	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_1_thumbnail
250a8039-c91c-4b8a-a7c9-22ef9b32910f	7727922d-bb16-453b-bd6d-62dc45880057	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_2_thumbnail
3dd2d698-0a98-4bdd-8135-750be0254773	d9b702e7-4564-49ad-9522-f256a1e1406c	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_0_thumbnail
4a0f62cc-d63a-4a27-8aac-3b85e814e00b	d9b702e7-4564-49ad-9522-f256a1e1406c	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_1_thumbnail
4a6740ad-1504-4936-8cee-36d75fa019db	d9b702e7-4564-49ad-9522-f256a1e1406c	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_2_thumbnail
a6276ab6-6bf7-48de-a8ce-502cc08c2992	d9b702e7-4564-49ad-9522-f256a1e1406c	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Casio%20Men's%20Pro%20Trek%20PRG-270-1_image_3_thumbnail
f9f6df47-f881-4f39-9536-06728ef2f5e7	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_0_thumbnail
ce9b8990-734e-42d7-87eb-f11579ad0e81	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_1_thumbnail
8f1fa44e-8f8e-495e-aae5-9fec41a36226	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_2_thumbnail
9a74d3aa-aaf4-4d38-ba9f-777e156f2497	bdec1acb-bb77-41e7-ae08-076453fa07ca	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_0_thumbnail
c451f922-96f0-46c3-939d-0cabfd3aaff5	7727922d-bb16-453b-bd6d-62dc45880057	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_3_thumbnail
2becdaeb-c5d2-4948-9ac5-f5879185537d	7727922d-bb16-453b-bd6d-62dc45880057	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOON%20LENCE%20Instant%20Pop%20Up%20Tent_4_thumbnail
3643c055-a7b3-4daa-b1bd-b74ba80fee01	bdec1acb-bb77-41e7-ae08-076453fa07ca	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_1_thumbnail
8d562081-78b2-4057-8fed-39a4a9898453	bdec1acb-bb77-41e7-ae08-076453fa07ca	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_2_thumbnail
027e36c6-e423-4869-a56a-ffe40c7a5e5f	bdec1acb-bb77-41e7-ae08-076453fa07ca	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Garmin%20Instinct%202X%20Solar%20-%20Tactical%20Edition_image_3_thumbnail
c6b9c534-f2f4-4065-a10d-f1d695cbdd32	def049c8-0ea5-4c0b-87b7-2806925a65c4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_0_thumbnail
815bb1b3-e78d-48f4-a52b-13b93a7058e9	def049c8-0ea5-4c0b-87b7-2806925a65c4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_1_thumbnail
7dffa920-19aa-4483-ba8e-7bb7c4de6b3d	def049c8-0ea5-4c0b-87b7-2806925a65c4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_2_thumbnail
0096c354-2235-4869-aded-6d66b1e947bd	aeb498e2-9208-4374-9dbb-5d024b2d4220	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_0_thumbnail
9184bffd-5c99-4a74-86a2-447ebcff5683	aeb498e2-9208-4374-9dbb-5d024b2d4220	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_2_thumbnail
cbd498b7-fb5e-415f-a107-9ce1892a9062	aeb498e2-9208-4374-9dbb-5d024b2d4220	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_1_thumbnail
9806538b-640d-49db-b955-a2977f0b67bb	def049c8-0ea5-4c0b-87b7-2806925a65c4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_3_thumbnail
1379a03a-7e4c-4f13-833b-358743d12d83	def049c8-0ea5-4c0b-87b7-2806925a65c4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/COROS%20PACE%203%20GPS%20Sport%20Watch_image_4_thumbnail
1d84acb6-18f2-4bcd-8bdf-c79a796042d7	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_0_thumbnail
b81a5a37-8710-4914-ada2-aeb01b5eda97	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_1_thumbnail
6e7ea411-9e98-453c-ab61-a5649be243a9	aeb498e2-9208-4374-9dbb-5d024b2d4220	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_3_thumbnail
350f93a2-e06b-4f57-b071-df0435b761fa	aeb498e2-9208-4374-9dbb-5d024b2d4220	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Amazfit%20T-Rex%203%20Outdoor%20Smart%20Watch%20_image_4_thumbnail
a517220a-6019-4370-ab16-f950b2f1132e	42551e2e-c1f8-44bb-bcd8-dd22486ea992	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_0_thumbnail
b0daa233-8f66-424c-8730-9815badf8296	42551e2e-c1f8-44bb-bcd8-dd22486ea992	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_1_thumbnail
eaa4c24b-28c5-4750-99c4-339795055c4e	b0f22f97-445f-495a-9e1c-8d2792fc800a	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_4_thumbnail
e3362463-ebe1-4def-a1a7-e0e046859b57	b0f22f97-445f-495a-9e1c-8d2792fc800a	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_1_thumbnail
635c33e6-523c-49ef-a843-372612fb7819	b0f22f97-445f-495a-9e1c-8d2792fc800a	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_0_thumbnail
49511c0e-1933-4420-ae54-1aeef2c78a11	b0f22f97-445f-495a-9e1c-8d2792fc800a	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_2_thumbnail
64e30a95-9386-475a-82ae-77cbe9aa048d	b0f22f97-445f-495a-9e1c-8d2792fc800a	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOLLE%20Assault%20Backpack_3_thumbnail
cb6d3330-cf74-4b4b-af71-254e603cb7d5	42551e2e-c1f8-44bb-bcd8-dd22486ea992	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_2_thumbnail
61f5fdd9-9914-4f1b-a68c-6241c87cd224	42551e2e-c1f8-44bb-bcd8-dd22486ea992	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SITKA%20Men's%20Hunting%20Pants_image_3_thumbnail
60739243-30f5-4654-98dd-8911e488ce3a	e8179689-dff5-4179-a13d-092afbe851c5	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_0_thumbnail
787c8c10-1a1b-4979-839d-16cae2a3ce6d	e8179689-dff5-4179-a13d-092afbe851c5	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_1_thumbnail
88fbaa53-d524-4cca-9cdf-15a9840db97c	0ca37889-3c98-4945-a870-735dff527022	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_0_thumbnail
ffa16667-f1f7-4e7a-8e99-fe8fd33c4ee1	0ca37889-3c98-4945-a870-735dff527022	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_1_thumbnail
893df208-5fb0-4ca8-aa3c-252e8c27b96b	0ca37889-3c98-4945-a870-735dff527022	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_2_thumbnail
8a0e8610-f449-485f-8811-b56f10c9cb3c	0ca37889-3c98-4945-a870-735dff527022	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/VSGO%20Pocket%20Ranger%20Backpack_image_3_thumbnail
19ad37b2-6768-4357-b704-9687c25886b1	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_2_thumbnail
3b84d108-c7d6-497b-b504-5644203ae6b1	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_3_thumbnail
d956d404-a642-4408-957b-bbd9bd68b6d9	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Insulated%20Pant_image_4_thumbnail
0a4250e9-f989-4573-82e6-4dfd39f76a76	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_0_thumbnail
1cf780b2-b36c-4b08-bd78-e668fa1cafb7	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_1_thumbnail
2f717ba7-c856-4a42-b0bb-8784049ca847	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_2_thumbnail
c11f7e13-e553-4682-b46d-2e66e649a7a6	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Helikon-Tex%20Men%20UTP%20Ripstop%20Pants_image_3_thumbnail
30f6bb64-725f-4acf-9535-838d1d0beb29	fd734d12-8abf-41c1-b10d-c11ccaee006d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_0_thumbnail
d1a2d8ba-be8c-47b2-9449-0aa0756a4973	fd734d12-8abf-41c1-b10d-c11ccaee006d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_1_thumbnail
3984c509-03ba-4ca3-a1bb-5818c6094a3b	fd734d12-8abf-41c1-b10d-c11ccaee006d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_2_thumbnail
14b85726-c9b2-4e01-bb9d-66c122e5ea27	fd734d12-8abf-41c1-b10d-c11ccaee006d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_3_thumbnail
29e2e230-1d18-4c29-bfea-9beec03a1e39	fd734d12-8abf-41c1-b10d-c11ccaee006d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_4_thumbnail
03661ecc-0f8b-492f-b4fd-95a514224822	fd734d12-8abf-41c1-b10d-c11ccaee006d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_5_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_5_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/HAIX%20Scout%202.0%20Ultra%20Durable%20%20Boots_image_5_thumbnail
3789b294-1ec8-40c3-a227-c107b9eed398	00a1f59d-618c-4e28-9c49-06c1fb90c155	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_0_thumbnail
7d4d64bd-7978-4a48-a2e5-6e65357b9e1f	00a1f59d-618c-4e28-9c49-06c1fb90c155	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_1_thumbnail
c799375a-f038-457b-afa2-1ffac51eb1fb	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_3_thumbnail
93555f90-4ac2-420b-a4cb-97f089ac6cf6	1070cd3b-c3a3-4f40-8513-9686cf2c9083	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_0_thumbnail
da9adf83-43f0-4290-8a67-44deb69462fe	1070cd3b-c3a3-4f40-8513-9686cf2c9083	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_1_thumbnail
cfdc7fa1-dcb6-4d62-96cb-64961ab1af19	1070cd3b-c3a3-4f40-8513-9686cf2c9083	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_2_thumbnail
3406858a-6095-462a-896e-0f6fb7943286	1070cd3b-c3a3-4f40-8513-9686cf2c9083	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NEXTORCH%20P91%20Tactical%20Flashlight_image_3_thumbnail
aced10b7-fcd6-415d-85c2-d275f873f030	b10a9534-0b3f-46bd-8c53-bbd6ca671a13	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_0_thumbnail
de7218ec-a9c8-4537-a270-99c7f6671385	b10a9534-0b3f-46bd-8c53-bbd6ca671a13	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_1_thumbnail
89e83a60-1cef-4829-97bd-44e9a9d34197	b10a9534-0b3f-46bd-8c53-bbd6ca671a13	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_2_thumbnail
840973a5-3725-4c2f-bd68-d1d477a0cb35	b10a9534-0b3f-46bd-8c53-bbd6ca671a13	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20P20iX%20Tactical%20Flashlight_image_3_thumbnail
03f6912e-3ebe-4a1c-a4e9-2718fcaf0ac2	2cfb7d29-b15e-404a-b01d-b851a2521400	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_4_thumbnail
dfc09625-bfd2-44c2-a501-364654794cfb	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/FORLOH%20Men's%20BTM%20Pro%20Pant%20_image_4_thumbnail
e4637820-c14b-49a4-a6c6-3fdcb5f3b01a	2cfb7d29-b15e-404a-b01d-b851a2521400	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_0_thumbnail
f2bfe383-d149-4ab1-9ec9-360a14a05657	2cfb7d29-b15e-404a-b01d-b851a2521400	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_1_thumbnail
093c7554-dd80-4cd7-a083-892df3340956	e8179689-dff5-4179-a13d-092afbe851c5	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_2_thumbnail
8d26b5d5-6a46-445f-9c59-226414afd377	e8179689-dff5-4179-a13d-092afbe851c5	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_3_thumbnail
3aecdb7c-6c7d-4de3-bcab-0eab7def3f40	e8179689-dff5-4179-a13d-092afbe851c5	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Danner%20Skyridge%20Hiking%20Boots%20for%20Men_image_4_thumbnail
5162be6d-a702-417a-99b3-a738f5079b19	003faa07-aa20-4eb8-b8b6-d9bf533b081d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_2_thumbnail
690346ac-3d09-47bc-bee7-390b08f739fd	003faa07-aa20-4eb8-b8b6-d9bf533b081d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_3_thumbnail
82945dd0-4dbe-42b8-b37a-1550c8bdc27b	2cfb7d29-b15e-404a-b01d-b851a2521400	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_2_thumbnail
2bdc89a6-912f-40ab-ab9f-dd6d9d2ae720	2cfb7d29-b15e-404a-b01d-b851a2521400	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/OLIGHT%20Seeker%204%20Pro%20Rechargeable%20Flashlight_image_3_thumbnail
7289acff-3dc8-4b5a-a096-18871d272bb4	7bff667c-f977-4e72-b079-3c35609f6cbf	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_0_thumbnail
d1673e3e-aabd-4b06-bb1d-8bdad0c68058	7bff667c-f977-4e72-b079-3c35609f6cbf	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_1_thumbnail
34c167bf-1cb0-4a3c-8548-94ca0c24fcaa	7bff667c-f977-4e72-b079-3c35609f6cbf	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_2_thumbnail
c51ddbdc-4b63-4d2b-ba04-9c0c08de7d9b	7bff667c-f977-4e72-b079-3c35609f6cbf	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_3_thumbnail
afd34635-8bfa-4d99-97f1-9dc6bf28b503	7bff667c-f977-4e72-b079-3c35609f6cbf	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/mazfit%20T-Rex%203%20Pro%20Outdoor%20Smart%20Watch_image_4_thumbnail
f1fce0fe-b85c-4564-bee0-d450b4323f85	1e332cf0-620b-4da1-a283-1b9674b36b3d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_0_thumbnail
c0ee62c4-895d-458f-8923-dadbda74b5f2	1e332cf0-620b-4da1-a283-1b9674b36b3d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_1_thumbnail
d1ef3896-d369-48cd-87d4-f2867f2e80d3	1e332cf0-620b-4da1-a283-1b9674b36b3d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_2_thumbnail
c8e95d7b-f4ad-49d3-ba1a-70e00ba78234	1e332cf0-620b-4da1-a283-1b9674b36b3d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_3_thumbnail
28888213-7aa0-4d3c-8483-cfc94418c171	1e332cf0-620b-4da1-a283-1b9674b36b3d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/THE%20NORTH%20FACE%20Men's%20Freedom%20Pant%20_image_4_thumbnail
a3ed069d-bc8f-461c-9298-3a9a99484d5e	da19b771-4df9-46b3-ac41-48de4fab14dc	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_0_thumbnail
21f282bc-bb06-45a0-a878-af7bef7ed30c	da19b771-4df9-46b3-ac41-48de4fab14dc	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_1_thumbnail
e64786f5-4396-4727-9845-2d9d9e309bca	da19b771-4df9-46b3-ac41-48de4fab14dc	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_2_thumbnail
f3b66f15-92c9-4f1d-b017-696be18f554c	da19b771-4df9-46b3-ac41-48de4fab14dc	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/SHULOOK%20Men's%20Waterproof%20Hiking%20Boots%20_image_3_thumbnail
ae781407-46f0-4aae-ada4-56cdbd3c8bdb	2f9c5917-a52e-430b-a88b-f15e7e104c5d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_0_thumbnail
507a8888-d3d7-4505-ba5e-cc04541e3e73	2f9c5917-a52e-430b-a88b-f15e7e104c5d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_1_thumbnail
833e01d7-ead5-4b18-9060-ca0668d46698	2f9c5917-a52e-430b-a88b-f15e7e104c5d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_2_thumbnail
8e67b63a-ea18-4ef1-939e-f1abdf1761ea	2f9c5917-a52e-430b-a88b-f15e7e104c5d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_3_thumbnail
df1f4d07-e75f-4641-8ccb-4cc36e2b9d78	e2ae736e-464e-47a3-bea4-9b04c39e4eb2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_0_thumbnail
9d64f6d9-8e17-43de-a987-aaae6fab8ed9	e2ae736e-464e-47a3-bea4-9b04c39e4eb2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_1_thumbnail
25933418-2dc6-4f2c-bc5f-c35206726fd2	e2ae736e-464e-47a3-bea4-9b04c39e4eb2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_2_thumbnail
dd105cf5-1f59-4677-96d5-0ddc6b16829a	e2ae736e-464e-47a3-bea4-9b04c39e4eb2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_3_thumbnail
89e69434-5661-4381-bc34-7d360df9903d	e2ae736e-464e-47a3-bea4-9b04c39e4eb2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_4_thumbnail
1be39101-a7aa-4550-8779-c26ba7885571	e2ae736e-464e-47a3-bea4-9b04c39e4eb2	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/4%20Person%20Camping%20Tent_5_thumbnail
97308a02-361a-4122-9f11-c69190af7f6b	6cd34fff-71e2-4244-af48-20a5bcc413a4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_0_thumbnail
3fdc78ed-1d3e-49fb-993e-70b29497cbe8	6cd34fff-71e2-4244-af48-20a5bcc413a4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_1_thumbnail
63f1c6de-eca5-476c-8074-3f2eb15bc677	6cd34fff-71e2-4244-af48-20a5bcc413a4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_2_thumbnail
9d0891a0-88ff-4a19-a386-762cf79e1441	6cd34fff-71e2-4244-af48-20a5bcc413a4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_3_thumbnail
8bfc9a4a-5ab7-4614-9576-0eb8a784d981	2f9c5917-a52e-430b-a88b-f15e7e104c5d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_4_thumbnail
77a55b6e-27a2-4fe7-a2d7-846b038efceb	2f9c5917-a52e-430b-a88b-f15e7e104c5d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_5_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_5_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Merrell%20Men's%20Waterproof%20Hiking%20Boot_image_5_thumbnail
6a1c9208-cbdf-4662-a7f1-e6bf234f30d3	dd790a92-177f-4049-a668-18caafa545f1	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_0_thumbnail
7e06dd56-a5c5-41ff-85da-6b96bb80386c	dd790a92-177f-4049-a668-18caafa545f1	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_1_thumbnail
c27f3b41-cd64-4b4b-8de9-b7f9d9e0184e	dd790a92-177f-4049-a668-18caafa545f1	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_2_thumbnail
7305cce0-a64d-4f31-8409-7add397ff5c8	dd790a92-177f-4049-a668-18caafa545f1	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_3_thumbnail
b225946f-0b2c-4942-8437-eec3488fc5ff	dd790a92-177f-4049-a668-18caafa545f1	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Lighting%20EVER%20LED%20Flashlight_image_4_thumbnail
c6b9194c-2d70-44af-b35c-f14cc138347f	00a1f59d-618c-4e28-9c49-06c1fb90c155	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_2_thumbnail
22557b5a-5f47-44a9-bc07-d2248dc90d5e	00a1f59d-618c-4e28-9c49-06c1fb90c155	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_3_thumbnail
5b9fb71c-33d8-441d-8ee4-567dfff1c961	00a1f59d-618c-4e28-9c49-06c1fb90c155	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/NORTIV%208%20Hiking%20Boots_image_4_thumbnail
17e60083-8646-4020-98fc-5bd1df9a7b5a	7cf49f7c-3217-436b-b265-2686cfac49cb	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_0_thumbnail
db0e9a4d-32de-4da2-a2a1-26e489404f58	7cf49f7c-3217-436b-b265-2686cfac49cb	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_3_thumbnail
46a88f27-48dc-4ec7-829b-ba47544e122f	7cf49f7c-3217-436b-b265-2686cfac49cb	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_4_thumbnail
40ac533e-4b34-4ea8-be3d-3de53154982c	7cf49f7c-3217-436b-b265-2686cfac49cb	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_2_thumbnail
539d1397-32a5-4f26-adde-55614dce1d9c	7cf49f7c-3217-436b-b265-2686cfac49cb	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/CAMPROS%20CP%20Tents_1_thumbnail
f69f4132-8afc-470c-a938-c49b9ac47087	6cd34fff-71e2-4244-af48-20a5bcc413a4	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Coleman%20Sundome%20Camping%20Tent_4_thumbnail
3e782c7f-043c-459e-94a1-3b2a64ba6bd9	003faa07-aa20-4eb8-b8b6-d9bf533b081d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_4_thumbnail
3005bd4a-3ec5-473e-baeb-ca7612a4880f	003faa07-aa20-4eb8-b8b6-d9bf533b081d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_0_thumbnail
8e03b3ab-7c61-4f52-96d1-d6104377290a	003faa07-aa20-4eb8-b8b6-d9bf533b081d	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/Nitecore%20EDC35%205000_image_1_thumbnail
8ffb6cd5-4d93-42bc-b2f8-4c82b9c1f2f1	55d68f8f-9344-4f16-bd67-33c246eb33a0	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_0_thumbnail
76cfb431-359d-4db8-82e5-ec84454bcb42	55d68f8f-9344-4f16-bd67-33c246eb33a0	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_1_thumbnail
0073da5b-c45c-4ee0-ba91-a1508344aa2d	55d68f8f-9344-4f16-bd67-33c246eb33a0	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_5_thumbnail
233d52fb-1955-444f-b75a-08fc185d46aa	55d68f8f-9344-4f16-bd67-33c246eb33a0	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_3_thumbnail
ca4f8d33-bf6a-407d-9453-a314a484dfe2	55d68f8f-9344-4f16-bd67-33c246eb33a0	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_4_thumbnail
6c07f336-af05-4c9d-a35e-5ee5ce799a75	55d68f8f-9344-4f16-bd67-33c246eb33a0	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_main	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_preview	https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/MOUNTAINTOP%2030L%20Hiking%20Backpack_2_thumbnail
\.


--
-- Data for Name: ProductOption; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductOption" (id, "productId", name, "values") FROM stdin;
461c1a33-5751-412a-b6a7-9c24506110f3	1e332cf0-620b-4da1-a283-1b9674b36b3d	Size	["28", "30", "32", "34", "36", "38", "40", "42", "44"]
955aef48-ca5b-42bb-a284-f74809d7cc31	da19b771-4df9-46b3-ac41-48de4fab14dc	Shoe Size	["7", "8", "9", "9.5", "10", "11", "12", "13"]
656a42d5-3a4c-46e8-a00f-725b619abf97	42551e2e-c1f8-44bb-bcd8-dd22486ea992	Size	["28", "30", "32", "34", "36", "38", "40", "42", "44"]
b8853db9-9737-4849-ad16-305c0d13f130	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	Size	["28", "30", "32", "34", "36", "38", "40", "42", "44"]
2aa07e32-3b64-406d-8c5a-200c924f36fd	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	Size	["28", "30", "32", "34", "36", "38", "40", "42", "44"]
c67bb543-ec98-4a99-a4b2-648c55f15f48	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	Size	["28", "30", "32", "34", "36", "38", "40", "42", "44"]
45a5629f-91d5-4b03-9873-d535240a9fbb	e8179689-dff5-4179-a13d-092afbe851c5	Shoe Size	["7", "8", "9", "9.5", "10", "11", "12", "13"]
7367f947-1d4a-4854-9c2a-cab0ea30b430	2f9c5917-a52e-430b-a88b-f15e7e104c5d	Shoe Size	["7", "8", "9", "9.5", "10", "11", "12", "13"]
a3a398df-2f1a-4a47-898c-5e0b1fae8980	fd734d12-8abf-41c1-b10d-c11ccaee006d	Shoe Size	["7", "8", "9", "9.5", "10", "11", "12", "13"]
81f67caf-84d9-43e9-b264-fe0e92c9497e	00a1f59d-618c-4e28-9c49-06c1fb90c155	Shoe Size	["7", "8", "9", "9.5", "10", "11", "12", "13"]
\.


--
-- Data for Name: ProductOptionsPreset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductOptionsPreset" (id, name, options) FROM stdin;
121f4544-0d7a-493d-87e0-53da786f3d27	Shoe Size	[{"name": "Shoe Size", "values": ["7", "8", "9", "9.5", "10", "11", "12", "13"]}]
14ff8658-98a2-4fad-b844-b40b42018a12	Pants Sizes	[{"name": "Size", "values": ["28", "30", "32", "34", "36", "38", "40", "42", "44"]}]
\.


--
-- Data for Name: ProductReview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductReview" (id, "userId", "productId", rating, comment, status, "helpfulCount", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ProductTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductTag" (id, "productId", name, color, "textColor") FROM stdin;
f2d90042-a58a-451e-ae50-ddbbcd02176e	e2ae736e-464e-47a3-bea4-9b04c39e4eb2	Popular!	#478d03	#eefff1
0b1faa95-0f54-49a3-8500-00fc968e0d28	e8179689-dff5-4179-a13d-092afbe851c5	Popular!	#478d03	#eefff1
fdf6fe58-4915-4bda-a7ab-77441886f6d4	2286f8e2-2206-4b7b-914c-ce2c74ee1538	Popular!	#478d03	#eefff1
8e1b3171-8380-42da-b521-df1adbd04d67	2cfb7d29-b15e-404a-b01d-b851a2521400	Popular!	#478d03	#eefff1
\.


--
-- Data for Name: ProductTagPreset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductTagPreset" (id, name, color, "textColor") FROM stdin;
aa251df9-53e8-491b-b73a-b0ef867c0ba5	Popular!	#478d03	#eefff1
\.


--
-- Data for Name: ProductVariant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductVariant" (id, "productId", options, price, stock) FROM stdin;
163478a3-6569-43fe-96d1-7a5fb2b6c695	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:28"]	\N	99
d3167763-f12b-4155-ac5d-5a9ddd946c91	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:30"]	\N	99
aed304d1-327c-4028-a95d-8a3177696229	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:32"]	\N	99
c49f7c8b-e4ee-4aaa-8e33-6ba372369f7b	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:34"]	\N	0
7e63efe4-af94-47ef-b346-d5b78b58f64b	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:36"]	\N	99
9d760deb-54b3-4527-86d9-17e7dfc70931	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:38"]	\N	0
617c8107-3399-4200-8cdd-05b83408ec67	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:40"]	\N	99
03a94664-ee62-4610-8e3b-5a286234f1f0	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:42"]	\N	0
3359b604-dbd5-4d3e-987c-d39e34504b2d	1e332cf0-620b-4da1-a283-1b9674b36b3d	["Size:44"]	\N	99
8ef04955-bb2b-435e-b760-6e84063d8360	da19b771-4df9-46b3-ac41-48de4fab14dc	["Shoe Size:7"]	\N	999
0f47e648-9c1d-42a1-8462-9c96eb03d7d7	da19b771-4df9-46b3-ac41-48de4fab14dc	["Shoe Size:8"]	\N	999
5334819e-00ae-4ea3-b34b-bd76d6936b07	da19b771-4df9-46b3-ac41-48de4fab14dc	["Shoe Size:9"]	\N	999
249a7770-f67e-4722-a4cd-03a67357d209	da19b771-4df9-46b3-ac41-48de4fab14dc	["Shoe Size:9.5"]	\N	999
d374f16d-b691-471a-b345-9bf444ff48f6	da19b771-4df9-46b3-ac41-48de4fab14dc	["Shoe Size:10"]	\N	999
a7dad596-34fa-4a1e-9137-18dca2c01d34	da19b771-4df9-46b3-ac41-48de4fab14dc	["Shoe Size:11"]	\N	999
293e1b11-74ba-463c-91d9-7bc4991ed5d5	da19b771-4df9-46b3-ac41-48de4fab14dc	["Shoe Size:12"]	\N	999
040e8c51-1039-4df7-838f-ccbaaa465dd7	da19b771-4df9-46b3-ac41-48de4fab14dc	["Shoe Size:13"]	\N	999
21cd859c-e6eb-40c1-a543-05d912e2415e	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:28"]	\N	99
5e9ede33-3877-4728-ad67-fa042648e249	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:30"]	\N	99
2c27de26-d400-4944-8ab8-c30ab84c53a4	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:32"]	\N	99
1245c82d-95ad-435b-873d-0b8b4ebd5c73	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:34"]	\N	0
3a99c689-6d42-4cd7-bd17-f0d7b06c2300	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:36"]	\N	99
09c0a014-ea34-44be-990f-a72919c60bd5	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:38"]	\N	0
d5e87403-e80c-4476-891d-40de7b218287	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:40"]	\N	99
8adccb2f-93e8-4733-80e5-6853fdbaf16c	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:42"]	\N	0
0ffecc93-2f9d-45f9-8636-2907bd895e27	42551e2e-c1f8-44bb-bcd8-dd22486ea992	["Size:44"]	\N	99
27f43043-6891-40c1-8f24-f47ed54a78c9	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:28"]	\N	99
3a662ea2-716e-44fc-be8b-76f0b9598640	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:30"]	\N	99
2515f588-072b-4ff2-ba49-0ee9fc331f73	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:32"]	\N	0
1fef9368-eb29-4c44-91d0-ed715c38dfed	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:34"]	\N	9
7195f20b-ee00-4fea-8f59-5d74c86ff75f	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:36"]	\N	99
f0a07cc5-dcad-4542-aaa6-95f8c49e1c09	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:38"]	\N	99
6974919d-849b-4c56-9513-4e3d05807a34	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:40"]	\N	0
38dd2c20-be2e-4d70-b621-d5184713f3d6	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:42"]	\N	99
62096aff-50ec-4ec0-9c06-80a8085c737c	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:28"]	\N	999
5b7a92fb-f55a-422b-aed2-158671d42b00	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:30"]	\N	999
7c155a25-cc4d-4ce5-ae9b-72c5d29711c9	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:32"]	\N	999
3749d5bf-31d6-4f73-a0a9-03d3bc9b69dd	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:34"]	\N	99
8839cbe8-e18b-4956-9049-507d73179a18	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:36"]	\N	999
54cd0566-81e1-4ab5-86c3-55d8e18da294	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:38"]	\N	999
a1413e68-ebc1-44cd-8824-af7eb8f4d1a6	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:40"]	\N	999
f6d8fcc5-e62a-48d5-84ca-86cc595bf5c7	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:42"]	\N	999
8ea687d9-d328-486a-b866-57c1ba06404d	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2	["Size:44"]	\N	999
8fd95a20-c4f2-450e-b4ef-94d5ed030eae	e8179689-dff5-4179-a13d-092afbe851c5	["Shoe Size:7"]	\N	999
182b36b7-c02a-4431-8898-4015f5a6abc7	e8179689-dff5-4179-a13d-092afbe851c5	["Shoe Size:8"]	\N	999
241baed7-6c1f-41f7-85ad-02ad43031d34	e8179689-dff5-4179-a13d-092afbe851c5	["Shoe Size:9"]	\N	999
0b4995a6-6503-4627-bd4b-0099189d4a3d	e8179689-dff5-4179-a13d-092afbe851c5	["Shoe Size:9.5"]	\N	999
d9afcee0-3585-4724-b7fc-5eb61918b4ae	e8179689-dff5-4179-a13d-092afbe851c5	["Shoe Size:10"]	\N	999
0d437db4-9d71-4dc7-b501-ee7734b52ccd	e8179689-dff5-4179-a13d-092afbe851c5	["Shoe Size:11"]	\N	999
7d2a0944-ec9f-4d02-bd77-36f9783bb802	e8179689-dff5-4179-a13d-092afbe851c5	["Shoe Size:12"]	\N	999
e16be0f7-5aca-48b4-8657-3d29678748ca	e8179689-dff5-4179-a13d-092afbe851c5	["Shoe Size:13"]	\N	999
193eace6-bb87-4fff-a39f-8fd2c016e0df	8aecdb16-2f4c-4d56-bc1a-40795dc8c857	["Size:44"]	\N	99
e5d93028-4fc8-421f-b87c-e5b772af2552	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:28"]	\N	99
dcc3418e-5381-4b25-a2d8-b247466c4c98	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:30"]	\N	0
08ffc0a5-e160-46af-a9c4-f8a60cfb040e	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:32"]	\N	99
27bf9841-ec4b-4e03-a696-8c5ff6bc8d5e	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:34"]	\N	0
89bcd1c5-abe1-4da9-8e15-e8b94c9a0da6	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:36"]	\N	0
365d775b-2af7-4fce-9d89-8902e78cdf93	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:38"]	\N	99
19046d14-3257-4f8f-8896-58e79edb618c	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:40"]	\N	0
721475af-8478-4929-b06e-f67f9beae508	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:42"]	\N	99
0c94e87c-f22e-4142-8966-2ecb68c48169	f5cf2fb3-26f3-48ab-8338-b981a0b682d4	["Size:44"]	\N	99
f0612209-ac7a-4174-884e-63c467e39fea	2f9c5917-a52e-430b-a88b-f15e7e104c5d	["Shoe Size:7"]	\N	999
f6d10826-9397-411d-bc00-7a0142a87fe8	2f9c5917-a52e-430b-a88b-f15e7e104c5d	["Shoe Size:8"]	\N	999
cffee660-fe51-4cd8-b5a5-0ae0f7235489	2f9c5917-a52e-430b-a88b-f15e7e104c5d	["Shoe Size:9"]	\N	999
0b5def5b-97f1-485a-9ac6-8a07cf9bd3e9	2f9c5917-a52e-430b-a88b-f15e7e104c5d	["Shoe Size:9.5"]	\N	999
e87bb1e2-c53a-4c7c-88ee-6c0601e1fe72	2f9c5917-a52e-430b-a88b-f15e7e104c5d	["Shoe Size:10"]	\N	999
6af00fe4-b18e-4079-85b7-2b565098db58	2f9c5917-a52e-430b-a88b-f15e7e104c5d	["Shoe Size:11"]	\N	999
5eaee618-f193-4c59-8e46-bedcb988092c	2f9c5917-a52e-430b-a88b-f15e7e104c5d	["Shoe Size:12"]	\N	999
e998689c-d245-4e15-89cd-71b8ead2f3bd	2f9c5917-a52e-430b-a88b-f15e7e104c5d	["Shoe Size:13"]	\N	999
2253450f-5784-4729-8381-c5e0295bb150	fd734d12-8abf-41c1-b10d-c11ccaee006d	["Shoe Size:7"]	\N	999
f3bc90a3-2d98-4dd4-8c1c-f35bf18b8ec8	fd734d12-8abf-41c1-b10d-c11ccaee006d	["Shoe Size:8"]	\N	999
da2e49f9-6609-42f3-b9b6-97358c1a848d	fd734d12-8abf-41c1-b10d-c11ccaee006d	["Shoe Size:9"]	\N	999
b81ecc93-c640-454d-ad7f-673669764104	fd734d12-8abf-41c1-b10d-c11ccaee006d	["Shoe Size:9.5"]	\N	999
83ac8efb-8b64-42e0-af57-2803052e6824	fd734d12-8abf-41c1-b10d-c11ccaee006d	["Shoe Size:10"]	\N	999
3eefde8f-3b5a-4be5-972e-4c902dad9d34	fd734d12-8abf-41c1-b10d-c11ccaee006d	["Shoe Size:11"]	\N	999
be113fdf-49f2-4c2b-b78e-af84f45553b5	fd734d12-8abf-41c1-b10d-c11ccaee006d	["Shoe Size:12"]	\N	999
23fc8517-75e7-4e2d-ab1c-93a8e138512f	fd734d12-8abf-41c1-b10d-c11ccaee006d	["Shoe Size:13"]	\N	999
d85df113-f2ed-419f-9d8d-7e2fb74521e8	00a1f59d-618c-4e28-9c49-06c1fb90c155	["Shoe Size:7"]	\N	999
af30dc11-e93b-41c6-ac04-f8788a022756	00a1f59d-618c-4e28-9c49-06c1fb90c155	["Shoe Size:8"]	\N	999
bbec0a58-28a4-4301-a5d8-37d82cde8142	00a1f59d-618c-4e28-9c49-06c1fb90c155	["Shoe Size:9"]	\N	999
63b03cb9-5f2c-44e7-b150-23bc3a57f2d9	00a1f59d-618c-4e28-9c49-06c1fb90c155	["Shoe Size:9.5"]	\N	999
53ba695a-39c9-42cf-a607-1f0eaa94073e	00a1f59d-618c-4e28-9c49-06c1fb90c155	["Shoe Size:10"]	\N	999
8359deef-d245-4394-89db-cd056caae34f	00a1f59d-618c-4e28-9c49-06c1fb90c155	["Shoe Size:11"]	\N	999
f3c53069-f2f9-4dda-b384-2d356e2d29df	00a1f59d-618c-4e28-9c49-06c1fb90c155	["Shoe Size:12"]	\N	999
7d2b586a-73f0-4223-8a2c-c29a6395f3a2	00a1f59d-618c-4e28-9c49-06c1fb90c155	["Shoe Size:13"]	\N	999
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, "userId", token, "ipAddress", "userAgent", "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ShippingInfo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ShippingInfo" (id, "orderId", "addressId", "fromAddressId", "shipmentId", tracking, "labelUrl", carrier, method, cost, status, "createdAt", "updatedAt") FROM stdin;
73ac768a-aefb-44e0-a526-c3a41e03f1a8	758a161e-3c61-44a3-8bc1-3ef65a2ba65c	686d6968-ef96-4779-b39d-58f6923d1299	\N	\N	9434600208303110640820	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251018/e8892292dd035347f2a510e3bd3409edc7.png	USPS	\N	\N	unknown	2025-10-18 15:02:05.342	2025-10-18 22:17:32.318
98ecd18f-288d-482e-b08d-db480815dd1e	693d8658-5e84-4716-b81f-ec2db9d590e5	26a26770-8307-4fd3-a55f-4a3b236be934	\N	\N	\N	\N	\N	\N	\N	\N	2025-10-22 01:06:21.414	2025-10-22 01:06:21.414
9d4e9cd3-e244-48d3-ace0-20fdc62837b6	edc3b29a-0a47-49cb-9be5-dadf5223f19c	622018f3-5267-4af9-91fb-5de6ac5d8368	\N	\N	\N	\N	\N	\N	\N	\N	2025-10-22 01:08:22.381	2025-10-22 01:08:22.381
abf40c8d-ab83-4e39-8d11-f01d989164bb	8e9909d8-2e25-4038-ae63-39b4aad1f144	95538f1f-2d6d-4654-a2a2-a11c7e6afc1d	\N	\N	\N	\N	\N	\N	\N	\N	2025-10-22 15:12:23.822	2025-10-22 15:12:23.822
e8787cd4-abc8-4d15-a221-0ff92395ef03	c3316227-1a7c-43d5-8309-125fda440627	4a5fdab3-bec3-44fc-bb24-bc505f0bcbdb	\N	\N	\N	\N	\N	\N	\N	\N	2025-10-22 17:01:58.953	2025-10-22 17:01:58.953
12a0c490-81da-4bc7-9427-cc99816e4394	e0977458-0138-43e2-a6dd-38645dc662ba	341751ff-867e-4fc3-8bfe-0c7765846348	\N	\N	\N	\N	\N	\N	\N	\N	2025-10-22 17:47:42.574	2025-10-22 17:47:42.574
13059167-a72e-492f-8351-365d44c072e0	03224cd1-5454-4de6-9037-d31ac972ebcd	9ff0c01a-bb72-439e-bd8d-9234382482f9	\N	\N	9434600208303110683971	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251022/e8b98d60c47de2452fa1b45106ffda74f4.png	USPS	\N	\N	unknown	2025-10-22 17:11:06.449	2025-10-22 20:03:34.041
9f033d95-c196-4739-b905-3538b39c170e	b0a83e43-f6e4-47a5-8b43-76fa0a6c6873	284d0184-bd8c-4b4d-8b37-6aad731507c6	\N	\N	9434600208303110683988	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251022/e8e9f40a0888e54665ac0623720ed6c71f.png	USPS	\N	\N	unknown	2025-10-22 17:08:38.886	2025-10-22 20:04:05.103
648359f5-aff4-4c93-8f1a-ffb0b959a667	6f540d58-397a-43bf-accb-186247bf8cef	eedd89c2-e38d-4fdb-9bc3-ea896ea56ded	\N	\N	9434600208303110683995	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251022/e82e5b471f4e3d482998f84f8c9de568e4.png	USPS	\N	\N	unknown	2025-10-22 18:08:49.746	2025-10-22 20:04:07.706
bc3e2b30-f1bd-4d77-bf8f-541682aa5768	ff0fa19c-6dc9-4a0a-aa2d-c33b87d4e766	fd6af52e-b08a-4799-97ac-777c98848de5	\N	\N	9434600208303110684008	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251022/e8c4f9f0c8cfe54efeac9563a5f1a7231b.png	USPS	\N	\N	unknown	2025-10-22 01:11:01.894	2025-10-22 20:04:09.483
aaef1751-0dc0-4d2f-a213-3beb887bc272	06c5eebd-2df9-4a6a-9262-4f74dcc7dfce	db9d3a70-8640-431d-a4d4-66a3fc66072e	\N	\N	9434600208303110684015	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251022/e8e83ece00f10443368f01f3b2f607a4fb.png	USPS	\N	\N	unknown	2025-10-22 19:15:45.86	2025-10-22 20:04:20.145
f9a2ada7-5d8f-427a-838a-8f9049efaa5c	9ba49219-dfcd-4e4f-815d-c39c424cee81	c7aa3d1e-fb64-4a61-8c47-267f701eb980	\N	\N	9434600208303110685227	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251023/e8b1b40a19126b42289dcaaf62a29e0785.png	USPS	\N	\N	unknown	2025-10-23 01:08:03.475	2025-10-23 01:08:29.818
b03fe778-40ab-4c80-85f6-ea54cf200e24	3342c166-ffeb-4023-a008-5ca29dd66969	23203d0e-5c3b-437c-821c-a33d0bd630cc	\N	\N	9434600208303110698968	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e88c0c1d7f55464d7292a20e2b7e49fb28.png	USPS	\N	\N	unknown	2025-10-24 01:17:58.844	2025-10-24 22:31:39.316
f42c9d74-52ad-4132-a89c-ab56012b933d	8450d737-67ca-4ff8-8a93-afe08e29f10f	3f236a58-f58a-4736-b68c-861535107964	\N	\N	9434600208303110699156	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e8cb952c48839149efa5a278df52021778.png	USPS	\N	\N	unknown	2025-10-23 17:17:56.194	2025-10-24 22:47:08.983
dbbc9b09-ea3f-40c1-b615-8a32c9c0df87	b710d8d5-3750-49ca-ae3e-0da70432d6e1	8a56b8ce-c878-465f-ace0-d13fa4b13840	\N	\N	9434600208303110699743	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e83ec558e6809246ad89b464aef7865375.png	USPS	\N	\N	unknown	2025-10-23 15:52:56.293	2025-10-24 23:35:45.036
e7c3daba-ccce-4e15-a020-4d10667e94de	9f46afa6-1a20-4442-b6b3-c5f1a5c8b9bf	5b4c72b8-8408-441b-b8af-c93929ded195	\N	\N	9434600208303110699514	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e85086b3404c504ab685a119bbac768158.png	USPS	\N	\N	unknown	2025-10-23 17:16:09.453	2025-10-24 23:18:18.361
847b152c-09ef-4dda-8628-02c19885eaa1	d6cb61f3-482b-470e-b5d5-c8aa5683ad1d	7b8bb315-7cd5-4791-a0b5-b51d7266d68c	\N	\N	9434600208303110700418	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251025/e8f0b4d6be1feb4902b04ad6d3e70ba01b.png	USPS	\N	\N	unknown	2025-10-22 19:14:51.199	2025-10-25 01:44:03.878
320114d6-793f-4432-a3e2-be0b960f439b	151762cc-bdca-4882-89ff-ce00a3131fef	922d8f95-bf23-41f0-9734-134016fa464d	\N	\N	9434600208303110699149	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e8e42b5a65b7554b0ebd7c35eea0ac9a0a.png	USPS	\N	\N	unknown	2025-10-23 17:00:48.203	2025-10-24 22:47:00.381
5068c8c1-3044-463b-8abe-bf94543228a0	66ae4502-ab43-49ab-aafc-839a12e8b493	af404f8b-cb78-46c3-a761-8b0b5385fd79	\N	\N	9434600208303110699552	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e89bacdd6a68b0470a9de0c78c162600a5.png	USPS	\N	\N	unknown	2025-10-23 15:52:14.431	2025-10-24 23:19:00.561
dfc68ba1-c314-4697-a08e-cbdaae495202	fd9b99da-40ea-4b35-8f4a-ea2e82b37373	39486968-a901-4245-b56b-ce971e6fb446	\N	\N	9434600208303110699590	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e86d21914bc9aa40398853af27fcf58af8.png	USPS	\N	\N	unknown	2025-10-23 02:11:23.408	2025-10-24 23:20:16.222
093684f0-61a5-479c-a5a7-10886ee75735	12683c88-2426-4307-b898-d4a4d4030e2b	2e641772-87c7-472c-986d-a24af12f35d0	\N	\N	9434600208303110699606	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e8877efa254575463ea715c7efa3a3c746.png	USPS	\N	\N	unknown	2025-10-23 00:52:57.647	2025-10-24 23:20:30.259
39c15926-817b-4609-a64e-8563623994a6	04c97f3b-7a06-4859-9588-4d05704924f5	fbad87cc-8c64-4d2d-b594-df7e003de807	\N	\N	9434600208303110699583	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e8df642c3d9d1a4813a21790eefa05cdeb.png	USPS	\N	\N	unknown	2025-10-23 15:54:42.877	2025-10-24 23:20:06.976
2f8fcbf1-7f3a-42b4-919f-60434c0cc269	701c9b99-7d6a-47f9-8bc9-cecd2bf9a24d	0a1af156-1921-4de5-95ae-93be264f4e6f	\N	\N	9434600208303110699002	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e82b82e3694a62468e861105b9f9b6d7d6.png	USPS	\N	\N	unknown	2025-10-24 20:31:17.242	2025-10-24 22:33:42.277
8dc41a7c-673b-4b42-8b88-83fddbfdceb1	5596fb59-e0a1-4480-928e-9186e4af9ba0	6a1a8913-d87a-4d61-b364-84729e637e43	\N	\N	9434600208303110699774	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251024/e80fe675ff70b74ff4a353dc9bac0f13ab.png	USPS	\N	\N	unknown	2025-10-22 19:15:08.983	2025-10-24 23:36:16.158
85b84c87-25b9-44d1-9b30-db51419c7be8	e1a7fb4c-4c07-419c-a3a0-0620b5e6d8f8	c87c10e7-345c-41bf-bffd-646cea16bd85	\N	\N	9434600208303110701538	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251025/e8e57ad287ee29480e9b1a55f897eec048.png	USPS	\N	\N	unknown	2025-10-22 19:11:34.581	2025-10-25 20:06:26.514
84e22a67-3e1c-4f8c-8f8f-bd0f85634286	9a596e9b-9688-4011-9970-e049db132e4f	37439b78-4704-4771-9826-9286b4e43ca5	\N	\N	9434600208303110701545	https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20251025/e8c86d12132099414fa83e6c36b37ae392.png	USPS	\N	\N	unknown	2025-10-22 19:13:31.23	2025-10-25 20:06:29.958
\.


--
-- Data for Name: ShippingStatusHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ShippingStatusHistory" (id, "shippingInfoId", status, "timestamp") FROM stdin;
\.


--
-- Data for Name: StockMovement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StockMovement" (id, "productId", quantity, type, "timestamp", notes) FROM stdin;
\.


--
-- Data for Name: SystemSettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SystemSettings" (id, scope, settings, "createdAt", "updatedAt") FROM stdin;
8c41c623-00f9-47fe-a69b-90957d2d2c9f	ENGINE	{"cacheTTL": 3600, "customJS": "", "timezone": "America/New_York", "customCSS": "", "dateFormat": "MM/DD/YYYY", "timeFormat": "12h", "environment": "development", "featureFlags": {"darkMode": false, "newCheckout": false}, "paypalSecret": "", "backupEnabled": true, "maxUploadSize": 10000000, "easyPostAPIKey": "", "internalAPIKey": "", "paypalClientID": "", "rateLimitPerIP": 100, "requestTimeout": 30000, "sendGridAPIKey": "", "sessionTimeout": 3600, "defaultLanguage": "en-US", "enableDebugLogs": true, "mailchimpAPIKey": "", "maintenanceMode": false, "stripePublicKey": "", "stripeSecretKey": "", "logRetentionDays": 30, "maxConcurrentJobs": 10, "autoCleanupEnabled": true, "maintenanceMessage": "", "externalServiceKeys": {}, "backupFrequencyHours": 24, "queueProcessingEnabled": true}	2025-10-18 01:47:04.224	2025-10-18 21:22:56.738
ebc7a7c7-11d8-4dda-99da-48c9755ecb31	ADMIN	{"customJS": "", "hotjarID": "", "siteOpen": true, "timezone": "America/New_York", "customCSS": "", "adminEmail": "admin@mystore.com", "adminPhone": "+1-555-0000", "dateFormat": "MM/DD/YYYY", "footerText": "© 2025 My Online Store. All rights reserved.", "timeFormat": "12h", "carrierRates": {"UPS": 700, "FedEx": 800}, "featureFlags": {"darkMode": false, "newCheckout": false}, "paypalSecret": "", "supportEmail": "support@mystore.com", "supportPhone": "+1-555-1111", "easyPostAPIKey": "", "paymentMethods": ["CREDIT_CARD", "PAYPAL"], "paypalClientID": "", "shippingOrigin": {"city": "WASHINGTON", "name": "TRAILSUPPLY CO", "email": "WAREHOUSE@TRAILSUPPLYCO.COM", "state": "DC", "country": "US", "street1": "1600 PENNSYLVANIA AVE NW # 4B", "postalCode": "20500-0005"}, "defaultLanguage": "en-US", "facebookPixelID": "", "maintenanceMode": false, "stripePublicKey": "", "stripeSecretKey": "", "superAdminEmails": ["owner@mystore.com"], "googleAnalyticsID": "", "maintenanceMessage": "", "notificationEmails": ["orders@mystore.com", "support@mystore.com"], "supportedLanguages": ["en-US", "es-MX"], "defaultShippingRate": 500, "defaultPaymentMethod": "CREDIT_CARD", "customTrackingScripts": [], "defaultShippingMethod": "Standard", "freeShippingThreshold": 5000, "orderProcessingEnabled": true, "userRegistrationEnabled": true}	2025-10-18 01:47:04.06	2025-10-24 22:28:37.257
be790c41-0a05-46e5-ad36-a8a31056bfa6	SITE	{"logoURL": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/site-logo.png?v=1761350309997", "taxRate": 650, "bodyFont": "Verdana, sans-serif", "customJS": "", "fontSize": 16, "siteLogo": null, "siteName": "TrailSupplyCo", "timezone": "America/New_York", "bannerURL": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/site-banner.png?v=1761350309997", "customCSS": "", "metaTitle": "My Online Store", "textColor": "#333333", "dateFormat": "MM/DD/YYYY", "faviconURL": "/assets/favicon.ico", "fontFamily": "Arial, sans-serif", "footerText": "© 2025 My Online Store. All rights reserved.", "timeFormat": "12h", "accentColor": "#9CBF88", "borderColor": "#D7D9C9", "headingFont": "Arial, sans-serif", "shadowDepth": 4, "siteIconURL": "https://xbbovndnldxrkoozastv.supabase.co/storage/v1/object/public/gshop-public/site-icon.png?v=1761350309997", "siteTagline": "Quality products, fast delivery, great prices!", "borderRadius": 4, "contactEmail": "info@mystore.com", "contactPhone": "+1-555-1234", "featureFlags": {"darkMode": false, "newCheckout": false}, "itemsPerPage": 12, "maxCartItems": 50, "metaKeywords": ["online store", "shopping", "ecommerce", "products"], "primaryColor": "#4B6330", "supportEmail": "support@mystore.com", "supportPhone": "+1-555-5678", "surfaceColor": "#FFFFFF", "tiktokHandle": "myStoreTT", "backgroundAlt": "#E6E8DE", "bannerMessage": "Free shipping on orders over $200!", "enableCoupons": true, "enableReviews": true, "twitterHandle": "myStoreTW", "youtubeHandle": "myStoreYT", "contactAddress": "123 Main St, Anytown, USA", "enableWishlist": true, "facebookHandle": "myStoreFB", "linkedinHandle": "myStoreLI", "paymentMethods": ["CREDIT_CARD", "PAYPAL"], "secondaryColor": "#6B8450", "backgroundColor": "#F5F6F2", "cookiePolicyURL": "/cookies", "defaultCurrency": "USD", "defaultLanguage": "en-US", "enableGiftCards": false, "foregroundColor": "#2B3A2F", "instagramHandle": "myStoreIG", "liveChatEnabled": true, "maintenanceMode": false, "metaDescription": "Shop the best products online with fast shipping.", "pinterestHandle": "myStorePT", "siteDescription": "The best place to buy tactical camping gear.", "surfaceAltColor": "#ffffff", "aboutPageContent": "<h1 style=\\"font-size: 2.5em; font-weight: bold; color: #2c3e50; margin-bottom: 2rem;\\">About Us</h1>\\n\\n<p style=\\"font-size: 1.125em; max-width: 40rem; margin: 0 auto 1rem auto; line-height: 1.6;\\">\\n  Welcome to our tactical camping gear shop! We are a dedicated team of outdoor enthusiasts committed to bringing you the best gear for your adventures. Our mission started with a simple idea: to create a trusted source for high-quality, durable, and practical camping equipment.\\n</p>\\n\\n<p style=\\"font-size: 1.125em; max-width: 40rem; margin: 0 auto 1rem auto; line-height: 1.6;\\">\\n  Our goal is to equip adventurers of all levels with gear that performs in the toughest conditions. From backpacks and tents to survival tools and accessories, we carefully select each product for its reliability, functionality, and durability in the outdoors.\\n</p>\\n\\n<p style=\\"font-size: 1.125em; max-width: 40rem; margin: 0 auto 1rem auto; line-height: 1.6;\\">\\n  We are passionate about providing an exceptional shopping experience. That’s why we prioritize excellent customer service, fast shipping, and a secure checkout process. Our team is always ready to assist you with any questions or gear advice you might need.\\n</p>\\n\\n<p style=\\"font-size: 1.125em; max-width: 40rem; margin: 0 auto 1rem auto; line-height: 1.6;\\">\\n  Thank you for trusting us with your outdoor adventures. We’re excited to help you explore safely and confidently with the best tactical camping gear available!\\n</p>\\n", "flatShippingRate": 3999, "privacyPolicyURL": "/privacy", "openGraphImageURL": "/assets/og-image.jpg", "termsOfServiceURL": "/terms", "backgroundAltColor": "#ffffff", "foregroundAltColor": "#ffffff", "maintenanceMessage": "", "otherSocialHandles": [], "supportedLanguages": ["en-US", "es-MX"], "enableSubscriptions": false, "homePageCollections": [{"id": "cb2df478-ae63-4e4d-8502-7b4e23d20899", "name": "Top Sellers"}, {"id": "ecbbf162-5e81-4c5f-a01c-efbd9b1511a0", "name": "Sale & Clearance"}, {"id": "26251ea7-8d4b-40c2-a5f1-01531daf0b81", "name": "Featured Items"}], "twitterCardImageURL": "/assets/twitter-card.jpg", "carrierShippingRates": {"UPS": 700, "FedEx": 800}, "defaultPaymentMethod": "CREDIT_CARD", "defaultShippingMethod": "Standard", "freeShippingThreshold": 20000}	2025-10-18 01:47:03.888	2025-10-24 23:58:31.569
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transaction" (id, "orderId", amount, currency, method, status, "gatewayResponse") FROM stdin;
27c4b80c-38f5-40af-968a-878d546136d9	3342c166-ffeb-4023-a008-5ca29dd66969	26494	USD	STRIPE	PENDING	null
b9a8f675-f41c-4b2f-af07-7361989eaeb4	151762cc-bdca-4882-89ff-ce00a3131fef	51290	USD	STRIPE	PENDING	null
3f93c0d2-3951-4d59-b0c7-378f90850164	8450d737-67ca-4ff8-8a93-afe08e29f10f	78586	USD	STRIPE	PENDING	null
28631bca-b9b4-416f-906f-5bc8391f34e0	9f46afa6-1a20-4442-b6b3-c5f1a5c8b9bf	16998	USD	STRIPE	PENDING	null
8ac96734-fd37-4c2c-9d46-a7cb12c8c96b	66ae4502-ab43-49ab-aafc-839a12e8b493	15897	USD	STRIPE	PENDING	null
8ca5c72a-5034-4b3b-bf84-b6e97b8879c3	04c97f3b-7a06-4859-9588-4d05704924f5	43590	USD	STRIPE	PENDING	null
a038dba3-3c82-46f8-9c39-bcaa95829e15	fd9b99da-40ea-4b35-8f4a-ea2e82b37373	4299	USD	STRIPE	PENDING	null
45691de3-fe5d-40b5-8ac6-aaa90d76ea20	12683c88-2426-4307-b898-d4a4d4030e2b	196776	USD	STRIPE	PENDING	null
0fe61f1d-866a-489b-9eeb-d4158ad3ce16	701c9b99-7d6a-47f9-8bc9-cecd2bf9a24d	25796	USD	STRIPE	PENDING	null
23af5b83-b35e-4285-afd0-b38a37e8f678	b710d8d5-3750-49ca-ae3e-0da70432d6e1	87180	USD	STRIPE	PENDING	null
885b1d0b-c0cd-4682-b7aa-6b55bc994aff	5596fb59-e0a1-4480-928e-9186e4af9ba0	19999	USD	STRIPE	PENDING	null
3da2adc3-3ff9-4599-8e58-cb5174e30224	d6cb61f3-482b-470e-b5d5-c8aa5683ad1d	6298	USD	STRIPE	PENDING	null
c63c62e8-75ed-4088-97f1-0169d8a4e041	758a161e-3c61-44a3-8bc1-3ef65a2ba65c	4000	USD	STRIPE	PENDING	null
6e11017a-a65a-4f16-bc39-f6cd0924fcdc	693d8658-5e84-4716-b81f-ec2db9d590e5	19999	USD	STRIPE	PENDING	\N
2abd8375-2916-4d1d-97dc-85a41a69f3cc	edc3b29a-0a47-49cb-9be5-dadf5223f19c	19999	USD	STRIPE	PENDING	\N
45a43b10-99b6-4199-9282-aa1023688a73	8e9909d8-2e25-4038-ae63-39b4aad1f144	6298	USD	STRIPE	PENDING	\N
032283af-0eac-4870-81c0-1c355e5286e3	c3316227-1a7c-43d5-8309-125fda440627	52594	USD	STRIPE	PENDING	\N
7041e0ef-8e3b-4b82-a5e1-049c2e96c414	e0977458-0138-43e2-a6dd-38645dc662ba	6298	USD	STRIPE	PENDING	\N
1a58d17b-6080-442a-af68-0f85b18c41ee	03224cd1-5454-4de6-9037-d31ac972ebcd	6298	USD	STRIPE	PENDING	null
0f0f483e-97b2-4098-aced-86f72ea43327	b0a83e43-f6e4-47a5-8b43-76fa0a6c6873	52594	USD	STRIPE	PENDING	null
a1f6eb0d-3e31-424f-8dad-c4b68d26e885	6f540d58-397a-43bf-accb-186247bf8cef	6298	USD	STRIPE	PENDING	null
d050fcb9-60a1-4ab4-bd78-4cce4f059b25	ff0fa19c-6dc9-4a0a-aa2d-c33b87d4e766	19999	USD	STRIPE	PENDING	null
384eac66-0bac-4678-b9c8-eb53745e1054	06c5eebd-2df9-4a6a-9262-4f74dcc7dfce	19999	USD	STRIPE	PENDING	null
6a6769a6-9ed1-4631-8736-1f9ea2bac645	9ba49219-dfcd-4e4f-815d-c39c424cee81	120282	USD	STRIPE	PENDING	null
ea2fa485-80ca-4b6a-a161-23a8baab0bbb	e1a7fb4c-4c07-419c-a3a0-0620b5e6d8f8	47800	USD	STRIPE	PENDING	null
b5febca0-dd8a-458a-8784-f93468322ec3	9a596e9b-9688-4011-9970-e049db132e4f	6298	USD	STRIPE	PENDING	null
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, "passwordHash", "firstName", "lastName", phone, role, "isVerified", "lastLogin", "failedLoginAttempts", settings, "createdAt", "updatedAt") FROM stdin;
b69b0b2f-141d-4468-8680-b23afe12fea9	jaymikemill@gmail.com	$argon2id$v=19$m=65536,t=3,p=1$Rr9TFYgMYwi7cRcA2G00wg$EsxHmsU91D1xKeyKc9Cv4d0apCKlbONgFlPQiwaDdTQ	Jason	Millis	\N	SITE_OWNER	f	\N	0	null	2025-10-18 01:50:06.693	2025-10-18 01:50:06.693
11d8905a-1a0d-4ad4-a1cc-6f5ac038c812	demosite@gmail.com	$argon2id$v=19$m=65536,t=3,p=1$XlbGCpJ5tMbYmJPS65ynTQ$vRaM0Tnx0r/w4ph37YDTW1JCtsF5RLc1CJBPLCh87AA	Demo	Site		ADMIN	f	\N	0	\N	2025-10-25 19:58:31.249	2025-10-25 19:58:31.249
\.


--
-- Data for Name: UserPaymentMethod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserPaymentMethod" (id, "userId", type, last4, expiry, "providerToken") FROM stdin;
\.


--
-- Data for Name: _ProductCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ProductCategories" ("A", "B") FROM stdin;
574f40ca-014f-4f0c-b477-477de899bf2d	6cd34fff-71e2-4244-af48-20a5bcc413a4
574f40ca-014f-4f0c-b477-477de899bf2d	e2ae736e-464e-47a3-bea4-9b04c39e4eb2
574f40ca-014f-4f0c-b477-477de899bf2d	7727922d-bb16-453b-bd6d-62dc45880057
574f40ca-014f-4f0c-b477-477de899bf2d	e10e7d79-138d-4b23-a511-831ce674c392
574f40ca-014f-4f0c-b477-477de899bf2d	7cf49f7c-3217-436b-b265-2686cfac49cb
4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9	55d68f8f-9344-4f16-bd67-33c246eb33a0
4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9	b0f22f97-445f-495a-9e1c-8d2792fc800a
4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9	2286f8e2-2206-4b7b-914c-ce2c74ee1538
4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9	3b0f3e9a-6edc-46de-9335-6c99d6f02100
4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9	0ca37889-3c98-4945-a870-735dff527022
4fc3c7b7-fbb1-49f7-b215-3f3de6ea09c9	ae192202-e9f2-43fd-b372-78de9ab2ac03
f2a2d096-f617-45ea-9971-6246b2f872ac	dd790a92-177f-4049-a668-18caafa545f1
f2a2d096-f617-45ea-9971-6246b2f872ac	1070cd3b-c3a3-4f40-8513-9686cf2c9083
f2a2d096-f617-45ea-9971-6246b2f872ac	b10a9534-0b3f-46bd-8c53-bbd6ca671a13
f2a2d096-f617-45ea-9971-6246b2f872ac	2cfb7d29-b15e-404a-b01d-b851a2521400
f2a2d096-f617-45ea-9971-6246b2f872ac	003faa07-aa20-4eb8-b8b6-d9bf533b081d
36841477-3922-4b73-997a-60c6b924c942	00a1f59d-618c-4e28-9c49-06c1fb90c155
36841477-3922-4b73-997a-60c6b924c942	da19b771-4df9-46b3-ac41-48de4fab14dc
36841477-3922-4b73-997a-60c6b924c942	fd734d12-8abf-41c1-b10d-c11ccaee006d
36841477-3922-4b73-997a-60c6b924c942	2f9c5917-a52e-430b-a88b-f15e7e104c5d
36841477-3922-4b73-997a-60c6b924c942	e8179689-dff5-4179-a13d-092afbe851c5
25fa6984-3a8f-48d3-be05-eaa87c2d75aa	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2
25fa6984-3a8f-48d3-be05-eaa87c2d75aa	f5cf2fb3-26f3-48ab-8338-b981a0b682d4
25fa6984-3a8f-48d3-be05-eaa87c2d75aa	8aecdb16-2f4c-4d56-bc1a-40795dc8c857
25fa6984-3a8f-48d3-be05-eaa87c2d75aa	1e332cf0-620b-4da1-a283-1b9674b36b3d
25fa6984-3a8f-48d3-be05-eaa87c2d75aa	42551e2e-c1f8-44bb-bcd8-dd22486ea992
ae16210b-5967-4b73-8ed6-1e4ce664d1fb	7bff667c-f977-4e72-b079-3c35609f6cbf
ae16210b-5967-4b73-8ed6-1e4ce664d1fb	def049c8-0ea5-4c0b-87b7-2806925a65c4
ae16210b-5967-4b73-8ed6-1e4ce664d1fb	bdec1acb-bb77-41e7-ae08-076453fa07ca
ae16210b-5967-4b73-8ed6-1e4ce664d1fb	d9b702e7-4564-49ad-9522-f256a1e1406c
ae16210b-5967-4b73-8ed6-1e4ce664d1fb	aeb498e2-9208-4374-9dbb-5d024b2d4220
\.


--
-- Data for Name: _ProductCollections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ProductCollections" ("A", "B") FROM stdin;
cb2df478-ae63-4e4d-8502-7b4e23d20899	b0f22f97-445f-495a-9e1c-8d2792fc800a
26251ea7-8d4b-40c2-a5f1-01531daf0b81	b0f22f97-445f-495a-9e1c-8d2792fc800a
cb2df478-ae63-4e4d-8502-7b4e23d20899	55d68f8f-9344-4f16-bd67-33c246eb33a0
26251ea7-8d4b-40c2-a5f1-01531daf0b81	55d68f8f-9344-4f16-bd67-33c246eb33a0
26251ea7-8d4b-40c2-a5f1-01531daf0b81	7cf49f7c-3217-436b-b265-2686cfac49cb
26251ea7-8d4b-40c2-a5f1-01531daf0b81	e10e7d79-138d-4b23-a511-831ce674c392
26251ea7-8d4b-40c2-a5f1-01531daf0b81	7727922d-bb16-453b-bd6d-62dc45880057
26251ea7-8d4b-40c2-a5f1-01531daf0b81	e2ae736e-464e-47a3-bea4-9b04c39e4eb2
26251ea7-8d4b-40c2-a5f1-01531daf0b81	6cd34fff-71e2-4244-af48-20a5bcc413a4
cb2df478-ae63-4e4d-8502-7b4e23d20899	7cf49f7c-3217-436b-b265-2686cfac49cb
cb2df478-ae63-4e4d-8502-7b4e23d20899	e10e7d79-138d-4b23-a511-831ce674c392
cb2df478-ae63-4e4d-8502-7b4e23d20899	7727922d-bb16-453b-bd6d-62dc45880057
cb2df478-ae63-4e4d-8502-7b4e23d20899	e2ae736e-464e-47a3-bea4-9b04c39e4eb2
cb2df478-ae63-4e4d-8502-7b4e23d20899	6cd34fff-71e2-4244-af48-20a5bcc413a4
cb2df478-ae63-4e4d-8502-7b4e23d20899	2286f8e2-2206-4b7b-914c-ce2c74ee1538
26251ea7-8d4b-40c2-a5f1-01531daf0b81	2286f8e2-2206-4b7b-914c-ce2c74ee1538
cb2df478-ae63-4e4d-8502-7b4e23d20899	3b0f3e9a-6edc-46de-9335-6c99d6f02100
cb2df478-ae63-4e4d-8502-7b4e23d20899	0ca37889-3c98-4945-a870-735dff527022
26251ea7-8d4b-40c2-a5f1-01531daf0b81	0ca37889-3c98-4945-a870-735dff527022
cb2df478-ae63-4e4d-8502-7b4e23d20899	ae192202-e9f2-43fd-b372-78de9ab2ac03
cb2df478-ae63-4e4d-8502-7b4e23d20899	dd790a92-177f-4049-a668-18caafa545f1
cb2df478-ae63-4e4d-8502-7b4e23d20899	1070cd3b-c3a3-4f40-8513-9686cf2c9083
cb2df478-ae63-4e4d-8502-7b4e23d20899	b10a9534-0b3f-46bd-8c53-bbd6ca671a13
26251ea7-8d4b-40c2-a5f1-01531daf0b81	b10a9534-0b3f-46bd-8c53-bbd6ca671a13
26251ea7-8d4b-40c2-a5f1-01531daf0b81	003faa07-aa20-4eb8-b8b6-d9bf533b081d
26251ea7-8d4b-40c2-a5f1-01531daf0b81	00a1f59d-618c-4e28-9c49-06c1fb90c155
cb2df478-ae63-4e4d-8502-7b4e23d20899	da19b771-4df9-46b3-ac41-48de4fab14dc
26251ea7-8d4b-40c2-a5f1-01531daf0b81	da19b771-4df9-46b3-ac41-48de4fab14dc
cb2df478-ae63-4e4d-8502-7b4e23d20899	fd734d12-8abf-41c1-b10d-c11ccaee006d
cb2df478-ae63-4e4d-8502-7b4e23d20899	f7b4d9df-eaf0-4788-ba5f-189f0d19acf2
26251ea7-8d4b-40c2-a5f1-01531daf0b81	f5cf2fb3-26f3-48ab-8338-b981a0b682d4
26251ea7-8d4b-40c2-a5f1-01531daf0b81	7bff667c-f977-4e72-b079-3c35609f6cbf
cb2df478-ae63-4e4d-8502-7b4e23d20899	def049c8-0ea5-4c0b-87b7-2806925a65c4
26251ea7-8d4b-40c2-a5f1-01531daf0b81	def049c8-0ea5-4c0b-87b7-2806925a65c4
cb2df478-ae63-4e4d-8502-7b4e23d20899	bdec1acb-bb77-41e7-ae08-076453fa07ca
cb2df478-ae63-4e4d-8502-7b4e23d20899	aeb498e2-9208-4374-9dbb-5d024b2d4220
26251ea7-8d4b-40c2-a5f1-01531daf0b81	aeb498e2-9208-4374-9dbb-5d024b2d4220
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	aeb498e2-9208-4374-9dbb-5d024b2d4220
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	7bff667c-f977-4e72-b079-3c35609f6cbf
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	1e332cf0-620b-4da1-a283-1b9674b36b3d
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	da19b771-4df9-46b3-ac41-48de4fab14dc
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	b10a9534-0b3f-46bd-8c53-bbd6ca671a13
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	0ca37889-3c98-4945-a870-735dff527022
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	b0f22f97-445f-495a-9e1c-8d2792fc800a
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	55d68f8f-9344-4f16-bd67-33c246eb33a0
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	7cf49f7c-3217-436b-b265-2686cfac49cb
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	e2ae736e-464e-47a3-bea4-9b04c39e4eb2
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	6cd34fff-71e2-4244-af48-20a5bcc413a4
cb2df478-ae63-4e4d-8502-7b4e23d20899	d9b702e7-4564-49ad-9522-f256a1e1406c
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	fd734d12-8abf-41c1-b10d-c11ccaee006d
ecbbf162-5e81-4c5f-a01c-efbd9b1511a0	dd790a92-177f-4049-a668-18caafa545f1
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-10-17 14:21:46
20211116045059	2025-10-17 14:21:49
20211116050929	2025-10-17 14:21:51
20211116051442	2025-10-17 14:21:53
20211116212300	2025-10-17 14:21:55
20211116213355	2025-10-17 14:21:57
20211116213934	2025-10-17 14:21:59
20211116214523	2025-10-17 14:22:02
20211122062447	2025-10-17 14:22:04
20211124070109	2025-10-17 14:22:06
20211202204204	2025-10-17 14:22:08
20211202204605	2025-10-17 14:22:10
20211210212804	2025-10-17 14:22:16
20211228014915	2025-10-17 14:22:18
20220107221237	2025-10-17 14:22:20
20220228202821	2025-10-17 14:22:22
20220312004840	2025-10-17 14:22:24
20220603231003	2025-10-17 14:22:27
20220603232444	2025-10-17 14:22:29
20220615214548	2025-10-17 14:22:32
20220712093339	2025-10-17 14:22:34
20220908172859	2025-10-17 14:22:36
20220916233421	2025-10-17 14:22:38
20230119133233	2025-10-17 14:22:39
20230128025114	2025-10-17 14:22:42
20230128025212	2025-10-17 14:22:44
20230227211149	2025-10-17 14:22:46
20230228184745	2025-10-17 14:22:48
20230308225145	2025-10-17 14:22:50
20230328144023	2025-10-17 14:22:52
20231018144023	2025-10-17 14:22:55
20231204144023	2025-10-17 14:22:58
20231204144024	2025-10-17 14:23:00
20231204144025	2025-10-17 14:23:02
20240108234812	2025-10-17 14:23:04
20240109165339	2025-10-17 14:23:06
20240227174441	2025-10-17 14:23:09
20240311171622	2025-10-17 14:23:12
20240321100241	2025-10-17 14:23:16
20240401105812	2025-10-17 14:23:22
20240418121054	2025-10-17 14:23:25
20240523004032	2025-10-17 14:23:32
20240618124746	2025-10-17 14:23:34
20240801235015	2025-10-17 14:23:36
20240805133720	2025-10-17 14:23:38
20240827160934	2025-10-17 14:23:40
20240919163303	2025-10-17 14:23:42
20240919163305	2025-10-17 14:23:44
20241019105805	2025-10-17 14:23:46
20241030150047	2025-10-17 14:23:54
20241108114728	2025-10-17 14:23:57
20241121104152	2025-10-17 14:23:59
20241130184212	2025-10-17 14:24:01
20241220035512	2025-10-17 14:24:03
20241220123912	2025-10-17 14:24:05
20241224161212	2025-10-17 14:24:07
20250107150512	2025-10-17 14:24:09
20250110162412	2025-10-17 14:24:11
20250123174212	2025-10-17 14:24:13
20250128220012	2025-10-17 14:24:15
20250506224012	2025-10-17 14:24:16
20250523164012	2025-10-17 14:24:18
20250714121412	2025-10-17 14:24:20
20250905041441	2025-10-17 14:24:22
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
gshop-public	gshop-public	\N	2025-10-22 14:33:32.224651+00	2025-10-22 14:33:32.224651+00	t	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-10-17 14:21:44.62685
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-10-17 14:21:44.642815
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-10-17 14:21:44.658965
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-10-17 14:21:44.706995
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-10-17 14:21:44.768538
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-10-17 14:21:44.777541
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-10-17 14:21:44.785259
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-10-17 14:21:44.822769
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-10-17 14:21:44.840066
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-10-17 14:21:44.857609
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-10-17 14:21:44.917891
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-10-17 14:21:44.944147
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-10-17 14:21:44.957382
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-10-17 14:21:44.964719
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-10-17 14:21:44.973642
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-10-17 14:21:45.013263
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-10-17 14:21:45.021112
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-10-17 14:21:45.028564
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-10-17 14:21:45.037349
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-10-17 14:21:45.047867
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-10-17 14:21:45.05643
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-10-17 14:21:45.125442
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-10-17 14:21:45.154227
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-10-17 14:21:45.174776
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-10-17 14:21:45.185922
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-10-17 14:21:45.193711
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-10-17 14:21:45.237425
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-10-17 14:21:45.266357
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-10-17 14:21:47.183996
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-10-17 14:21:47.208681
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-10-17 14:21:47.218298
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-10-17 14:21:47.226383
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-10-17 14:21:47.234664
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-10-17 14:21:47.245769
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-10-17 14:21:47.248244
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-10-17 14:21:47.256154
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-10-17 14:21:47.264037
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-10-17 14:21:47.275597
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-10-17 14:21:47.283202
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-10-17 14:21:47.300943
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-10-17 14:21:47.308042
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-10-17 14:21:47.349659
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-10-17 14:21:47.36212
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-10-17 14:21:47.383857
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
c2ea0d79-5daf-47e9-a12c-69421d3d3782	gshop-public	MOUNTAINTOP 30L Hiking Backpack_0_main	\N	2025-10-22 16:30:52.278293+00	2025-10-22 16:30:52.278293+00	2025-10-22 16:30:52.278293+00	{"eTag": "\\"206f85d8d9cd9f28bbe4cd6aa7442326\\"", "size": 59076, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:53.000Z", "contentLength": 59076, "httpStatusCode": 200}	37f43375-8589-44c8-84c5-cbc154cce44e	\N	{}	1
84418398-98c5-4877-9827-18c975ae3293	gshop-public	4 Person Camping Tent_1_thumbnail	\N	2025-10-22 16:31:50.289871+00	2025-10-22 16:31:50.289871+00	2025-10-22 16:31:50.289871+00	{"eTag": "\\"9859ddb8a2bfc6a79779999c6f54f082\\"", "size": 8228, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:51.000Z", "contentLength": 8228, "httpStatusCode": 200}	e07b411b-1b34-4734-b647-e2cca57d2582	\N	{}	1
9935cc40-40fc-460c-a080-21d19225d483	gshop-public	CAMPROS CP Tents_main	\N	2025-10-22 16:16:54.558887+00	2025-10-22 16:17:09.280571+00	2025-10-22 16:16:54.558887+00	{"eTag": "\\"64933995467d6c16d929c5675cba5b10\\"", "size": 78348, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:10.000Z", "contentLength": 78348, "httpStatusCode": 200}	87c1f8d4-f71a-43dd-bb3a-97976455a369	\N	{}	1
96dbc250-e6c9-4eaf-b8d0-29373d446d00	gshop-public	MOUNTAINTOP 30L Hiking Backpack_0_preview	\N	2025-10-22 16:30:53.23344+00	2025-10-22 16:30:53.23344+00	2025-10-22 16:30:53.23344+00	{"eTag": "\\"bed0772da5ed2065262c9f2074d0c300\\"", "size": 19504, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:54.000Z", "contentLength": 19504, "httpStatusCode": 200}	61d90659-57ff-48ab-a93c-b41dab156160	\N	{}	1
4edd494d-88c8-43c4-91a5-da3c33047b21	gshop-public	dsfs_image_0_main	\N	2025-10-24 16:25:26.550772+00	2025-10-24 16:25:26.550772+00	2025-10-24 16:25:26.550772+00	{"eTag": "\\"0ca6888b32dbb2143595987f5a42ce0e\\"", "size": 25734, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:25:27.000Z", "contentLength": 25734, "httpStatusCode": 200}	66057d53-c977-4bb5-af09-b2747e8f40f9	\N	{}	1
fb03356f-862b-4ff7-8d6d-8e6ba1fc21cd	gshop-public	MOUNTAINTOP 30L Hiking Backpack_0_thumbnail	\N	2025-10-22 16:30:54.507415+00	2025-10-22 16:30:54.507415+00	2025-10-22 16:30:54.507415+00	{"eTag": "\\"e388df17ef7b77a3e4797d4aa7a544c8\\"", "size": 3934, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:55.000Z", "contentLength": 3934, "httpStatusCode": 200}	68029610-5887-43a8-82aa-16bf2970e028	\N	{}	1
f558df13-7ebc-4a0e-845e-d669848dd94f	gshop-public	MOUNTAINTOP 30L Hiking Backpack_1_main	\N	2025-10-22 16:30:55.419019+00	2025-10-22 16:30:55.419019+00	2025-10-22 16:30:55.419019+00	{"eTag": "\\"0e359497062b9c967bd8a0e591477bc7\\"", "size": 32872, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:56.000Z", "contentLength": 32872, "httpStatusCode": 200}	bb2a1f37-ebd2-4695-ad37-ee68586f820f	\N	{}	1
e8c50d58-7a0d-4e58-b684-98e92b93a725	gshop-public	MOUNTAINTOP 30L Hiking Backpack_1_preview	\N	2025-10-22 16:30:56.225244+00	2025-10-22 16:30:56.225244+00	2025-10-22 16:30:56.225244+00	{"eTag": "\\"24620b1ef37c2e3f615fb9c44cf6c27f\\"", "size": 17372, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:57.000Z", "contentLength": 17372, "httpStatusCode": 200}	b3b26d4a-1ce6-4d27-9073-4fbd32134437	\N	{}	1
e7d75041-a0bf-4a90-9089-63263411fd5a	gshop-public	MOLLE Assault Backpack_main	\N	2025-10-22 16:14:07.551863+00	2025-10-22 16:28:12.750036+00	2025-10-22 16:14:07.551863+00	{"eTag": "\\"f6dcffbd5197f6da2b0ffac2c8dec8ca\\"", "size": 98604, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:28:13.000Z", "contentLength": 98604, "httpStatusCode": 200}	827c0bdd-86a0-483f-809a-b8a569153d47	\N	{}	1
1a34da61-bb32-4685-830f-6ae77577249c	gshop-public	MOUNTAINTOP 30L Hiking Backpack_1_thumbnail	\N	2025-10-22 16:30:56.875832+00	2025-10-22 16:30:56.875832+00	2025-10-22 16:30:56.875832+00	{"eTag": "\\"e1db031770d6bb8ea8ecf9fb84a32a27\\"", "size": 3750, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:57.000Z", "contentLength": 3750, "httpStatusCode": 200}	b001440a-4268-4314-91e8-fb87b472c9e6	\N	{}	1
b9fb4486-2f43-41f7-9c25-d706963383ae	gshop-public	MOUNTAINTOP 30L Hiking Backpack_main	\N	2025-10-22 16:16:50.939721+00	2025-10-22 16:17:08.820771+00	2025-10-22 16:16:50.939721+00	{"eTag": "\\"a28fa4aed95df601355079bc2619a18f\\"", "size": 86756, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:09.000Z", "contentLength": 86756, "httpStatusCode": 200}	08d82121-58eb-40dd-98c2-186675845d16	\N	{}	1
94b865ed-7d81-4c60-acd0-8616491a020c	gshop-public	MOUNTAINTOP 30L Hiking Backpack_thumbnail	\N	2025-10-22 16:16:53.241423+00	2025-10-22 16:17:11.634055+00	2025-10-22 16:16:53.241423+00	{"eTag": "\\"63ea023fa2a875196f6df73d4f84fb54\\"", "size": 7632, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:12.000Z", "contentLength": 7632, "httpStatusCode": 200}	35bf2499-44c6-476f-8fca-34fb59d13b26	\N	{}	1
f538e130-0ed6-4e71-a458-75c88ef68f32	gshop-public	MOUNTAINTOP 30L Hiking Backpack_preview	\N	2025-10-22 16:16:52.122029+00	2025-10-22 16:17:09.698918+00	2025-10-22 16:16:52.122029+00	{"eTag": "\\"79211d9bea79ac8af0b07a6035bf8b4c\\"", "size": 49246, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:10.000Z", "contentLength": 49246, "httpStatusCode": 200}	363dd053-1231-4891-8acf-fbd4a1e83f04	\N	{}	1
980ab4d8-91a5-4425-9800-161415578c40	gshop-public	MOLLE Assault Backpack_preview	\N	2025-10-22 16:14:08.521047+00	2025-10-22 16:28:14.241061+00	2025-10-22 16:14:08.521047+00	{"eTag": "\\"edccc55e170f8e59a885684d447e2936\\"", "size": 38228, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:28:15.000Z", "contentLength": 38228, "httpStatusCode": 200}	0d6759e4-ea2a-4fa6-9362-0da673ed94f6	\N	{}	1
5cc9c07f-b4a9-408c-bf92-9a05eb4f960a	gshop-public	MOLLE Assault Backpack_thumbnail	\N	2025-10-22 16:14:09.098829+00	2025-10-22 16:28:14.917857+00	2025-10-22 16:14:09.098829+00	{"eTag": "\\"0607259d84480082e993485987ae16ae\\"", "size": 5174, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:28:15.000Z", "contentLength": 5174, "httpStatusCode": 200}	12f66789-3ca8-43c3-8804-9248585be4bc	\N	{}	1
ce36e4f6-db9c-4a9c-8e35-fcb729c9eb29	gshop-public	CAMPROS CP Tents_thumbnail	\N	2025-10-22 16:16:56.431007+00	2025-10-22 16:17:14.192579+00	2025-10-22 16:16:56.431007+00	{"eTag": "\\"cf0bbac8ceb79153d8dcd28cfd3bed2f\\"", "size": 7264, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:15.000Z", "contentLength": 7264, "httpStatusCode": 200}	6beef6f8-06b5-474a-90e2-cbb55473acdd	\N	{}	1
f9d328df-e1dd-434b-9122-efb5f9fc5042	gshop-public	4 Person Camping Tent_2_main	\N	2025-10-22 16:31:51.153562+00	2025-10-22 16:31:51.153562+00	2025-10-22 16:31:51.153562+00	{"eTag": "\\"652c56923146116104b690672945a0d4\\"", "size": 62484, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:52.000Z", "contentLength": 62484, "httpStatusCode": 200}	90b87889-4063-4fe9-9926-82429b1bdc78	\N	{}	1
bf8acd5e-514d-4b7e-a02e-c3dbec34485c	gshop-public	CAMPROS CP Tents_preview	\N	2025-10-22 16:16:55.513018+00	2025-10-22 16:17:10.326525+00	2025-10-22 16:16:55.513018+00	{"eTag": "\\"47774e293e3c1a0a016c3bb00938b60e\\"", "size": 50608, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:11.000Z", "contentLength": 50608, "httpStatusCode": 200}	7448e1d8-223a-4078-84f8-06c00135a972	\N	{}	1
2ea50067-8eba-4afd-a33a-6a1986d14e1b	gshop-public	MOUNTAINTOP 30L Hiking Backpack_2_main	\N	2025-10-22 16:30:57.850266+00	2025-10-22 16:30:57.850266+00	2025-10-22 16:30:57.850266+00	{"eTag": "\\"a28fa4aed95df601355079bc2619a18f\\"", "size": 86756, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:58.000Z", "contentLength": 86756, "httpStatusCode": 200}	8f3dfb8a-9bd6-4f3e-94ff-a5b22453a0c1	\N	{}	1
db744013-fa26-470b-86c0-a1c1f7d05ba5	gshop-public	MOUNTAINTOP 30L Hiking Backpack_2_preview	\N	2025-10-22 16:30:58.378912+00	2025-10-22 16:30:58.378912+00	2025-10-22 16:30:58.378912+00	{"eTag": "\\"79211d9bea79ac8af0b07a6035bf8b4c\\"", "size": 49246, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:59.000Z", "contentLength": 49246, "httpStatusCode": 200}	73106a4c-9ad3-48ef-ba5c-1cbcd99d0b6c	\N	{}	1
eedf9495-2cc0-4757-bc8a-c2cabf081615	gshop-public	MOON LENCE Instant Pop Up Tent_preview	\N	2025-10-22 16:17:04.618123+00	2025-10-22 16:17:21.663984+00	2025-10-22 16:17:04.618123+00	{"eTag": "\\"34caeba8249863295edba377a2c5eddc\\"", "size": 78670, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:22.000Z", "contentLength": 78670, "httpStatusCode": 200}	a8fcc0e3-b988-4e26-9210-e98284c1d584	\N	{}	1
76d7ce6a-dd10-4154-a8ab-57424b032752	gshop-public	4 Person Camping Tent_2_preview	\N	2025-10-22 16:31:51.693223+00	2025-10-22 16:31:51.693223+00	2025-10-22 16:31:51.693223+00	{"eTag": "\\"ff3c8a46ddd0eebf5d8af1ec45d51c8d\\"", "size": 36274, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:52.000Z", "contentLength": 36274, "httpStatusCode": 200}	09165fa5-8ca8-4a1c-938e-f50cebfe1389	\N	{}	1
9e4a4f2e-4826-4260-bb63-b8891b8ffcc4	gshop-public	MOUNTAINTOP 30L Hiking Backpack_2_thumbnail	\N	2025-10-22 16:30:59.189989+00	2025-10-22 16:30:59.189989+00	2025-10-22 16:30:59.189989+00	{"eTag": "\\"63ea023fa2a875196f6df73d4f84fb54\\"", "size": 7632, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:00.000Z", "contentLength": 7632, "httpStatusCode": 200}	a7998e65-d16c-4433-ba35-7df40abd860a	\N	{}	1
8a3b126c-03c4-4a13-806f-ad206013bf6d	gshop-public	CAMEL CROWN Tents_thumbnail	\N	2025-10-22 16:17:02.236369+00	2025-10-22 16:17:22.773542+00	2025-10-22 16:17:02.236369+00	{"eTag": "\\"6b710f9afd8ecde93327dc92b8641f41\\"", "size": 6372, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:23.000Z", "contentLength": 6372, "httpStatusCode": 200}	f0e52ea3-dc69-4870-ad5c-d0ae68b7f482	\N	{}	1
f88585b2-190b-41ef-8301-f9a9f171f898	gshop-public	MOON LENCE Instant Pop Up Tent_main	\N	2025-10-22 16:17:03.517649+00	2025-10-22 16:17:20.553551+00	2025-10-22 16:17:03.517649+00	{"eTag": "\\"55b113bf4fa206aa76cf073498a61744\\"", "size": 115268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:21.000Z", "contentLength": 115268, "httpStatusCode": 200}	66cd5441-c636-40e2-938c-fc70064402e4	\N	{}	1
9778a028-67ae-470c-b659-990f664cc348	gshop-public	CAMEL CROWN Tents_main	\N	2025-10-22 16:16:59.64376+00	2025-10-22 16:17:20.69225+00	2025-10-22 16:16:59.64376+00	{"eTag": "\\"ace486d2342ffd5b723e757a344cd8bf\\"", "size": 68256, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:21.000Z", "contentLength": 68256, "httpStatusCode": 200}	174f7161-c382-4e7b-a382-5cfa52a4fde5	\N	{}	1
a541adad-729a-4421-b892-063951886cf8	gshop-public	MOON LENCE Instant Pop Up Tent_thumbnail	\N	2025-10-22 16:17:05.842477+00	2025-10-22 16:17:22.924018+00	2025-10-22 16:17:05.842477+00	{"eTag": "\\"573c43879ed8585d5c707692e9d40ac7\\"", "size": 11860, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:23.000Z", "contentLength": 11860, "httpStatusCode": 200}	4253705e-27f7-4b88-8797-142a45a2486a	\N	{}	1
05a88819-5a16-49b3-a751-1a47d66efb0d	gshop-public	MOUNTAINTOP 30L Hiking Backpack_3_main	\N	2025-10-22 16:31:00.186337+00	2025-10-22 16:31:00.186337+00	2025-10-22 16:31:00.186337+00	{"eTag": "\\"eb0ec0158f838824758549b4e156fdfb\\"", "size": 55906, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:01.000Z", "contentLength": 55906, "httpStatusCode": 200}	968dca17-f725-4f26-8b4f-6bee9aebb812	\N	{}	1
be56c205-cfce-4aff-b27d-cb6ff2b6034e	gshop-public	4 Person Camping Tent_2_thumbnail	\N	2025-10-22 16:31:52.732049+00	2025-10-22 16:31:52.732049+00	2025-10-22 16:31:52.732049+00	{"eTag": "\\"48000bd8d1e6059b5b0c1c933005b020\\"", "size": 6038, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:53.000Z", "contentLength": 6038, "httpStatusCode": 200}	9c54fb06-297d-416a-817d-7a4b44b0948a	\N	{}	1
76f8ba02-a420-43cc-b17e-bf6ec77feee5	gshop-public	MOUNTAINTOP 30L Hiking Backpack_3_preview	\N	2025-10-22 16:31:01.137626+00	2025-10-22 16:31:01.137626+00	2025-10-22 16:31:01.137626+00	{"eTag": "\\"f13a03d8f2bcbfd93a054b360220f8ed\\"", "size": 32406, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:02.000Z", "contentLength": 32406, "httpStatusCode": 200}	0f9bd29a-6446-4c2d-9328-0483af3261fe	\N	{}	1
b53962da-595a-4878-9d03-c6df8e8bc01f	gshop-public	MOUNTAINTOP 30L Hiking Backpack_3_thumbnail	\N	2025-10-22 16:31:02.717462+00	2025-10-22 16:31:02.717462+00	2025-10-22 16:31:02.717462+00	{"eTag": "\\"63a2ae51771868afc3b9ceacaa585e54\\"", "size": 5978, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:03.000Z", "contentLength": 5978, "httpStatusCode": 200}	b2a92173-56d7-487f-a9f2-b27c9980c411	\N	{}	1
87254648-94ff-4bb3-b12d-2ea49b4bf0cc	gshop-public	MOUNTAINTOP 30L Hiking Backpack_4_main	\N	2025-10-22 16:31:03.739691+00	2025-10-22 16:31:03.739691+00	2025-10-22 16:31:03.739691+00	{"eTag": "\\"3c8356b691124a83875330673b82737b\\"", "size": 35996, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:04.000Z", "contentLength": 35996, "httpStatusCode": 200}	1da5f879-1948-4919-bd69-3c5abd61033c	\N	{}	1
05747995-2494-4fe4-a9e0-9dd2cbb23883	gshop-public	MOUNTAINTOP 30L Hiking Backpack_4_preview	\N	2025-10-22 16:31:04.41256+00	2025-10-22 16:31:04.41256+00	2025-10-22 16:31:04.41256+00	{"eTag": "\\"5da3c0344d598eba0f9cab851967144e\\"", "size": 20936, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:05.000Z", "contentLength": 20936, "httpStatusCode": 200}	6c07b102-56d2-4cdc-9f98-6f4269908969	\N	{}	1
b00f4923-e5a5-46fc-9a50-9c947bc05c1b	gshop-public	dsfs_image_0_preview	\N	2025-10-24 16:25:27.178065+00	2025-10-24 16:25:27.178065+00	2025-10-24 16:25:27.178065+00	{"eTag": "\\"f013885edb71146cbaae8b7066b33adf\\"", "size": 14268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:25:28.000Z", "contentLength": 14268, "httpStatusCode": 200}	15d68dbd-ca36-4087-b057-77460f2e1bd0	\N	{}	1
35ed301f-3eb6-4de8-aa35-25f68705b696	gshop-public	MOUNTAINTOP 30L Hiking Backpack_4_thumbnail	\N	2025-10-22 16:31:05.266051+00	2025-10-22 16:31:05.266051+00	2025-10-22 16:31:05.266051+00	{"eTag": "\\"b660e7d530d78ea2ff0ccdf773f674ee\\"", "size": 4830, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:06.000Z", "contentLength": 4830, "httpStatusCode": 200}	c6c09287-13f4-487d-87e0-246c20655dc4	\N	{}	1
e897ec8e-ad07-4ab6-8c88-a522c4436f14	gshop-public	MOLLE Assault Backpack_2_preview	\N	2025-10-22 16:30:07.867035+00	2025-10-22 16:30:07.867035+00	2025-10-22 16:30:07.867035+00	{"eTag": "\\"84fc80d7916f0819ba71d258e4e23041\\"", "size": 41364, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:08.000Z", "contentLength": 41364, "httpStatusCode": 200}	f24869e9-0d52-49cb-bb7e-05c3d38c1b85	\N	{}	1
9ade032d-b94c-4bfb-9851-416747a46aea	gshop-public	CAMEL CROWN Tents_preview	\N	2025-10-22 16:17:00.992526+00	2025-10-22 16:17:21.549784+00	2025-10-22 16:17:00.992526+00	{"eTag": "\\"e20ff6f9fbb51309d95ad68bd25c688d\\"", "size": 38990, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:17:22.000Z", "contentLength": 38990, "httpStatusCode": 200}	be4c6372-4631-4302-8e9b-670950cfb28a	\N	{}	1
1407aa00-8824-4193-9246-cabcc158ab3d	gshop-public	MOLLE Assault Backpack_0_main	\N	2025-10-22 16:30:00.442002+00	2025-10-22 16:30:00.442002+00	2025-10-22 16:30:00.442002+00	{"eTag": "\\"ca1973630ae5016deb9f96eb55c81738\\"", "size": 69490, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:01.000Z", "contentLength": 69490, "httpStatusCode": 200}	164ff168-eefa-4fe2-82ff-bb537c5bbf86	\N	{}	1
dc7ddeda-259c-4e1a-8887-0b0b850e49db	gshop-public	MOLLE Assault Backpack_0_preview	\N	2025-10-22 16:30:01.103885+00	2025-10-22 16:30:01.103885+00	2025-10-22 16:30:01.103885+00	{"eTag": "\\"5e7cf80643a65c2cc4432c53c032cec9\\"", "size": 37844, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:02.000Z", "contentLength": 37844, "httpStatusCode": 200}	51b1a61c-e610-4ad7-bae7-a49514e18862	\N	{}	1
4dfefd2a-1da9-4cd5-bb47-6e80af1e47c6	gshop-public	MOLLE Assault Backpack_0_thumbnail	\N	2025-10-22 16:30:03.076795+00	2025-10-22 16:30:03.076795+00	2025-10-22 16:30:03.076795+00	{"eTag": "\\"5864200deab35d8948ce1d84d1899081\\"", "size": 5938, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:03.000Z", "contentLength": 5938, "httpStatusCode": 200}	6a28c70d-44c0-4f87-9b7f-c25d315d68bf	\N	{}	1
78a82852-5044-4947-9f98-09bfa9534d55	gshop-public	MOLLE Assault Backpack_1_main	\N	2025-10-22 16:30:04.022869+00	2025-10-22 16:30:04.022869+00	2025-10-22 16:30:04.022869+00	{"eTag": "\\"95dcd59ec8be3476fb2bc74c460b24d3\\"", "size": 53668, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:04.000Z", "contentLength": 53668, "httpStatusCode": 200}	b5a8830c-b742-45f0-8972-2aa7be5a2a07	\N	{}	1
6002d1a5-2be7-4acc-ad95-680d0a2d5d97	gshop-public	MOLLE Assault Backpack_1_preview	\N	2025-10-22 16:30:05.385023+00	2025-10-22 16:30:05.385023+00	2025-10-22 16:30:05.385023+00	{"eTag": "\\"7e99c9b833933a38916ab116c8c2c6dc\\"", "size": 30632, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:06.000Z", "contentLength": 30632, "httpStatusCode": 200}	022ef48a-a295-489c-ab1a-4cb0caec35c1	\N	{}	1
7e5de0c0-10bb-4f6b-8990-bf0c800b4af3	gshop-public	MOLLE Assault Backpack_1_thumbnail	\N	2025-10-22 16:30:05.990378+00	2025-10-22 16:30:05.990378+00	2025-10-22 16:30:05.990378+00	{"eTag": "\\"f4b5505853c877944bc29b979e5b0fb6\\"", "size": 5844, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:06.000Z", "contentLength": 5844, "httpStatusCode": 200}	54c4d620-008e-416a-8f06-49ba5832287e	\N	{}	1
b6de59cf-d275-452f-bbb5-dbdbd874187b	gshop-public	MOLLE Assault Backpack_2_main	\N	2025-10-22 16:30:07.091276+00	2025-10-22 16:30:07.091276+00	2025-10-22 16:30:07.091276+00	{"eTag": "\\"13f424403492a21eaec71830f25fbdf9\\"", "size": 71436, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:07.000Z", "contentLength": 71436, "httpStatusCode": 200}	a5c965a5-ad0f-46ca-98f3-946adbe707d5	\N	{}	1
672850d7-41f4-4d13-bc88-4df9f4effdcd	gshop-public	MOLLE Assault Backpack_2_thumbnail	\N	2025-10-22 16:30:08.693278+00	2025-10-22 16:30:08.693278+00	2025-10-22 16:30:08.693278+00	{"eTag": "\\"09d4bd69597e82f202185b884a4f568b\\"", "size": 6976, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:09.000Z", "contentLength": 6976, "httpStatusCode": 200}	0c8191a3-9ba4-4714-af04-8ede7ccc437c	\N	{}	1
86352500-8b3d-438e-8942-162fd4a7ea29	gshop-public	MOLLE Assault Backpack_3_main	\N	2025-10-22 16:30:09.270687+00	2025-10-22 16:30:09.270687+00	2025-10-22 16:30:09.270687+00	{"eTag": "\\"e5df11b4f834b01ebdb85c3fb4f83809\\"", "size": 38222, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:10.000Z", "contentLength": 38222, "httpStatusCode": 200}	ce5d5d7d-3a4f-4242-ad84-6fd365c92286	\N	{}	1
d689c832-468f-415c-abec-df5693886210	gshop-public	MOLLE Assault Backpack_3_preview	\N	2025-10-22 16:30:10.23644+00	2025-10-22 16:30:10.23644+00	2025-10-22 16:30:10.23644+00	{"eTag": "\\"f90603436227d2f9d7aa764f694d3617\\"", "size": 21214, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:11.000Z", "contentLength": 21214, "httpStatusCode": 200}	fb2ebee4-9386-4eca-921c-27a22b2e2974	\N	{}	1
1df45bd1-e7e4-48fa-af51-34985a44bbbe	gshop-public	MOLLE Assault Backpack_3_thumbnail	\N	2025-10-22 16:30:10.978316+00	2025-10-22 16:30:10.978316+00	2025-10-22 16:30:10.978316+00	{"eTag": "\\"10e160f78c13cd200e5e812de9f2c9da\\"", "size": 4008, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:11.000Z", "contentLength": 4008, "httpStatusCode": 200}	78b18bbf-2ec8-4f30-80a6-0c57037337b5	\N	{}	1
7a42dbf6-7c61-456f-9a7e-b596f702e036	gshop-public	MOLLE Assault Backpack_4_main	\N	2025-10-22 16:30:12.095249+00	2025-10-22 16:30:12.095249+00	2025-10-22 16:30:12.095249+00	{"eTag": "\\"f6dcffbd5197f6da2b0ffac2c8dec8ca\\"", "size": 98604, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:13.000Z", "contentLength": 98604, "httpStatusCode": 200}	a6147bd2-1ce4-4d49-aa8a-ac25782da022	\N	{}	1
95bdd4b0-56a9-4fc3-923f-f6ca8c7ca082	gshop-public	MOLLE Assault Backpack_4_preview	\N	2025-10-22 16:30:12.627514+00	2025-10-22 16:30:12.627514+00	2025-10-22 16:30:12.627514+00	{"eTag": "\\"edccc55e170f8e59a885684d447e2936\\"", "size": 38228, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:13.000Z", "contentLength": 38228, "httpStatusCode": 200}	4a4c3ea1-16c1-4805-b030-089d1d55ef4a	\N	{}	1
58d14720-5cec-4f6e-a4b7-7c2192ac53f6	gshop-public	CAMPROS CP Tents_0_main	\N	2025-10-22 16:31:05.61002+00	2025-10-22 16:31:05.61002+00	2025-10-22 16:31:05.61002+00	{"eTag": "\\"6fbe6488f5d5500fd237e9d2d8303c21\\"", "size": 19142, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:06.000Z", "contentLength": 19142, "httpStatusCode": 200}	fc722667-dff2-4785-ac7f-c30ccc5ff5d8	\N	{}	1
dca61499-89c6-4a20-8653-213b38858e45	gshop-public	MOLLE Assault Backpack_4_thumbnail	\N	2025-10-22 16:30:13.621639+00	2025-10-22 16:30:13.621639+00	2025-10-22 16:30:13.621639+00	{"eTag": "\\"0607259d84480082e993485987ae16ae\\"", "size": 5174, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:30:14.000Z", "contentLength": 5174, "httpStatusCode": 200}	de3f4eab-4c58-4737-abb4-ecd236cdd3de	\N	{}	1
7c15c0ec-ea4a-4540-a2d1-09bc87197e88	gshop-public	4 Person Camping Tent_3_main	\N	2025-10-22 16:31:53.293634+00	2025-10-22 16:31:53.293634+00	2025-10-22 16:31:53.293634+00	{"eTag": "\\"0d02ea0536659546b80af8aece5f1f12\\"", "size": 55694, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:54.000Z", "contentLength": 55694, "httpStatusCode": 200}	2ff31fe9-d263-4fd6-901e-341310a58719	\N	{}	1
8f0b82a7-e8c9-47d8-a2ea-7d1f57e7e2b3	gshop-public	CAMPROS CP Tents_0_preview	\N	2025-10-22 16:31:06.878598+00	2025-10-22 16:31:06.878598+00	2025-10-22 16:31:06.878598+00	{"eTag": "\\"76d218cdab28d62447759b1734b0d6a6\\"", "size": 10584, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:07.000Z", "contentLength": 10584, "httpStatusCode": 200}	02b722fa-9497-4993-8ce8-ab35465ee687	\N	{}	1
3ec271cb-ba2f-4cb0-af5f-e67c5b5176b3	gshop-public	CAMPROS CP Tents_0_thumbnail	\N	2025-10-22 16:31:07.814494+00	2025-10-22 16:31:07.814494+00	2025-10-22 16:31:07.814494+00	{"eTag": "\\"2ea33d7095a5f0ce68621f91b7ef674f\\"", "size": 2638, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:08.000Z", "contentLength": 2638, "httpStatusCode": 200}	582a9bb4-348c-43cb-83d1-c5b58f1a34c9	\N	{}	1
94c59b20-63e3-4ea7-9643-065bcf181442	gshop-public	4 Person Camping Tent_3_preview	\N	2025-10-22 16:31:54.215036+00	2025-10-22 16:31:54.215036+00	2025-10-22 16:31:54.215036+00	{"eTag": "\\"8d594fb18bf5bb774bfcdc445841d5aa\\"", "size": 29184, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:55.000Z", "contentLength": 29184, "httpStatusCode": 200}	39d5e8d2-bbee-4136-a4b3-14aa5235ce74	\N	{}	1
20361f54-619c-4ae2-93f2-252e16325737	gshop-public	CAMPROS CP Tents_1_main	\N	2025-10-22 16:31:08.916072+00	2025-10-22 16:31:08.916072+00	2025-10-22 16:31:08.916072+00	{"eTag": "\\"64933995467d6c16d929c5675cba5b10\\"", "size": 78348, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:09.000Z", "contentLength": 78348, "httpStatusCode": 200}	f0a66f1c-8e10-4901-b40d-02e64eaf7c35	\N	{}	1
d84e9a2d-8d7d-43af-8a48-dc2e13938d2e	gshop-public	dsfs_image_0_thumbnail	\N	2025-10-24 16:25:28.097334+00	2025-10-24 16:25:28.097334+00	2025-10-24 16:25:28.097334+00	{"eTag": "\\"92c1b67d2867c0512c76b964984bd402\\"", "size": 3368, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:25:29.000Z", "contentLength": 3368, "httpStatusCode": 200}	7231171c-b0ac-4c29-8214-8d44911e52da	\N	{}	1
2804b4e8-620d-4463-bec8-44e8bc48d1f8	gshop-public	CAMPROS CP Tents_1_preview	\N	2025-10-22 16:31:10.019709+00	2025-10-22 16:31:10.019709+00	2025-10-22 16:31:10.019709+00	{"eTag": "\\"47774e293e3c1a0a016c3bb00938b60e\\"", "size": 50608, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:10.000Z", "contentLength": 50608, "httpStatusCode": 200}	4d586b5c-6363-4c19-ba43-b4b5fa763430	\N	{}	1
263b9ce9-1ce3-4386-94ef-4448819a8240	gshop-public	4 Person Camping Tent_3_thumbnail	\N	2025-10-22 16:31:54.818347+00	2025-10-22 16:31:54.818347+00	2025-10-22 16:31:54.818347+00	{"eTag": "\\"3a64b1f4283ae008a90afbd99b55df25\\"", "size": 6038, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:55.000Z", "contentLength": 6038, "httpStatusCode": 200}	8dab4210-23e6-445c-aab5-0165783f0996	\N	{}	1
93c9fd6c-427e-44c3-a0b9-c9f729476806	gshop-public	CAMPROS CP Tents_1_thumbnail	\N	2025-10-22 16:31:10.995782+00	2025-10-22 16:31:10.995782+00	2025-10-22 16:31:10.995782+00	{"eTag": "\\"cf0bbac8ceb79153d8dcd28cfd3bed2f\\"", "size": 7264, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:11.000Z", "contentLength": 7264, "httpStatusCode": 200}	01127019-d5f7-4cea-8b88-11d3c4f9973e	\N	{}	1
63f19eef-940b-432c-994e-b21128fd22ab	gshop-public	CAMPROS CP Tents_2_main	\N	2025-10-22 16:31:12.026406+00	2025-10-22 16:31:12.026406+00	2025-10-22 16:31:12.026406+00	{"eTag": "\\"d464ff8abaaf24832a790614e45c8bec\\"", "size": 62488, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:12.000Z", "contentLength": 62488, "httpStatusCode": 200}	633b5d7d-5f2f-4781-a733-073d2727adc9	\N	{}	1
fd2884f3-56ae-4ea6-b981-7fc0384ee372	gshop-public	CAMPROS CP Tents_2_preview	\N	2025-10-22 16:31:12.592669+00	2025-10-22 16:31:12.592669+00	2025-10-22 16:31:12.592669+00	{"eTag": "\\"246d5cc980c5886eaae4da6b47cec18c\\"", "size": 36534, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:13.000Z", "contentLength": 36534, "httpStatusCode": 200}	e96d9035-e1ad-4173-a966-3e4109b18814	\N	{}	1
59213ab2-7dfe-4005-9ed5-d0569bfc58fb	gshop-public	CAMPROS CP Tents_2_thumbnail	\N	2025-10-22 16:31:13.661971+00	2025-10-22 16:31:13.661971+00	2025-10-22 16:31:13.661971+00	{"eTag": "\\"9baca0ec1f2f368829acf33c84327beb\\"", "size": 5660, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:14.000Z", "contentLength": 5660, "httpStatusCode": 200}	1e94e3a1-003d-46c3-a47f-518c0db7c071	\N	{}	1
a037762c-4e26-46e5-8636-b1a26f255d31	gshop-public	CAMPROS CP Tents_3_main	\N	2025-10-22 16:31:14.296851+00	2025-10-22 16:31:14.296851+00	2025-10-22 16:31:14.296851+00	{"eTag": "\\"f6b83242f42bb6e967312241f4c1f481\\"", "size": 88246, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:15.000Z", "contentLength": 88246, "httpStatusCode": 200}	1613f3b9-1866-4890-be6d-bbe976bb2dc9	\N	{}	1
ca8b47ea-669f-439f-b023-ae656ed63dcb	gshop-public	CAMPROS CP Tents_3_preview	\N	2025-10-22 16:31:15.182899+00	2025-10-22 16:31:15.182899+00	2025-10-22 16:31:15.182899+00	{"eTag": "\\"55bb10b6f9e328c65140a27e8fa6a662\\"", "size": 52802, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:16.000Z", "contentLength": 52802, "httpStatusCode": 200}	91cf8ac3-05c7-4364-a733-c1c0540b9570	\N	{}	1
3e0f741e-ccd0-411d-a001-80c340e42eb5	gshop-public	CAMPROS CP Tents_3_thumbnail	\N	2025-10-22 16:31:15.792523+00	2025-10-22 16:31:15.792523+00	2025-10-22 16:31:15.792523+00	{"eTag": "\\"6659ae21196107b7d8cf05e530c98cd1\\"", "size": 7798, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:16.000Z", "contentLength": 7798, "httpStatusCode": 200}	c65942eb-bbf5-4fd2-8b7e-f1dac74d6de4	\N	{}	1
772dab55-123d-4486-b1bd-bed60be24513	gshop-public	4 Person Camping Tent_4_main	\N	2025-10-22 16:31:55.709088+00	2025-10-22 16:31:55.709088+00	2025-10-22 16:31:55.709088+00	{"eTag": "\\"7a674f7a510da3a24a3741fcfbfdc3b5\\"", "size": 37504, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:56.000Z", "contentLength": 37504, "httpStatusCode": 200}	a4e000f8-db8d-402b-b8c0-8ca4c9062ae7	\N	{}	1
2ca1fa66-6e69-40fa-a5c6-02999c8d8713	gshop-public	CAMPROS CP Tents_4_main	\N	2025-10-22 16:31:16.723851+00	2025-10-22 16:31:16.723851+00	2025-10-22 16:31:16.723851+00	{"eTag": "\\"f66b4ed4cf816c7b718648796d5f31ea\\"", "size": 36946, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:17.000Z", "contentLength": 36946, "httpStatusCode": 200}	62da9345-d2be-47f5-83e2-c8667c1314b5	\N	{}	1
64e5453a-825a-4fcf-a5b7-5f6e6431e984	gshop-public	CAMPROS CP Tents_4_preview	\N	2025-10-22 16:31:17.258174+00	2025-10-22 16:31:17.258174+00	2025-10-22 16:31:17.258174+00	{"eTag": "\\"dbfe6c748cf1973345f6e6754ba4959e\\"", "size": 22670, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:18.000Z", "contentLength": 22670, "httpStatusCode": 200}	90956e55-9862-485b-9d70-898c1d48c6dd	\N	{}	1
ccb7247e-52b1-4164-874d-ffdd8a7f8abd	gshop-public	4 Person Camping Tent_4_preview	\N	2025-10-22 16:31:56.245589+00	2025-10-22 16:31:56.245589+00	2025-10-22 16:31:56.245589+00	{"eTag": "\\"34af6a231a343405f05e2e9a92e993fc\\"", "size": 20896, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:57.000Z", "contentLength": 20896, "httpStatusCode": 200}	f1c4da8a-7f22-4fc4-b664-08edc49bbe16	\N	{}	1
60984134-1c60-40e0-a8dc-5f5f4f459200	gshop-public	CAMEL CROWN Tents_0_main	\N	2025-10-22 16:31:18.003831+00	2025-10-22 16:31:18.003831+00	2025-10-22 16:31:18.003831+00	{"eTag": "\\"b5c69fbea57fb591765cec7aa2c704a3\\"", "size": 19520, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:18.000Z", "contentLength": 19520, "httpStatusCode": 200}	a14bf744-816f-4a39-a2d6-8003fc7d123a	\N	{}	1
ca8276a2-a81b-4e5a-a3da-5844caf7afb9	gshop-public	asdas_image_0_main	\N	2025-10-24 16:28:28.256823+00	2025-10-24 16:28:28.256823+00	2025-10-24 16:28:28.256823+00	{"eTag": "\\"0ca6888b32dbb2143595987f5a42ce0e\\"", "size": 25734, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:28:29.000Z", "contentLength": 25734, "httpStatusCode": 200}	68fac04a-3631-4a0c-9232-e6bdc31b1f22	\N	{}	1
a291b24c-ceaa-4b98-a98c-7de1be189e81	gshop-public	CAMPROS CP Tents_4_thumbnail	\N	2025-10-22 16:31:18.274321+00	2025-10-22 16:31:18.274321+00	2025-10-22 16:31:18.274321+00	{"eTag": "\\"75694417426b61a5c8451217273c50c5\\"", "size": 5224, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:19.000Z", "contentLength": 5224, "httpStatusCode": 200}	7493f31c-1e7f-47de-a65e-168082f98c1c	\N	{}	1
c9b30822-f443-4f69-aa69-07e96507c44a	gshop-public	4 Person Camping Tent_4_thumbnail	\N	2025-10-22 16:31:57.201154+00	2025-10-22 16:31:57.201154+00	2025-10-22 16:31:57.201154+00	{"eTag": "\\"8f7d45399d4d8a11cf4931ff076cc956\\"", "size": 4662, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:58.000Z", "contentLength": 4662, "httpStatusCode": 200}	0f207e6b-3ad0-4eff-840c-9e45d670123e	\N	{}	1
2fdc79fd-32bf-4787-9db7-6594d6cebd9d	gshop-public	CAMEL CROWN Tents_0_preview	\N	2025-10-22 16:31:18.836512+00	2025-10-22 16:31:18.836512+00	2025-10-22 16:31:18.836512+00	{"eTag": "\\"3efa37d4dbb67791bb82378949a63a27\\"", "size": 10224, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:19.000Z", "contentLength": 10224, "httpStatusCode": 200}	fa1ed11c-b0df-48d3-848b-b3b8c5d879ed	\N	{}	1
bce6f799-42a0-47b0-8814-9d3274db769b	gshop-public	CAMEL CROWN Tents_0_thumbnail	\N	2025-10-22 16:31:19.73832+00	2025-10-22 16:31:19.73832+00	2025-10-22 16:31:19.73832+00	{"eTag": "\\"8d665c7f413e6cde6174a79711037d33\\"", "size": 2390, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:20.000Z", "contentLength": 2390, "httpStatusCode": 200}	2ff3a469-57ce-4e1d-a7e9-fa540aa22ccd	\N	{}	1
affaaff2-dc9b-4223-ad6e-04dc4d85092c	gshop-public	4 Person Camping Tent_5_main	\N	2025-10-22 16:31:57.813199+00	2025-10-22 16:31:57.813199+00	2025-10-22 16:31:57.813199+00	{"eTag": "\\"c1a8f247bd6fc39f34a0e2c1ddc338db\\"", "size": 70320, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:58.000Z", "contentLength": 70320, "httpStatusCode": 200}	d6e691c3-0d11-43a5-a999-93f1c85badfa	\N	{}	1
7cb960d1-864c-4fdf-83cd-9207b68c35c2	gshop-public	CAMEL CROWN Tents_1_main	\N	2025-10-22 16:31:20.817077+00	2025-10-22 16:31:20.817077+00	2025-10-22 16:31:20.817077+00	{"eTag": "\\"ace486d2342ffd5b723e757a344cd8bf\\"", "size": 68256, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:21.000Z", "contentLength": 68256, "httpStatusCode": 200}	6e690e3c-fd02-492b-8356-83f67e76ec92	\N	{}	1
1e7677b1-fce6-4821-86da-7acf5435da99	gshop-public	CAMEL CROWN Tents_1_preview	\N	2025-10-22 16:31:22.052698+00	2025-10-22 16:31:22.052698+00	2025-10-22 16:31:22.052698+00	{"eTag": "\\"e20ff6f9fbb51309d95ad68bd25c688d\\"", "size": 38990, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:23.000Z", "contentLength": 38990, "httpStatusCode": 200}	2626887f-4d39-4520-a535-b14dc1446b0d	\N	{}	1
2123faec-7f45-4c1a-9e8a-512fa02f6922	gshop-public	CAMEL CROWN Tents_1_thumbnail	\N	2025-10-22 16:31:23.001555+00	2025-10-22 16:31:23.001555+00	2025-10-22 16:31:23.001555+00	{"eTag": "\\"6b710f9afd8ecde93327dc92b8641f41\\"", "size": 6372, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:23.000Z", "contentLength": 6372, "httpStatusCode": 200}	d7762918-d843-4063-b8c7-b3d6f5206616	\N	{}	1
8fa2aed9-7448-4484-8281-c4a46d8f9219	gshop-public	CAMEL CROWN Tents_2_main	\N	2025-10-22 16:31:23.913693+00	2025-10-22 16:31:23.913693+00	2025-10-22 16:31:23.913693+00	{"eTag": "\\"618704427f29528114e6209f1d85706f\\"", "size": 55602, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:24.000Z", "contentLength": 55602, "httpStatusCode": 200}	cb2e736b-8620-4247-a07d-bd59dd74b2c3	\N	{}	1
98f204c0-0fbf-4ddd-87b9-3186fa7c4e03	gshop-public	CAMEL CROWN Tents_2_preview	\N	2025-10-22 16:31:24.86456+00	2025-10-22 16:31:24.86456+00	2025-10-22 16:31:24.86456+00	{"eTag": "\\"e253b8909407f7ef4b479180d8c5a702\\"", "size": 32748, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:25.000Z", "contentLength": 32748, "httpStatusCode": 200}	03a4f7fd-0bfb-4e3e-949e-fb51d7d47f65	\N	{}	1
25cac515-61cf-4d36-a278-5452d820dd5f	gshop-public	CAMEL CROWN Tents_2_thumbnail	\N	2025-10-22 16:31:25.407239+00	2025-10-22 16:31:25.407239+00	2025-10-22 16:31:25.407239+00	{"eTag": "\\"c610d52e55fde1772754af07bd2be5da\\"", "size": 6094, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:26.000Z", "contentLength": 6094, "httpStatusCode": 200}	430bfd67-abec-4224-bc97-d344dad62b05	\N	{}	1
477a0386-7bfc-4387-a245-a976e8ec5d8f	gshop-public	Nitecore EDC35 5000_image_2_preview	\N	2025-10-24 17:14:33.811169+00	2025-10-24 17:14:33.811169+00	2025-10-24 17:14:33.811169+00	{"eTag": "\\"6370635945d351a06278f7a8abe4e492\\"", "size": 15386, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:34.000Z", "contentLength": 15386, "httpStatusCode": 200}	4fa7a3db-0a6d-443a-a5db-f2ebf349ae46	\N	{}	1
0f2b7950-08dc-4608-8fbe-bd938ba13ddb	gshop-public	CAMEL CROWN Tents_3_main	\N	2025-10-22 16:31:26.28238+00	2025-10-22 16:31:26.28238+00	2025-10-22 16:31:26.28238+00	{"eTag": "\\"c3e69f133f12722e4247d1937904c8c5\\"", "size": 47202, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:27.000Z", "contentLength": 47202, "httpStatusCode": 200}	be8f47f3-b1be-4acc-92b6-22bda5bc9d16	\N	{}	1
8f460852-2235-46c3-86dd-fba6ece78665	gshop-public	4 Person Camping Tent_5_preview	\N	2025-10-22 16:31:58.765646+00	2025-10-22 16:31:58.765646+00	2025-10-22 16:31:58.765646+00	{"eTag": "\\"987b78099d4de740b72468c6d2722e29\\"", "size": 37416, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:59.000Z", "contentLength": 37416, "httpStatusCode": 200}	98e0f2d1-d32e-4976-b779-4ef695ef90db	\N	{}	1
b8ccfdea-9803-4841-b1d2-2359c94c6255	gshop-public	CAMEL CROWN Tents_3_preview	\N	2025-10-22 16:31:26.944258+00	2025-10-22 16:31:26.944258+00	2025-10-22 16:31:26.944258+00	{"eTag": "\\"275f154688c82daeb4035a8f969878b8\\"", "size": 26204, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:27.000Z", "contentLength": 26204, "httpStatusCode": 200}	b2334c40-8586-4c5f-9ae4-840384be6be2	\N	{}	1
6e4188ea-3d3c-407e-9030-3077195e93a6	gshop-public	asdas_image_0_preview	\N	2025-10-24 16:28:29.184916+00	2025-10-24 16:28:29.184916+00	2025-10-24 16:28:29.184916+00	{"eTag": "\\"f013885edb71146cbaae8b7066b33adf\\"", "size": 14268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:28:30.000Z", "contentLength": 14268, "httpStatusCode": 200}	5423ecb5-3249-4187-9ba9-057c33e94d30	\N	{}	1
77a13362-dc26-456a-b5ed-fa67dd4495f5	gshop-public	CAMEL CROWN Tents_3_thumbnail	\N	2025-10-22 16:31:27.783864+00	2025-10-22 16:31:27.783864+00	2025-10-22 16:31:27.783864+00	{"eTag": "\\"4e5c5f22f25c9543700e19105770b481\\"", "size": 5446, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:28.000Z", "contentLength": 5446, "httpStatusCode": 200}	21c4009d-332e-4dbb-9a29-2b874af500d5	\N	{}	1
09011a79-afb1-41a7-a5db-5d91e0f709ab	gshop-public	4 Person Camping Tent_5_thumbnail	\N	2025-10-22 16:31:59.327849+00	2025-10-22 16:31:59.327849+00	2025-10-22 16:31:59.327849+00	{"eTag": "\\"7f5f251a8233ca5e965ec71c15c41d32\\"", "size": 7504, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:00.000Z", "contentLength": 7504, "httpStatusCode": 200}	6e4d777e-4183-4b90-aec4-aa0198135a5b	\N	{}	1
17d1e497-7965-449d-9725-ac92004a0368	gshop-public	CAMEL CROWN Tents_4_main	\N	2025-10-22 16:31:28.936729+00	2025-10-22 16:31:28.936729+00	2025-10-22 16:31:28.936729+00	{"eTag": "\\"b81923a704ab8a8a4fae30bfb709fdee\\"", "size": 31748, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:29.000Z", "contentLength": 31748, "httpStatusCode": 200}	9ff0eea2-1e7f-4e89-b69d-f18df9b4a57a	\N	{}	1
3d136cf6-0039-45f1-a774-41e4a4d5f608	gshop-public	CAMEL CROWN Tents_4_preview	\N	2025-10-22 16:31:29.838094+00	2025-10-22 16:31:29.838094+00	2025-10-22 16:31:29.838094+00	{"eTag": "\\"4616bc38f551bdf4e8e7a3e5e7b74855\\"", "size": 18550, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:30.000Z", "contentLength": 18550, "httpStatusCode": 200}	00453bb8-219c-4bc7-b00f-3506da5160e5	\N	{}	1
21225a25-2173-436e-9e9a-66ec4d606252	gshop-public	Coleman Sundome Camping Tent_0_main	\N	2025-10-22 16:32:03.309517+00	2025-10-22 16:32:03.309517+00	2025-10-22 16:32:03.309517+00	{"eTag": "\\"278b2a406d5cac47f54b983a9e1ad99b\\"", "size": 22624, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:04.000Z", "contentLength": 22624, "httpStatusCode": 200}	f6a84b3b-e482-44b9-b6c0-099de4da350e	\N	{}	1
344b3fdf-89e3-4ef3-9a79-190a86a59556	gshop-public	MOON LENCE Instant Pop Up Tent_0_main	\N	2025-10-22 16:31:30.500944+00	2025-10-22 16:31:30.500944+00	2025-10-22 16:31:30.500944+00	{"eTag": "\\"d56c9b8521421aba96c3a05243e14d0f\\"", "size": 25058, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:31.000Z", "contentLength": 25058, "httpStatusCode": 200}	3c1dca35-07b3-4597-9e1d-34ec2d147278	\N	{}	1
d65b5d08-d0bb-43c8-8dcf-65221f0e638d	gshop-public	CAMEL CROWN Tents_4_thumbnail	\N	2025-10-22 16:31:30.602716+00	2025-10-22 16:31:30.602716+00	2025-10-22 16:31:30.602716+00	{"eTag": "\\"578d29b6f0b5a68923e538e262cc52e8\\"", "size": 4166, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:31.000Z", "contentLength": 4166, "httpStatusCode": 200}	9631b7f2-7f2d-4152-bce0-c54d6e37be17	\N	{}	1
277d286f-4b7a-4b0c-9b52-d7166cff0253	gshop-public	MOON LENCE Instant Pop Up Tent_0_preview	\N	2025-10-22 16:31:31.42167+00	2025-10-22 16:31:31.42167+00	2025-10-22 16:31:31.42167+00	{"eTag": "\\"5b194106cf2957a32305d7d7be47b1aa\\"", "size": 13822, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:32.000Z", "contentLength": 13822, "httpStatusCode": 200}	b444906d-cdc1-4a48-b85d-e3c209f7555f	\N	{}	1
5a48316a-975b-43bf-b311-a5dccf8e22b1	gshop-public	MOON LENCE Instant Pop Up Tent_0_thumbnail	\N	2025-10-22 16:31:32.289487+00	2025-10-22 16:31:32.289487+00	2025-10-22 16:31:32.289487+00	{"eTag": "\\"a5f4f82e028041227e63c475fbd8fa6b\\"", "size": 3272, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:33.000Z", "contentLength": 3272, "httpStatusCode": 200}	090ec68a-bda5-46c2-8d0e-3647d777d981	\N	{}	1
aebb3a8b-1bd1-4071-8da2-9cac6d906971	gshop-public	MOON LENCE Instant Pop Up Tent_1_main	\N	2025-10-22 16:31:33.657956+00	2025-10-22 16:31:33.657956+00	2025-10-22 16:31:33.657956+00	{"eTag": "\\"a35b3197b014bca648345c7e77461052\\"", "size": 28350, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:34.000Z", "contentLength": 28350, "httpStatusCode": 200}	2263ccab-4997-4872-80c4-6b2993199450	\N	{}	1
834e7d46-5066-48ea-b68b-ecccc67fccb1	gshop-public	MOON LENCE Instant Pop Up Tent_1_preview	\N	2025-10-22 16:31:34.511311+00	2025-10-22 16:31:34.511311+00	2025-10-22 16:31:34.511311+00	{"eTag": "\\"0c754613da12525c38a4625255c96e2b\\"", "size": 13756, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:35.000Z", "contentLength": 13756, "httpStatusCode": 200}	37164a58-ffc7-427a-a434-32ec3e98c10d	\N	{}	1
75169f37-40f7-4f3d-b361-52f83936301a	gshop-public	MOON LENCE Instant Pop Up Tent_1_thumbnail	\N	2025-10-22 16:31:35.351123+00	2025-10-22 16:31:35.351123+00	2025-10-22 16:31:35.351123+00	{"eTag": "\\"950cafdf51f5935151a2d82b778a9121\\"", "size": 3180, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:36.000Z", "contentLength": 3180, "httpStatusCode": 200}	57e8f507-fc36-47e5-ba16-903f52a9a26b	\N	{}	1
0c59a811-c216-4fdd-974e-2ccc81b2c909	gshop-public	Coleman Sundome Camping Tent_0_preview	\N	2025-10-22 16:32:04.623687+00	2025-10-22 16:32:04.623687+00	2025-10-22 16:32:04.623687+00	{"eTag": "\\"c27d8935da998f57f7bcdd4648c725ef\\"", "size": 11822, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:05.000Z", "contentLength": 11822, "httpStatusCode": 200}	cc7dc6d0-9e45-42d8-a23b-4138263847b1	\N	{}	1
96b0afde-2208-4ba4-9788-b8875aeb6a3b	gshop-public	MOON LENCE Instant Pop Up Tent_2_main	\N	2025-10-22 16:31:36.307143+00	2025-10-22 16:31:36.307143+00	2025-10-22 16:31:36.307143+00	{"eTag": "\\"94ec1581a7fda4734e1d3c7db5e9de4b\\"", "size": 82236, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:37.000Z", "contentLength": 82236, "httpStatusCode": 200}	42a77358-8618-4ce0-a74a-a6030c398fcf	\N	{}	1
52cc1c44-f030-49e1-b0a6-7763702da825	gshop-public	asdas_image_0_thumbnail	\N	2025-10-24 16:28:30.145381+00	2025-10-24 16:28:30.145381+00	2025-10-24 16:28:30.145381+00	{"eTag": "\\"92c1b67d2867c0512c76b964984bd402\\"", "size": 3368, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:28:31.000Z", "contentLength": 3368, "httpStatusCode": 200}	deb0f724-7565-4347-a28b-f6731510f1aa	\N	{}	1
819ec820-9e4b-4617-9ea3-bffafc9ac51d	gshop-public	MOON LENCE Instant Pop Up Tent_2_preview	\N	2025-10-22 16:31:37.380027+00	2025-10-22 16:31:37.380027+00	2025-10-22 16:31:37.380027+00	{"eTag": "\\"4eabe3eb33ca7f6a02e2d559c8bfa51a\\"", "size": 50046, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:38.000Z", "contentLength": 50046, "httpStatusCode": 200}	7a57fb18-703f-4395-8ec6-0ee02565f0ae	\N	{}	1
ba04d2fe-3102-4158-a920-ca1c1e223233	gshop-public	Coleman Sundome Camping Tent_0_thumbnail	\N	2025-10-22 16:32:05.626187+00	2025-10-22 16:32:05.626187+00	2025-10-22 16:32:05.626187+00	{"eTag": "\\"0d03f5a98689646265415151c151a92b\\"", "size": 2782, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:06.000Z", "contentLength": 2782, "httpStatusCode": 200}	5a920150-157a-47fc-ac75-fd6ed6d3f245	\N	{}	1
95780a25-d884-4376-a5d3-24cdbcd68b58	gshop-public	MOON LENCE Instant Pop Up Tent_2_thumbnail	\N	2025-10-22 16:31:38.473531+00	2025-10-22 16:31:38.473531+00	2025-10-22 16:31:38.473531+00	{"eTag": "\\"ef12261ae6d13da3a131b9b84e07eabf\\"", "size": 8322, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:39.000Z", "contentLength": 8322, "httpStatusCode": 200}	ecabfe16-c3fd-4cc3-9166-e4be638dac8a	\N	{}	1
5485ac55-44f3-46c2-adfe-b208dc367768	gshop-public	MOON LENCE Instant Pop Up Tent_3_main	\N	2025-10-22 16:31:39.451147+00	2025-10-22 16:31:39.451147+00	2025-10-22 16:31:39.451147+00	{"eTag": "\\"90d6062dfe0b4173060433e432b7af1a\\"", "size": 57150, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:40.000Z", "contentLength": 57150, "httpStatusCode": 200}	05e7b4f9-3ebf-427d-9139-263bfb23d13a	\N	{}	1
5dbb50df-c4af-4562-9e07-90a7811a118e	gshop-public	Coleman Sundome Camping Tent_1_main	\N	2025-10-22 16:32:06.891979+00	2025-10-22 16:32:06.891979+00	2025-10-22 16:32:06.891979+00	{"eTag": "\\"7cef8c6bb9cfdb4f32d87fe6c10ae7c7\\"", "size": 116484, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:07.000Z", "contentLength": 116484, "httpStatusCode": 200}	3daeb72e-8dda-4f46-81a4-63cef31d34bb	\N	{}	1
0577dee2-c2db-407c-8936-fe36f9374601	gshop-public	MOON LENCE Instant Pop Up Tent_3_preview	\N	2025-10-22 16:31:40.401017+00	2025-10-22 16:31:40.401017+00	2025-10-22 16:31:40.401017+00	{"eTag": "\\"bb83844bc6585960b8a7a2af03e5babd\\"", "size": 31084, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:41.000Z", "contentLength": 31084, "httpStatusCode": 200}	943e111b-b87f-4a53-aeaf-73f5874aa757	\N	{}	1
c3f5cbda-a9ad-438e-821b-6caf53b17ab4	gshop-public	MOON LENCE Instant Pop Up Tent_3_thumbnail	\N	2025-10-22 16:31:41.239689+00	2025-10-22 16:31:41.239689+00	2025-10-22 16:31:41.239689+00	{"eTag": "\\"5c98df70097d06af5b5a6351fee4c003\\"", "size": 6466, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:42.000Z", "contentLength": 6466, "httpStatusCode": 200}	0ca6ccc3-2cbe-4d93-ae93-5f738c44d490	\N	{}	1
8d535166-fccf-40ef-9701-bfa05a4a2592	gshop-public	MOON LENCE Instant Pop Up Tent_4_main	\N	2025-10-22 16:31:41.842688+00	2025-10-22 16:31:41.842688+00	2025-10-22 16:31:41.842688+00	{"eTag": "\\"55b113bf4fa206aa76cf073498a61744\\"", "size": 115268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:42.000Z", "contentLength": 115268, "httpStatusCode": 200}	6af9275a-cd73-4c66-9e40-6fd221c37bbf	\N	{}	1
5ab8a860-36a1-4161-be7d-9da188ff01c2	gshop-public	MOON LENCE Instant Pop Up Tent_4_preview	\N	2025-10-22 16:31:42.857574+00	2025-10-22 16:31:42.857574+00	2025-10-22 16:31:42.857574+00	{"eTag": "\\"34caeba8249863295edba377a2c5eddc\\"", "size": 78670, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:43.000Z", "contentLength": 78670, "httpStatusCode": 200}	ad7943f0-0990-4498-9f4e-df4e0d4b350f	\N	{}	1
5bc50435-5002-4161-8591-dc5cca7baf0e	gshop-public	MOON LENCE Instant Pop Up Tent_4_thumbnail	\N	2025-10-22 16:31:43.512204+00	2025-10-22 16:31:43.512204+00	2025-10-22 16:31:43.512204+00	{"eTag": "\\"573c43879ed8585d5c707692e9d40ac7\\"", "size": 11860, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:44.000Z", "contentLength": 11860, "httpStatusCode": 200}	48414829-d3c0-4bf6-aec4-50b0d43d76e3	\N	{}	1
dd561d48-e2f9-4fbd-8c38-a2a1874847bb	gshop-public	4 Person Camping Tent_0_main	\N	2025-10-22 16:31:46.005996+00	2025-10-22 16:31:46.005996+00	2025-10-22 16:31:46.005996+00	{"eTag": "\\"5f76faee2825b77009fec0dd7372914b\\"", "size": 25666, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:46.000Z", "contentLength": 25666, "httpStatusCode": 200}	b9dcffaa-978a-43c8-874f-efe938d127cb	\N	{}	1
d56de2b4-800e-4376-b42d-bdb3213fcda4	gshop-public	4 Person Camping Tent_0_preview	\N	2025-10-22 16:31:46.960318+00	2025-10-22 16:31:46.960318+00	2025-10-22 16:31:46.960318+00	{"eTag": "\\"a96f01a18a40476e546430df2e762ebb\\"", "size": 13452, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:47.000Z", "contentLength": 13452, "httpStatusCode": 200}	e6e3ff09-b202-4716-942f-09085d20ffe8	\N	{}	1
f6eb1a58-1e03-4954-b575-1573d606f3d1	gshop-public	4 Person Camping Tent_0_thumbnail	\N	2025-10-22 16:31:47.782118+00	2025-10-22 16:31:47.782118+00	2025-10-22 16:31:47.782118+00	{"eTag": "\\"23b865a2b55de674def68b3f27ee2e2e\\"", "size": 3156, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:48.000Z", "contentLength": 3156, "httpStatusCode": 200}	70eb72fe-bb40-42a7-8cdb-bb5420fed48c	\N	{}	1
80ec6a9f-1c3a-45d2-beb7-681efc3aad2e	gshop-public	Coleman Sundome Camping Tent_1_preview	\N	2025-10-22 16:32:07.992938+00	2025-10-22 16:32:07.992938+00	2025-10-22 16:32:07.992938+00	{"eTag": "\\"4990a5fa0f6e45216e7a98ce650c304f\\"", "size": 78982, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:08.000Z", "contentLength": 78982, "httpStatusCode": 200}	a0114bd5-228d-43e4-a0ac-2548261313bc	\N	{}	1
76a5fc2b-0a26-42b1-bf0a-2ea9bf991cac	gshop-public	Nitecore EDC35 5000_image_4_preview	\N	2025-10-24 17:14:39.679946+00	2025-10-24 17:14:39.679946+00	2025-10-24 17:14:39.679946+00	{"eTag": "\\"70b83e036a5b732af92946e7c831711c\\"", "size": 7710, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:40.000Z", "contentLength": 7710, "httpStatusCode": 200}	9ddde8a8-74b0-4e37-b934-47fbd550c817	\N	{}	1
4679b715-4328-4a01-87a4-2ba828749860	gshop-public	Coleman Sundome Camping Tent_1_thumbnail	\N	2025-10-22 16:32:08.849652+00	2025-10-22 16:32:08.849652+00	2025-10-22 16:32:08.849652+00	{"eTag": "\\"9762665f3c58e479a1d1bfd6fd235a6c\\"", "size": 9786, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:09.000Z", "contentLength": 9786, "httpStatusCode": 200}	c0b708c3-75fd-45eb-be04-60879ccb53ae	\N	{}	1
426febf5-3dbd-4e74-bc87-511e16666a1e	gshop-public	Coleman Sundome Camping Tent_2_main	\N	2025-10-22 16:32:09.827557+00	2025-10-22 16:32:09.827557+00	2025-10-22 16:32:09.827557+00	{"eTag": "\\"4fa1b4efd84b71cb01fb13618fa2113d\\"", "size": 98802, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:10.000Z", "contentLength": 98802, "httpStatusCode": 200}	11d26516-1df3-452d-a1cb-a18d4c5a5639	\N	{}	1
9aefa03b-0b00-49d3-9366-a440595cca3b	gshop-public	Coleman Sundome Camping Tent_2_preview	\N	2025-10-22 16:32:10.583538+00	2025-10-22 16:32:10.583538+00	2025-10-22 16:32:10.583538+00	{"eTag": "\\"ac7a34dc452e2d4780a2b8a8ee50fd02\\"", "size": 68982, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:11.000Z", "contentLength": 68982, "httpStatusCode": 200}	d173f7f9-1fbe-4f8a-8107-e4c3980618c3	\N	{}	1
64583aa0-9e63-47ac-9d8f-d420ac6bd086	gshop-public	Coleman Sundome Camping Tent_2_thumbnail	\N	2025-10-22 16:32:11.410913+00	2025-10-22 16:32:11.410913+00	2025-10-22 16:32:11.410913+00	{"eTag": "\\"9f0f1b1b194ab6fa8557454db0e79463\\"", "size": 10034, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:12.000Z", "contentLength": 10034, "httpStatusCode": 200}	6cee8ecf-0da7-469e-bcf2-f94287f5001c	\N	{}	1
1b9cd36e-7605-4e1d-9c27-ce9bc001edfc	gshop-public	Coleman Sundome Camping Tent_3_main	\N	2025-10-22 16:32:12.062281+00	2025-10-22 16:32:12.062281+00	2025-10-22 16:32:12.062281+00	{"eTag": "\\"cdab59651632e83bd627a2c0dceb9724\\"", "size": 43448, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:13.000Z", "contentLength": 43448, "httpStatusCode": 200}	c24414d7-323e-4bbc-b6e3-3ece492a46c1	\N	{}	1
5dc10c80-70e0-46d3-bf85-3aea305d9490	gshop-public	sdfsd_image_0_main	\N	2025-10-24 16:32:38.656952+00	2025-10-24 16:32:38.656952+00	2025-10-24 16:32:38.656952+00	{"eTag": "\\"ea0ba667f4fae87909c81e462573f103\\"", "size": 44128, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:32:39.000Z", "contentLength": 44128, "httpStatusCode": 200}	96bd4348-2bc6-4f2a-8ec3-5ad16f2f6019	\N	{}	1
ffc2eb2c-9e1f-4121-9018-5c49d7ce1c45	gshop-public	Coleman Sundome Camping Tent_3_preview	\N	2025-10-22 16:32:12.882776+00	2025-10-22 16:32:12.882776+00	2025-10-22 16:32:12.882776+00	{"eTag": "\\"bd9391732b4c57fe8c1df954324630a0\\"", "size": 20912, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:13.000Z", "contentLength": 20912, "httpStatusCode": 200}	21041645-f9fb-4502-93ab-aa692956e269	\N	{}	1
cbde5444-15c5-4136-8b14-132fdc237044	gshop-public	sdfs_image_0_main	\N	2025-10-24 16:29:53.52132+00	2025-10-24 16:36:59.707881+00	2025-10-24 16:29:53.52132+00	{"eTag": "\\"8966a88f157cfacfeeffce95c1a81a6a\\"", "size": 52110, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:37:00.000Z", "contentLength": 52110, "httpStatusCode": 200}	56e5f294-674d-4bcf-a4d4-2fbbc2759906	\N	{}	1
4f9551a8-26ab-4c09-b6b5-a7b726df92e6	gshop-public	Coleman Sundome Camping Tent_3_thumbnail	\N	2025-10-22 16:32:13.426667+00	2025-10-22 16:32:13.426667+00	2025-10-22 16:32:13.426667+00	{"eTag": "\\"afcf4666e6a7b2bf4c95a83e61b00bc1\\"", "size": 3772, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:14.000Z", "contentLength": 3772, "httpStatusCode": 200}	84424420-1a27-47cc-9a1c-63948609713d	\N	{}	1
cf6871fb-d919-44ea-9a8c-2f266d358480	gshop-public	sdfs_image_0_preview	\N	2025-10-24 16:29:54.288677+00	2025-10-24 16:37:01.008784+00	2025-10-24 16:29:54.288677+00	{"eTag": "\\"933294de56ba072786ad9ec645979cdf\\"", "size": 28308, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:37:01.000Z", "contentLength": 28308, "httpStatusCode": 200}	a2a0ac15-9074-4a6c-a8ad-6c0e00bcd5ff	\N	{}	1
dc3bf620-ec39-4e24-a0c7-3e0db3c85d54	gshop-public	Coleman Sundome Camping Tent_4_main	\N	2025-10-22 16:32:14.255978+00	2025-10-22 16:32:14.255978+00	2025-10-22 16:32:14.255978+00	{"eTag": "\\"fabe474ed7fc3ab403a386da47378cab\\"", "size": 23796, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:15.000Z", "contentLength": 23796, "httpStatusCode": 200}	6684e903-c773-46f6-b778-5ffbbbcfa934	\N	{}	1
d1151cce-d550-4c06-8d8d-6dca7a61d257	gshop-public	sdfs_image_0_thumbnail	\N	2025-10-24 16:29:55.172576+00	2025-10-24 16:37:01.889363+00	2025-10-24 16:29:55.172576+00	{"eTag": "\\"43fec80e8db6f25b7a0d7d9d87c78100\\"", "size": 5876, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:37:02.000Z", "contentLength": 5876, "httpStatusCode": 200}	91481dd6-321a-402f-ae3e-7ba79574a8c8	\N	{}	1
27df8756-52dd-4003-a824-048757e5f233	gshop-public	Coleman Sundome Camping Tent_4_preview	\N	2025-10-22 16:32:14.896378+00	2025-10-22 16:32:14.896378+00	2025-10-22 16:32:14.896378+00	{"eTag": "\\"72b236a7ab7a4370a0fbe4af9becb4ce\\"", "size": 12160, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:15.000Z", "contentLength": 12160, "httpStatusCode": 200}	26568a2e-2c13-4986-b96a-d41d8d6eb487	\N	{}	1
b5f8d61c-583e-4793-8156-0c61b41b18d6	gshop-public	Coleman Sundome Camping Tent_4_thumbnail	\N	2025-10-22 16:32:15.804704+00	2025-10-22 16:32:15.804704+00	2025-10-22 16:32:15.804704+00	{"eTag": "\\"ae80fadb5021d806abb6d298075e9c99\\"", "size": 2810, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:32:16.000Z", "contentLength": 2810, "httpStatusCode": 200}	998dff2b-b50b-466d-950a-a6f9ff89778a	\N	{}	1
68051020-7566-4c2a-9c8d-123d74ae4955	gshop-public	4 Person Camping Tent_1_main	\N	2025-10-22 16:31:48.800083+00	2025-10-22 16:31:48.800083+00	2025-10-22 16:31:48.800083+00	{"eTag": "\\"9921ee048e08ca1005c88f4272a251c6\\"", "size": 92056, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:49.000Z", "contentLength": 92056, "httpStatusCode": 200}	8a52d242-fd30-4748-80c0-a83eacc1229a	\N	{}	1
71f3b0ce-0af2-43a1-9e1b-c90220afe67f	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_0_main	\N	2025-10-24 16:51:54.837122+00	2025-10-24 16:51:54.837122+00	2025-10-24 16:51:54.837122+00	{"eTag": "\\"501bb130bf59c61a8b1c8dc8789f928c\\"", "size": 42608, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:51:55.000Z", "contentLength": 42608, "httpStatusCode": 200}	d948f055-07d5-4045-8cc3-0ba858baf9b0	\N	{}	1
1c84ad3a-db17-44f0-9ad8-45186a67b3d2	gshop-public	4 Person Camping Tent_1_preview	\N	2025-10-22 16:31:49.676295+00	2025-10-22 16:31:49.676295+00	2025-10-22 16:31:49.676295+00	{"eTag": "\\"c3b380821a9b5d84906fd0b4074f3751\\"", "size": 54142, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T16:31:50.000Z", "contentLength": 54142, "httpStatusCode": 200}	1b43d755-ab63-4446-bee9-5274fd4294ee	\N	{}	1
56c69477-21d0-4a04-952d-e343c4e41483	gshop-public	MOUNTAINTOP 30L Hiking Backpack_5_main	\N	2025-10-22 19:26:59.056493+00	2025-10-22 19:26:59.056493+00	2025-10-22 19:26:59.056493+00	{"eTag": "\\"4fa1b4efd84b71cb01fb13618fa2113d\\"", "size": 98802, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T19:26:59.000Z", "contentLength": 98802, "httpStatusCode": 200}	10586d11-f1a4-43b6-9aa2-a826506d6984	\N	{}	1
d721ceda-7ebc-410a-8296-e28199e2dd10	gshop-public	sdfsd_image_0_preview	\N	2025-10-24 16:32:40.682857+00	2025-10-24 16:32:40.682857+00	2025-10-24 16:32:40.682857+00	{"eTag": "\\"73a71a0b33a00e0ec279ff5d8b23f039\\"", "size": 22778, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:32:41.000Z", "contentLength": 22778, "httpStatusCode": 200}	e56597ac-d97b-4d87-9bba-d24b98de0bc8	\N	{}	1
d5bd6336-6bd7-4612-8879-9b32a3e1cfe2	gshop-public	MOUNTAINTOP 30L Hiking Backpack_5_preview	\N	2025-10-22 19:26:59.699883+00	2025-10-22 19:26:59.699883+00	2025-10-22 19:26:59.699883+00	{"eTag": "\\"ac7a34dc452e2d4780a2b8a8ee50fd02\\"", "size": 68982, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T19:27:00.000Z", "contentLength": 68982, "httpStatusCode": 200}	842949ec-9530-4689-809a-a0af1df5569a	\N	{}	1
c063c095-acd8-4d1e-9350-626d875763bd	gshop-public	Backpacks_preview	\N	2025-10-24 20:15:35.966373+00	2025-10-24 20:15:35.966373+00	2025-10-24 20:15:35.966373+00	{"eTag": "\\"ef243d68689703ef4d18cc54fee7073a\\"", "size": 7948, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:15:36.000Z", "contentLength": 7948, "httpStatusCode": 200}	3bd6378c-a8ac-4875-8e08-ab1aa03819cb	\N	{}	1
ed684f18-7626-4ed8-848f-6dec1e6bcadb	gshop-public	MOUNTAINTOP 30L Hiking Backpack_5_thumbnail	\N	2025-10-22 19:27:00.614937+00	2025-10-22 19:27:00.614937+00	2025-10-22 19:27:00.614937+00	{"eTag": "\\"9f0f1b1b194ab6fa8557454db0e79463\\"", "size": 10034, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T19:27:01.000Z", "contentLength": 10034, "httpStatusCode": 200}	48ed4757-cbec-4e48-abd3-aec92fbb6cf4	\N	{}	1
1813505d-1e6a-46ce-a6ca-a0a2ce5ab3a6	gshop-public	Backpacks_banner	\N	2025-10-22 23:34:47.048606+00	2025-10-22 23:34:47.048606+00	2025-10-22 23:34:47.048606+00	{"eTag": "\\"eb0ec0158f838824758549b4e156fdfb\\"", "size": 55906, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:34:47.000Z", "contentLength": 55906, "httpStatusCode": 200}	550f9d13-275c-4b37-ae07-36e28c966a1e	\N	{}	1
aaf7012d-57da-4c86-a257-9e3acbe19cfe	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_0_main	\N	2025-10-24 17:49:03.902401+00	2025-10-24 17:49:03.902401+00	2025-10-24 17:49:03.902401+00	{"eTag": "\\"48201869c87b222a565bedb9b2dc7a77\\"", "size": 141028, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:04.000Z", "contentLength": 141028, "httpStatusCode": 200}	912e03e7-2681-4372-b1c6-da9fee1e0093	\N	{}	1
651ffdee-f111-4b07-b21a-1d25aa00549b	gshop-public	Loowoko 50L Hiking_image_0_main	\N	2025-10-24 16:16:29.238483+00	2025-10-24 16:16:29.238483+00	2025-10-24 16:16:29.238483+00	{"eTag": "\\"dc2198f308c74aac3e6642215fe4508e\\"", "size": 56652, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:30.000Z", "contentLength": 56652, "httpStatusCode": 200}	15b9aba2-5016-4d3e-8e08-c9cb70a41b0f	\N	{}	1
5b60cf2d-612f-4d2a-96a9-627e19a63ba5	gshop-public	dfsdf_banner	\N	2025-10-22 23:39:50.619609+00	2025-10-22 23:40:09.502243+00	2025-10-22 23:39:50.619609+00	{"eTag": "\\"eb0ec0158f838824758549b4e156fdfb\\"", "size": 55906, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:40:10.000Z", "contentLength": 55906, "httpStatusCode": 200}	076c4f12-c1f2-4e34-a714-2fdbc50ec2db	\N	{}	1
d545a24e-3f65-4bbf-a9e0-368e6a9f4e26	gshop-public	Loowoko 50L Hiking_image_0_preview	\N	2025-10-24 16:16:30.833549+00	2025-10-24 16:16:30.833549+00	2025-10-24 16:16:30.833549+00	{"eTag": "\\"d6719d5bd35817b817e93eedc7a7cd51\\"", "size": 29104, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:31.000Z", "contentLength": 29104, "httpStatusCode": 200}	ef4b4553-9c33-4738-aa18-30fdeea2732c	\N	{}	1
30998c6a-ba66-477c-ad88-86c031622e72	gshop-public	xdd_preview	\N	2025-10-23 23:45:11.758914+00	2025-10-23 23:45:11.758914+00	2025-10-23 23:45:11.758914+00	{"eTag": "\\"a75385d682bca050d9fee32444df8f8c\\"", "size": 262405, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:45:12.000Z", "contentLength": 262405, "httpStatusCode": 200}	e431c126-7908-42f5-b9c6-35b6e229649d	\N	{}	1
65ad038f-5910-468d-944f-a0478ff9191e	gshop-public	Loowoko 50L Hiking_image_0_thumbnail	\N	2025-10-24 16:16:31.656754+00	2025-10-24 16:16:31.656754+00	2025-10-24 16:16:31.656754+00	{"eTag": "\\"6325c9e8af329bb64ce3e282e06a2639\\"", "size": 4952, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:32.000Z", "contentLength": 4952, "httpStatusCode": 200}	965ab1b6-b972-44f3-beda-c0481029a52d	\N	{}	1
ce9032f5-7663-4097-99c5-3e16d8c57f55	gshop-public	Loowoko 50L Hiking_image_1_main	\N	2025-10-24 16:16:32.424954+00	2025-10-24 16:16:32.424954+00	2025-10-24 16:16:32.424954+00	{"eTag": "\\"736cf14ef7f18895e765d59df57532cd\\"", "size": 88982, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:33.000Z", "contentLength": 88982, "httpStatusCode": 200}	35c61075-1469-45c3-825d-9ae729074793	\N	{}	1
9e8c25ba-9296-4b3b-ae6b-96931282346d	gshop-public	Loowoko 50L Hiking_image_1_preview	\N	2025-10-24 16:16:33.516898+00	2025-10-24 16:16:33.516898+00	2025-10-24 16:16:33.516898+00	{"eTag": "\\"e714a8ec8325d57687a999457fc7eda3\\"", "size": 58018, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:34.000Z", "contentLength": 58018, "httpStatusCode": 200}	758216c6-6203-4f7f-b8a1-19681577a452	\N	{}	1
a22644bf-62c0-40f1-b94e-0645d10d0725	gshop-public	Loowoko 50L Hiking_image_1_thumbnail	\N	2025-10-24 16:16:34.209953+00	2025-10-24 16:16:34.209953+00	2025-10-24 16:16:34.209953+00	{"eTag": "\\"c7d135fc97c77ceb902b9a46f439d0d5\\"", "size": 7520, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:35.000Z", "contentLength": 7520, "httpStatusCode": 200}	3b6bd677-d376-445d-b7f4-2d8841657f27	\N	{}	1
6ea50228-e1fc-46ea-a665-9c0ddb283f5c	gshop-public	sdfsd_image_0_thumbnail	\N	2025-10-24 16:32:41.576511+00	2025-10-24 16:32:41.576511+00	2025-10-24 16:32:41.576511+00	{"eTag": "\\"52731a73eb66f5ca57a9943fb7dd328a\\"", "size": 4332, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:32:42.000Z", "contentLength": 4332, "httpStatusCode": 200}	91a8761b-02f1-4ecc-8de3-56a7038dbff9	\N	{}	1
01252939-ebd9-4e66-ae03-47493c8ca63d	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_0_preview	\N	2025-10-24 16:51:55.655199+00	2025-10-24 16:51:55.655199+00	2025-10-24 16:51:55.655199+00	{"eTag": "\\"150080f868778871067151322861e62f\\"", "size": 24418, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:51:56.000Z", "contentLength": 24418, "httpStatusCode": 200}	548eee50-1b41-4630-854d-662617d8f05c	\N	{}	1
760b2754-27dd-47ab-90a4-a997c882690f	gshop-public	Bseash 60L Hiking Camping Backpack_image_2_preview	\N	2025-10-24 16:38:53.691601+00	2025-10-24 16:38:53.691601+00	2025-10-24 16:38:53.691601+00	{"eTag": "\\"933294de56ba072786ad9ec645979cdf\\"", "size": 28308, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:54.000Z", "contentLength": 28308, "httpStatusCode": 200}	e872a3c5-11a5-4e1c-b5b7-1e50c64a6438	\N	{}	1
5f0aeed7-0b43-47e7-840f-5c14ee8201d4	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_0_preview	\N	2025-10-24 17:49:05.035295+00	2025-10-24 17:49:05.035295+00	2025-10-24 17:49:05.035295+00	{"eTag": "\\"b3f579dd2c7543f82765692859fc5269\\"", "size": 25596, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:05.000Z", "contentLength": 25596, "httpStatusCode": 200}	a83c9dab-6205-4deb-9262-0ee0575410e4	\N	{}	1
47dcb472-d69f-4e91-8ce2-2119ffe67325	gshop-public	Bseash 60L Hiking Camping Backpack_image_2_thumbnail	\N	2025-10-24 16:38:54.724282+00	2025-10-24 16:38:54.724282+00	2025-10-24 16:38:54.724282+00	{"eTag": "\\"43fec80e8db6f25b7a0d7d9d87c78100\\"", "size": 5876, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:55.000Z", "contentLength": 5876, "httpStatusCode": 200}	386771af-2c99-40a5-9a84-2b2a8a9af12e	\N	{}	1
251213b3-61cd-4e2a-9d60-f473c79a5023	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_0_thumbnail	\N	2025-10-24 16:51:56.753169+00	2025-10-24 16:51:56.753169+00	2025-10-24 16:51:56.753169+00	{"eTag": "\\"f1ae26e4c0d49fa007a6182c0e92d32f\\"", "size": 4950, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:51:57.000Z", "contentLength": 4950, "httpStatusCode": 200}	64f040c7-4872-4039-b7ee-63a21ac84eb6	\N	{}	1
8a259299-cfaa-423a-bcaf-45c040a9cdf0	gshop-public	Bseash 60L Hiking Camping Backpack_image_3_main	\N	2025-10-24 16:38:55.574062+00	2025-10-24 16:38:55.574062+00	2025-10-24 16:38:55.574062+00	{"eTag": "\\"ea0ba667f4fae87909c81e462573f103\\"", "size": 44128, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:56.000Z", "contentLength": 44128, "httpStatusCode": 200}	b9b3aae3-9097-4a90-87e1-288d81974aa7	\N	{}	1
e7b1b10d-efc8-4202-a1f3-ba3eb6ed1ab3	gshop-public	Bseash 60L Hiking Camping Backpack_image_3_preview	\N	2025-10-24 16:38:56.567005+00	2025-10-24 16:38:56.567005+00	2025-10-24 16:38:56.567005+00	{"eTag": "\\"73a71a0b33a00e0ec279ff5d8b23f039\\"", "size": 22778, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:57.000Z", "contentLength": 22778, "httpStatusCode": 200}	e1c94c05-fab4-440b-84b0-ddb23643d00c	\N	{}	1
a9ef44eb-8b43-4ecd-adaf-93f3fe1b8d08	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_1_main	\N	2025-10-24 16:51:57.831478+00	2025-10-24 16:51:57.831478+00	2025-10-24 16:51:57.831478+00	{"eTag": "\\"937e801a62c5db9c29a8d4594c044519\\"", "size": 35242, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:51:58.000Z", "contentLength": 35242, "httpStatusCode": 200}	b6d3f8ad-cde2-40f8-8f13-069477545e1e	\N	{}	1
b9cc2e13-a2de-457d-a9b3-9be544eb7d20	gshop-public	Bseash 60L Hiking Camping Backpack_image_3_thumbnail	\N	2025-10-24 16:38:57.139501+00	2025-10-24 16:38:57.139501+00	2025-10-24 16:38:57.139501+00	{"eTag": "\\"52731a73eb66f5ca57a9943fb7dd328a\\"", "size": 4332, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:58.000Z", "contentLength": 4332, "httpStatusCode": 200}	281b83f7-9a3f-4b15-8ca1-641190bc0431	\N	{}	1
41fb1a0f-de8f-4c0c-823e-e2f471ad317e	gshop-public	Bseash 60L Hiking Camping Backpack_image_4_main	\N	2025-10-24 16:38:58.356035+00	2025-10-24 16:38:58.356035+00	2025-10-24 16:38:58.356035+00	{"eTag": "\\"25069e76c2bb844444d4149d16feebc1\\"", "size": 75874, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:59.000Z", "contentLength": 75874, "httpStatusCode": 200}	3437a7e3-05ce-4cdf-96d4-e4776d4b0100	\N	{}	1
4f0c5a3a-78ce-4555-b475-35622346bead	gshop-public	Bseash 60L Hiking Camping Backpack_image_4_preview	\N	2025-10-24 16:38:58.945422+00	2025-10-24 16:38:58.945422+00	2025-10-24 16:38:58.945422+00	{"eTag": "\\"343b214160db761b15a11eda6eadeab8\\"", "size": 49840, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:59.000Z", "contentLength": 49840, "httpStatusCode": 200}	e5b98c4c-63fd-48af-83f7-e09ad93df6ad	\N	{}	1
1500dc31-cc03-4b6d-8f88-3f452615bb5a	gshop-public	Bseash 60L Hiking Camping Backpack_image_4_thumbnail	\N	2025-10-24 16:38:59.916358+00	2025-10-24 16:38:59.916358+00	2025-10-24 16:38:59.916358+00	{"eTag": "\\"f2040ee19aa2584e5c0a4f1b560b9a8c\\"", "size": 9160, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:39:00.000Z", "contentLength": 9160, "httpStatusCode": 200}	7d8f18a8-2269-4f0a-8452-44bd0de12e9a	\N	{}	1
ec76c0d8-8074-4fd5-aac0-b7ddafac40a7	gshop-public	Loowoko 50L Hiking Backpack_image_0_main	\N	2025-10-24 16:40:10.212552+00	2025-10-24 16:40:10.212552+00	2025-10-24 16:40:10.212552+00	{"eTag": "\\"dc2198f308c74aac3e6642215fe4508e\\"", "size": 56652, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:11.000Z", "contentLength": 56652, "httpStatusCode": 200}	c2fdd9f1-1dd2-4a4e-a9b5-848bfdad1e50	\N	{}	1
418d4447-49d3-4e40-8371-5a3201f6d501	gshop-public	Loowoko 50L Hiking_image_2_main	\N	2025-10-24 16:16:35.3983+00	2025-10-24 16:16:35.3983+00	2025-10-24 16:16:35.3983+00	{"eTag": "\\"844910f60d8a202d4dec8e83130169e9\\"", "size": 57984, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:36.000Z", "contentLength": 57984, "httpStatusCode": 200}	bfc18dac-2938-424f-9ec2-d2629dc1ddd7	\N	{}	1
f63d5891-99b2-464a-a2f5-87afd63cf6b3	gshop-public	Loowoko 50L Hiking Backpack_image_0_preview	\N	2025-10-24 16:40:10.814618+00	2025-10-24 16:40:10.814618+00	2025-10-24 16:40:10.814618+00	{"eTag": "\\"d6719d5bd35817b817e93eedc7a7cd51\\"", "size": 29104, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:11.000Z", "contentLength": 29104, "httpStatusCode": 200}	00ae7465-7ddd-4a69-836b-a351dbb8200c	\N	{}	1
b2d1181b-9b70-4044-8575-bd55ca6f5504	gshop-public	Loowoko 50L Hiking_image_2_preview	\N	2025-10-24 16:16:36.038372+00	2025-10-24 16:16:36.038372+00	2025-10-24 16:16:36.038372+00	{"eTag": "\\"2574f38be496ad8d7f32f4b0553fcc57\\"", "size": 34384, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:37.000Z", "contentLength": 34384, "httpStatusCode": 200}	27ccbbe2-dea8-47e7-a5bb-0fea38d5f5c0	\N	{}	1
999d250a-1764-498c-997e-cd511d7b157a	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_1_preview	\N	2025-10-24 16:51:59.724171+00	2025-10-24 16:51:59.724171+00	2025-10-24 16:51:59.724171+00	{"eTag": "\\"2487696eb23adc5cec1307c31f01012e\\"", "size": 19992, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:00.000Z", "contentLength": 19992, "httpStatusCode": 200}	c7fde449-9b2c-4b55-b55a-a1c625563642	\N	{}	1
2236731f-8b62-43e6-bf40-bf5627a5c930	gshop-public	Loowoko 50L Hiking_image_2_thumbnail	\N	2025-10-24 16:16:37.078688+00	2025-10-24 16:16:37.078688+00	2025-10-24 16:16:37.078688+00	{"eTag": "\\"b52d9f6263c6d9747d68c6a203184c00\\"", "size": 5892, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:38.000Z", "contentLength": 5892, "httpStatusCode": 200}	78be51e3-2f5c-49c7-9659-491e7fd65bd9	\N	{}	1
d54c1351-76d5-49cf-9020-84c8543edcc0	gshop-public	Loowoko 50L Hiking Backpack_image_0_thumbnail	\N	2025-10-24 16:40:11.851079+00	2025-10-24 16:40:11.851079+00	2025-10-24 16:40:11.851079+00	{"eTag": "\\"6325c9e8af329bb64ce3e282e06a2639\\"", "size": 4952, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:12.000Z", "contentLength": 4952, "httpStatusCode": 200}	b2b7086c-0d01-437c-bf26-c82d72d4e838	\N	{}	1
4914a62e-2000-4927-bb51-05ed622b2ac0	gshop-public	Loowoko 50L Hiking_image_3_main	\N	2025-10-24 16:16:37.924564+00	2025-10-24 16:16:37.924564+00	2025-10-24 16:16:37.924564+00	{"eTag": "\\"59956aca9821b82e69ff8eef9d6473f3\\"", "size": 73018, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:38.000Z", "contentLength": 73018, "httpStatusCode": 200}	d1af17d7-7600-4eb0-8274-791d3e1a4c76	\N	{}	1
1d76d30d-2a2a-45f3-93f4-57dfee4232a0	gshop-public	Loowoko 50L Hiking_image_3_preview	\N	2025-10-24 16:16:38.978279+00	2025-10-24 16:16:38.978279+00	2025-10-24 16:16:38.978279+00	{"eTag": "\\"84360282c2eff28f550cb6e4fec77f16\\"", "size": 32604, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:39.000Z", "contentLength": 32604, "httpStatusCode": 200}	b3778d4e-3474-42d5-80a1-f830c1dc2bc8	\N	{}	1
a63bb7f7-8073-4179-8345-85100a7ec5c5	gshop-public	Loowoko 50L Hiking Backpack_image_1_main	\N	2025-10-24 16:40:12.582433+00	2025-10-24 16:40:12.582433+00	2025-10-24 16:40:12.582433+00	{"eTag": "\\"736cf14ef7f18895e765d59df57532cd\\"", "size": 88982, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:13.000Z", "contentLength": 88982, "httpStatusCode": 200}	73d581fa-d6e7-4dd6-9f17-c3ad3d8fb07c	\N	{}	1
dcdf13de-8229-4a6f-97d9-056caf31aa4a	gshop-public	Loowoko 50L Hiking_image_3_thumbnail	\N	2025-10-24 16:16:40.364546+00	2025-10-24 16:16:40.364546+00	2025-10-24 16:16:40.364546+00	{"eTag": "\\"4823b0eaefc3aa0addcef6b4b4886dc3\\"", "size": 4500, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:41.000Z", "contentLength": 4500, "httpStatusCode": 200}	1e9b2a35-4f76-4331-8d7b-5985587fb4c8	\N	{}	1
a8e38900-7da5-48e4-9f81-cc605351a5cf	gshop-public	Loowoko 50L Hiking_image_4_main	\N	2025-10-24 16:16:41.728877+00	2025-10-24 16:16:41.728877+00	2025-10-24 16:16:41.728877+00	{"eTag": "\\"e315cafc1558fdfd1ad6370979306907\\"", "size": 73446, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:42.000Z", "contentLength": 73446, "httpStatusCode": 200}	1ef0eb61-9e94-4893-a88e-033bafad6aa0	\N	{}	1
ba691308-c730-4aa3-b615-3d7a53dd7bd1	gshop-public	Loowoko 50L Hiking_image_4_preview	\N	2025-10-24 16:16:42.329637+00	2025-10-24 16:16:42.329637+00	2025-10-24 16:16:42.329637+00	{"eTag": "\\"2053f4eac743a042c6621291ef74b236\\"", "size": 44988, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:43.000Z", "contentLength": 44988, "httpStatusCode": 200}	dc329f9b-a151-48b9-bf15-bb3100503383	\N	{}	1
185d3950-f6b4-4070-b1b6-308f398e4601	gshop-public	Loowoko 50L Hiking_image_4_thumbnail	\N	2025-10-24 16:16:43.218302+00	2025-10-24 16:16:43.218302+00	2025-10-24 16:16:43.218302+00	{"eTag": "\\"31a20ccaaeff4dc7af6729f9cd2784e0\\"", "size": 7750, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:44.000Z", "contentLength": 7750, "httpStatusCode": 200}	02d243c1-ac79-47cb-a398-f82de62f10d3	\N	{}	1
8b367282-14e0-460d-8d24-ad0c0be81f38	gshop-public	Loowoko 50L Hiking_image_5_main	\N	2025-10-24 16:16:43.862323+00	2025-10-24 16:16:43.862323+00	2025-10-24 16:16:43.862323+00	{"eTag": "\\"db5b87214704f95bd43eac0a8caa8fcb\\"", "size": 81212, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:44.000Z", "contentLength": 81212, "httpStatusCode": 200}	e068815b-a106-46e5-b38c-403233c34a5a	\N	{}	1
7cb3c185-79f0-43af-a14e-534cc0d3cbca	gshop-public	Loowoko 50L Hiking_image_5_preview	\N	2025-10-24 16:16:45.268911+00	2025-10-24 16:16:45.268911+00	2025-10-24 16:16:45.268911+00	{"eTag": "\\"793c7ddd4e046126977ec41c40208f35\\"", "size": 46686, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:46.000Z", "contentLength": 46686, "httpStatusCode": 200}	eea0abb6-9ea9-4783-bbfa-065794fef6ac	\N	{}	1
299423bc-9696-45d2-a0d5-c52595cf8445	gshop-public	Loowoko 50L Hiking_image_5_thumbnail	\N	2025-10-24 16:16:46.010064+00	2025-10-24 16:16:46.010064+00	2025-10-24 16:16:46.010064+00	{"eTag": "\\"3fe1cd4ddd6f99b2115cc1b7f3300424\\"", "size": 7134, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:16:46.000Z", "contentLength": 7134, "httpStatusCode": 200}	ba24c020-718f-4778-afef-4cdb350fb3e0	\N	{}	1
c0045096-c29f-43af-8094-bfb788a1846e	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_1_thumbnail	\N	2025-10-24 16:52:03.339649+00	2025-10-24 16:52:03.339649+00	2025-10-24 16:52:03.339649+00	{"eTag": "\\"b664b2061e29f7c75f300caf447ed13c\\"", "size": 4000, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:04.000Z", "contentLength": 4000, "httpStatusCode": 200}	c2796f86-9459-4d36-b888-39dd90b62b8f	\N	{}	1
391bad32-f5a0-4e3f-9cce-22b2bd829b78	gshop-public	Bseash 60L Hiking Camping Backpack_image_0_main	\N	2025-10-24 16:18:21.830867+00	2025-10-24 16:38:48.077151+00	2025-10-24 16:18:21.830867+00	{"eTag": "\\"3a5acb052a46f7329ae793567f2c023b\\"", "size": 53970, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:49.000Z", "contentLength": 53970, "httpStatusCode": 200}	90efaf3b-0c98-4d9c-867d-55a36729c98b	\N	{}	1
c060e548-76d3-43d7-ae99-64d27112e2f5	gshop-public	Bseash 60L Hiking Camping Backpack_image_0_thumbnail	\N	2025-10-24 16:18:23.650694+00	2025-10-24 16:38:49.716291+00	2025-10-24 16:18:23.650694+00	{"eTag": "\\"c46ddf6651917aa432729fe2a263f6cd\\"", "size": 3874, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:50.000Z", "contentLength": 3874, "httpStatusCode": 200}	ccb1b13f-46fd-4ab7-a2e8-221a3208119b	\N	{}	1
ceb25072-fc87-4679-b7aa-6d7e486b85c6	gshop-public	Bseash 60L Hiking Camping Backpack_image_0_preview	\N	2025-10-24 16:18:22.481412+00	2025-10-24 16:38:48.752193+00	2025-10-24 16:18:22.481412+00	{"eTag": "\\"6f3ebf7c5a0991dec3ea39d5680fbb57\\"", "size": 22582, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:49.000Z", "contentLength": 22582, "httpStatusCode": 200}	3cf5f6ee-0e67-4006-a688-3fc74631eaa9	\N	{}	1
4a6b450c-5958-48b9-9bb2-6ef65e34ac4a	gshop-public	Bseash 60L Hiking Camping Backpack_image_1_preview	\N	2025-10-24 16:18:25.21104+00	2025-10-24 16:38:51.413235+00	2025-10-24 16:18:25.21104+00	{"eTag": "\\"f013885edb71146cbaae8b7066b33adf\\"", "size": 14268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:52.000Z", "contentLength": 14268, "httpStatusCode": 200}	3f5c5e7a-70b8-4d38-bb55-2190e335fa7b	\N	{}	1
97123cb2-7180-4552-ba12-d2b89efcdc97	gshop-public	Bseash 60L Hiking Camping Backpack_image_1_main	\N	2025-10-24 16:18:24.260658+00	2025-10-24 16:38:50.412368+00	2025-10-24 16:18:24.260658+00	{"eTag": "\\"0ca6888b32dbb2143595987f5a42ce0e\\"", "size": 25734, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:51.000Z", "contentLength": 25734, "httpStatusCode": 200}	83d1edbb-55b5-4ec5-9869-ff0dd168d1a1	\N	{}	1
8e1dd21b-8b0a-49ce-83d5-fd0fc1013c5d	gshop-public	Bseash 60L Hiking Camping Backpack_image_2_main	\N	2025-10-24 16:18:26.896876+00	2025-10-24 16:38:53.02429+00	2025-10-24 16:18:26.896876+00	{"eTag": "\\"8966a88f157cfacfeeffce95c1a81a6a\\"", "size": 52110, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:53.000Z", "contentLength": 52110, "httpStatusCode": 200}	f4347ec6-3e97-442f-a5f4-9dfed285b373	\N	{}	1
141ee50f-60aa-4f19-86c3-5a0636226b0b	gshop-public	Bseash 60L Hiking Camping Backpack_image_1_thumbnail	\N	2025-10-24 16:18:25.857262+00	2025-10-24 16:38:51.986751+00	2025-10-24 16:18:25.857262+00	{"eTag": "\\"92c1b67d2867c0512c76b964984bd402\\"", "size": 3368, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:38:52.000Z", "contentLength": 3368, "httpStatusCode": 200}	38cc64f0-16fc-4782-ba1f-d654a6a7de5d	\N	{}	1
dd40e530-a61d-4592-a0b4-4cf66e94705a	gshop-public	sdfsdf_image_0_main	\N	2025-10-24 16:19:20.229463+00	2025-10-24 16:19:20.229463+00	2025-10-24 16:19:20.229463+00	{"eTag": "\\"0ca6888b32dbb2143595987f5a42ce0e\\"", "size": 25734, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:21.000Z", "contentLength": 25734, "httpStatusCode": 200}	9aa7611f-ecfa-494f-a1e9-6d826c70ae04	\N	{}	1
69c1fa6e-7aa7-44df-b58f-3cea70753ebe	gshop-public	Loowoko 50L Hiking Backpack_image_1_preview	\N	2025-10-24 16:40:13.703419+00	2025-10-24 16:40:13.703419+00	2025-10-24 16:40:13.703419+00	{"eTag": "\\"e714a8ec8325d57687a999457fc7eda3\\"", "size": 58018, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:14.000Z", "contentLength": 58018, "httpStatusCode": 200}	b60b419d-20b7-4fb9-a0a7-40890239f19b	\N	{}	1
0e814691-9469-41a4-917e-6080f9e228d2	gshop-public	sdfsdf_image_0_preview	\N	2025-10-24 16:19:20.792539+00	2025-10-24 16:19:20.792539+00	2025-10-24 16:19:20.792539+00	{"eTag": "\\"f013885edb71146cbaae8b7066b33adf\\"", "size": 14268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:21.000Z", "contentLength": 14268, "httpStatusCode": 200}	2fdb333a-18ab-4959-8a7f-27453f366735	\N	{}	1
61db45f5-5935-403e-bbbd-a723281d58d5	gshop-public	sdfsdf_image_0_thumbnail	\N	2025-10-24 16:19:21.709252+00	2025-10-24 16:19:21.709252+00	2025-10-24 16:19:21.709252+00	{"eTag": "\\"92c1b67d2867c0512c76b964984bd402\\"", "size": 3368, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:22.000Z", "contentLength": 3368, "httpStatusCode": 200}	a788c15b-df44-44b6-b99c-2002bc354843	\N	{}	1
92c5ce3c-3c07-4149-8742-4109abdc1743	gshop-public	Loowoko 50L Hiking Backpack_image_1_thumbnail	\N	2025-10-24 16:40:14.267656+00	2025-10-24 16:40:14.267656+00	2025-10-24 16:40:14.267656+00	{"eTag": "\\"c7d135fc97c77ceb902b9a46f439d0d5\\"", "size": 7520, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:15.000Z", "contentLength": 7520, "httpStatusCode": 200}	6026f33d-5c3c-4445-a132-c1c386fe344f	\N	{}	1
f11fc431-2724-439f-bae4-327dd359bf05	gshop-public	sdfsdf_image_1_main	\N	2025-10-24 16:19:22.424156+00	2025-10-24 16:19:22.424156+00	2025-10-24 16:19:22.424156+00	{"eTag": "\\"8966a88f157cfacfeeffce95c1a81a6a\\"", "size": 52110, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:23.000Z", "contentLength": 52110, "httpStatusCode": 200}	b70dd35e-08c3-482d-8d24-3daf312b6935	\N	{}	1
be79e039-2b82-4eb2-8040-794f2aeabe4c	gshop-public	Loowoko 50L Hiking Backpack_image_2_main	\N	2025-10-24 16:40:15.626119+00	2025-10-24 16:40:15.626119+00	2025-10-24 16:40:15.626119+00	{"eTag": "\\"844910f60d8a202d4dec8e83130169e9\\"", "size": 57984, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:16.000Z", "contentLength": 57984, "httpStatusCode": 200}	154a9cea-2237-4c3b-92a2-e59038509db2	\N	{}	1
ca3637b8-37ad-4bd6-bd16-1aa6295abef3	gshop-public	Loowoko 50L Hiking Backpack_image_2_preview	\N	2025-10-24 16:40:16.653709+00	2025-10-24 16:40:16.653709+00	2025-10-24 16:40:16.653709+00	{"eTag": "\\"2574f38be496ad8d7f32f4b0553fcc57\\"", "size": 34384, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:17.000Z", "contentLength": 34384, "httpStatusCode": 200}	e496e7e8-717c-4daa-b4c6-75c06d1489b9	\N	{}	1
95e6799d-d125-47d1-9f0e-67753187d960	gshop-public	sdfsdf_image_1_preview	\N	2025-10-24 16:19:23.554927+00	2025-10-24 16:19:23.554927+00	2025-10-24 16:19:23.554927+00	{"eTag": "\\"933294de56ba072786ad9ec645979cdf\\"", "size": 28308, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:24.000Z", "contentLength": 28308, "httpStatusCode": 200}	9c2fc11c-c60f-4268-a06c-38bfd6e3ecdb	\N	{}	1
855a81a1-207e-446b-8b87-9847f005a7a3	gshop-public	Loowoko 50L Hiking Backpack_image_2_thumbnail	\N	2025-10-24 16:40:18.606016+00	2025-10-24 16:40:18.606016+00	2025-10-24 16:40:18.606016+00	{"eTag": "\\"b52d9f6263c6d9747d68c6a203184c00\\"", "size": 5892, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:19.000Z", "contentLength": 5892, "httpStatusCode": 200}	b22aa866-5b8b-446b-a8d8-4400655b5184	\N	{}	1
8c23f53e-5130-4e9f-8dfa-ef4bb00e0fb9	gshop-public	sdfsdf_image_1_thumbnail	\N	2025-10-24 16:19:24.544378+00	2025-10-24 16:19:24.544378+00	2025-10-24 16:19:24.544378+00	{"eTag": "\\"43fec80e8db6f25b7a0d7d9d87c78100\\"", "size": 5876, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:25.000Z", "contentLength": 5876, "httpStatusCode": 200}	584252c4-e21d-4d9a-931d-e3717039b002	\N	{}	1
f3cab548-c434-4332-90e6-74c33e7f3785	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_2_main	\N	2025-10-24 16:52:04.684819+00	2025-10-24 16:52:04.684819+00	2025-10-24 16:52:04.684819+00	{"eTag": "\\"54abac4277e270090a53cd433197b32e\\"", "size": 68886, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:05.000Z", "contentLength": 68886, "httpStatusCode": 200}	f62458e8-4525-4d6d-a71a-fab727cbab4e	\N	{}	1
c9e284f9-41c5-4c9a-bdaf-562f35587747	gshop-public	sdfsdf_image_2_main	\N	2025-10-24 16:19:25.54815+00	2025-10-24 16:19:25.54815+00	2025-10-24 16:19:25.54815+00	{"eTag": "\\"ea0ba667f4fae87909c81e462573f103\\"", "size": 44128, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:26.000Z", "contentLength": 44128, "httpStatusCode": 200}	7fd86b15-8261-47be-9f45-23b6608d65ef	\N	{}	1
6a60a5e7-c9bd-4f11-b6e2-7e77fc969f4e	gshop-public	Loowoko 50L Hiking Backpack_image_3_main	\N	2025-10-24 16:40:19.27141+00	2025-10-24 16:40:19.27141+00	2025-10-24 16:40:19.27141+00	{"eTag": "\\"59956aca9821b82e69ff8eef9d6473f3\\"", "size": 73018, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:20.000Z", "contentLength": 73018, "httpStatusCode": 200}	2efd0d8e-928e-453a-a86c-e2f22382f507	\N	{}	1
a8d88140-5d6b-49b0-8165-45f775261518	gshop-public	sdfsdf_image_2_preview	\N	2025-10-24 16:19:26.237578+00	2025-10-24 16:19:26.237578+00	2025-10-24 16:19:26.237578+00	{"eTag": "\\"73a71a0b33a00e0ec279ff5d8b23f039\\"", "size": 22778, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:27.000Z", "contentLength": 22778, "httpStatusCode": 200}	5f02185a-f50a-477f-8e62-cbe02bc95845	\N	{}	1
809069f6-e6df-49e9-8871-21dcd9200301	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_0_thumbnail	\N	2025-10-24 17:49:05.995275+00	2025-10-24 17:49:05.995275+00	2025-10-24 17:49:05.995275+00	{"eTag": "\\"2b6bf6d458da24dbcb923acf741fd069\\"", "size": 4284, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:06.000Z", "contentLength": 4284, "httpStatusCode": 200}	9148d84c-dba6-4bf9-bdea-f4c833ab8ff8	\N	{}	1
9400b992-f022-4bcd-aa70-8c51759c10a2	gshop-public	sdfsdf_image_2_thumbnail	\N	2025-10-24 16:19:27.266332+00	2025-10-24 16:19:27.266332+00	2025-10-24 16:19:27.266332+00	{"eTag": "\\"52731a73eb66f5ca57a9943fb7dd328a\\"", "size": 4332, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:28.000Z", "contentLength": 4332, "httpStatusCode": 200}	9ea54c4e-b849-460d-8852-cec3b37bb85b	\N	{}	1
6ff1f4e7-c620-4fa8-b162-8a866fdf90cf	gshop-public	Loowoko 50L Hiking Backpack_image_3_preview	\N	2025-10-24 16:40:20.214376+00	2025-10-24 16:40:20.214376+00	2025-10-24 16:40:20.214376+00	{"eTag": "\\"84360282c2eff28f550cb6e4fec77f16\\"", "size": 32604, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:21.000Z", "contentLength": 32604, "httpStatusCode": 200}	3a6d067c-e3c9-4e48-a31a-a32281254de9	\N	{}	1
83694a4d-ad52-42fd-a9e7-f0d049bb3177	gshop-public	sdfsdf_image_3_main	\N	2025-10-24 16:19:28.212909+00	2025-10-24 16:19:28.212909+00	2025-10-24 16:19:28.212909+00	{"eTag": "\\"25069e76c2bb844444d4149d16feebc1\\"", "size": 75874, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:29.000Z", "contentLength": 75874, "httpStatusCode": 200}	cce1cae5-1318-4aa7-b0f4-8885a4b6df16	\N	{}	1
c14f7267-a850-44b3-b364-8d8069d770d2	gshop-public	sdfsdf_image_3_preview	\N	2025-10-24 16:19:29.208168+00	2025-10-24 16:19:29.208168+00	2025-10-24 16:19:29.208168+00	{"eTag": "\\"343b214160db761b15a11eda6eadeab8\\"", "size": 49840, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:30.000Z", "contentLength": 49840, "httpStatusCode": 200}	1c6dd7a6-82ef-42fc-9e76-aa7911050734	\N	{}	1
1b7b81c8-151c-4f7b-a025-7974a5e99871	gshop-public	Loowoko 50L Hiking Backpack_image_3_thumbnail	\N	2025-10-24 16:40:20.853023+00	2025-10-24 16:40:20.853023+00	2025-10-24 16:40:20.853023+00	{"eTag": "\\"4823b0eaefc3aa0addcef6b4b4886dc3\\"", "size": 4500, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:21.000Z", "contentLength": 4500, "httpStatusCode": 200}	f47bbe26-eaf7-4a97-86c7-9c5c80f0bb09	\N	{}	1
dcd8e09f-b584-4a5b-9845-706f34bd2d04	gshop-public	sdfsdf_image_3_thumbnail	\N	2025-10-24 16:19:29.89504+00	2025-10-24 16:19:29.89504+00	2025-10-24 16:19:29.89504+00	{"eTag": "\\"f2040ee19aa2584e5c0a4f1b560b9a8c\\"", "size": 9160, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:30.000Z", "contentLength": 9160, "httpStatusCode": 200}	39ea9e50-ee64-4ab3-bf6b-541063efa31b	\N	{}	1
c351cd93-838e-458b-9f25-a6e3cf3d55d6	gshop-public	sdfsdf_image_4_main	\N	2025-10-24 16:19:31.065402+00	2025-10-24 16:19:31.065402+00	2025-10-24 16:19:31.065402+00	{"eTag": "\\"3a5acb052a46f7329ae793567f2c023b\\"", "size": 53970, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:32.000Z", "contentLength": 53970, "httpStatusCode": 200}	fd41324f-bea3-4dcb-9506-4551af628871	\N	{}	1
1464d2f5-b2a3-47fa-9256-842642650963	gshop-public	sdfsdf_image_4_preview	\N	2025-10-24 16:19:31.588053+00	2025-10-24 16:19:31.588053+00	2025-10-24 16:19:31.588053+00	{"eTag": "\\"6f3ebf7c5a0991dec3ea39d5680fbb57\\"", "size": 22582, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:32.000Z", "contentLength": 22582, "httpStatusCode": 200}	d145e990-db88-43be-969c-cf06377b1508	\N	{}	1
f761a81c-1058-48dd-b2f9-f7683acfd1a5	gshop-public	sdfsdf_image_4_thumbnail	\N	2025-10-24 16:19:32.45161+00	2025-10-24 16:19:32.45161+00	2025-10-24 16:19:32.45161+00	{"eTag": "\\"c46ddf6651917aa432729fe2a263f6cd\\"", "size": 3874, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:19:33.000Z", "contentLength": 3874, "httpStatusCode": 200}	58c60ad0-7ada-4f6a-be85-c87b779e99c6	\N	{}	1
ce741f46-eb1f-4ccb-97b4-859ef37e74d7	gshop-public	dfd_image_0_main	\N	2025-10-24 16:21:05.720075+00	2025-10-24 16:21:05.720075+00	2025-10-24 16:21:05.720075+00	{"eTag": "\\"0ca6888b32dbb2143595987f5a42ce0e\\"", "size": 25734, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:21:06.000Z", "contentLength": 25734, "httpStatusCode": 200}	f08f9f59-1021-4c67-96b2-cc783572c297	\N	{}	1
7af65d9f-1b9c-4050-b1b6-ac1af3634454	gshop-public	Loowoko 50L Hiking Backpack_image_4_main	\N	2025-10-24 16:40:21.862252+00	2025-10-24 16:40:21.862252+00	2025-10-24 16:40:21.862252+00	{"eTag": "\\"e315cafc1558fdfd1ad6370979306907\\"", "size": 73446, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:22.000Z", "contentLength": 73446, "httpStatusCode": 200}	99e1f27e-a9b8-4615-831d-1764cab0e600	\N	{}	1
bebe6414-3df4-40f8-9894-69a881b761fe	gshop-public	dfd_image_0_preview	\N	2025-10-24 16:21:06.468667+00	2025-10-24 16:21:06.468667+00	2025-10-24 16:21:06.468667+00	{"eTag": "\\"f013885edb71146cbaae8b7066b33adf\\"", "size": 14268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:21:07.000Z", "contentLength": 14268, "httpStatusCode": 200}	d1621643-2177-4724-a01b-8ad8ee78f6e8	\N	{}	1
23cfa18a-973d-40f4-848d-28609eff5ce0	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_2_preview	\N	2025-10-24 16:52:05.840611+00	2025-10-24 16:52:05.840611+00	2025-10-24 16:52:05.840611+00	{"eTag": "\\"1b4815705ee8cdd0dd3cb161c75509ca\\"", "size": 43714, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:06.000Z", "contentLength": 43714, "httpStatusCode": 200}	0c776efd-0b20-48cd-8fa7-aaab13ae1d6b	\N	{}	1
e118e171-f536-4ee3-b232-d616ceb64ddd	gshop-public	dfd_image_0_thumbnail	\N	2025-10-24 16:21:07.357763+00	2025-10-24 16:21:07.357763+00	2025-10-24 16:21:07.357763+00	{"eTag": "\\"92c1b67d2867c0512c76b964984bd402\\"", "size": 3368, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:21:08.000Z", "contentLength": 3368, "httpStatusCode": 200}	a7fda7aa-246e-4fbb-8a9e-bfbedf31cf51	\N	{}	1
7fff1e9d-a785-463e-804c-9b176aa75a59	gshop-public	Loowoko 50L Hiking Backpack_image_4_preview	\N	2025-10-24 16:40:22.703309+00	2025-10-24 16:40:22.703309+00	2025-10-24 16:40:22.703309+00	{"eTag": "\\"2053f4eac743a042c6621291ef74b236\\"", "size": 44988, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:23.000Z", "contentLength": 44988, "httpStatusCode": 200}	9eed7566-5ce2-4186-9000-496ceb097948	\N	{}	1
5ccc3d6d-7a4c-483c-b166-017f6e72986a	gshop-public	dfsfd_image_0_main	\N	2025-10-24 16:24:10.88889+00	2025-10-24 16:24:10.88889+00	2025-10-24 16:24:10.88889+00	{"eTag": "\\"0ca6888b32dbb2143595987f5a42ce0e\\"", "size": 25734, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:24:11.000Z", "contentLength": 25734, "httpStatusCode": 200}	cac4152d-2237-46c9-b7b2-59aad9aa1849	\N	{}	1
09e82aa6-1099-468f-a634-718dcfc5585f	gshop-public	site-icon.png	\N	2025-10-24 23:58:27.812874+00	2025-10-24 23:58:27.812874+00	2025-10-24 23:58:27.812874+00	{"eTag": "\\"38807de5f00ad956f0d2b8b6ee75e8b6\\"", "size": 3342, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T23:58:28.000Z", "contentLength": 3342, "httpStatusCode": 200}	85fcba75-900d-47a9-b372-a4651b77ef90	\N	{}	1
eee49459-27c8-4613-ace3-042189af52b8	gshop-public	sdfsf_image_0_main	\N	2025-10-24 16:24:20.589712+00	2025-10-24 16:24:20.589712+00	2025-10-24 16:24:20.589712+00	{"eTag": "\\"0ca6888b32dbb2143595987f5a42ce0e\\"", "size": 25734, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:24:21.000Z", "contentLength": 25734, "httpStatusCode": 200}	d55edda5-1d19-4acc-8d86-6a484311e506	\N	{}	1
ee753f36-1f02-46c6-9bfc-271ddeb2d65f	gshop-public	Loowoko 50L Hiking Backpack_image_4_thumbnail	\N	2025-10-24 16:40:23.883135+00	2025-10-24 16:40:23.883135+00	2025-10-24 16:40:23.883135+00	{"eTag": "\\"31a20ccaaeff4dc7af6729f9cd2784e0\\"", "size": 7750, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:24.000Z", "contentLength": 7750, "httpStatusCode": 200}	7af08db7-b30d-42ba-a769-fc471bde20cb	\N	{}	1
2b457dad-9187-4192-a393-592dae177ab5	gshop-public	sdfsf_image_0_preview	\N	2025-10-24 16:24:21.307602+00	2025-10-24 16:24:21.307602+00	2025-10-24 16:24:21.307602+00	{"eTag": "\\"f013885edb71146cbaae8b7066b33adf\\"", "size": 14268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:24:22.000Z", "contentLength": 14268, "httpStatusCode": 200}	e640d742-b79c-4bb9-99a5-b6a2f0f05b06	\N	{}	1
1de1fd6c-e444-4e8c-a9d4-6f31ff24ded5	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_2_thumbnail	\N	2025-10-24 16:52:06.43283+00	2025-10-24 16:52:06.43283+00	2025-10-24 16:52:06.43283+00	{"eTag": "\\"a7b7aa99163780d87eba103dafc620d3\\"", "size": 7120, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:07.000Z", "contentLength": 7120, "httpStatusCode": 200}	895b9611-c711-4065-8d15-0353848762e8	\N	{}	1
8afa119e-1e30-4aef-ab3a-8a2c4b96b962	gshop-public	sdfsf_image_0_thumbnail	\N	2025-10-24 16:24:22.172488+00	2025-10-24 16:24:22.172488+00	2025-10-24 16:24:22.172488+00	{"eTag": "\\"92c1b67d2867c0512c76b964984bd402\\"", "size": 3368, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:24:23.000Z", "contentLength": 3368, "httpStatusCode": 200}	3ec83a59-fee4-4ea5-8df4-ff61d390780d	\N	{}	1
b6e90433-49de-4bb0-bf9b-7e1b72bbaa07	gshop-public	Loowoko 50L Hiking Backpack_image_5_main	\N	2025-10-24 16:40:24.847314+00	2025-10-24 16:40:24.847314+00	2025-10-24 16:40:24.847314+00	{"eTag": "\\"db5b87214704f95bd43eac0a8caa8fcb\\"", "size": 81212, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:25.000Z", "contentLength": 81212, "httpStatusCode": 200}	7f0983af-fb49-481a-8adf-67523a6c4918	\N	{}	1
cdce6845-8b62-45ef-9183-7e41915913b3	gshop-public	Loowoko 50L Hiking Backpack_image_5_preview	\N	2025-10-24 16:40:26.027092+00	2025-10-24 16:40:26.027092+00	2025-10-24 16:40:26.027092+00	{"eTag": "\\"793c7ddd4e046126977ec41c40208f35\\"", "size": 46686, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:26.000Z", "contentLength": 46686, "httpStatusCode": 200}	0dcdce16-980e-45ec-acce-d5220a420992	\N	{}	1
028353e9-e50c-4598-b180-651218c4eef4	gshop-public	Loowoko 50L Hiking Backpack_image_5_thumbnail	\N	2025-10-24 16:40:27.158973+00	2025-10-24 16:40:27.158973+00	2025-10-24 16:40:27.158973+00	{"eTag": "\\"3fe1cd4ddd6f99b2115cc1b7f3300424\\"", "size": 7134, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:40:28.000Z", "contentLength": 7134, "httpStatusCode": 200}	9960ad64-8a82-4aa4-b0bf-cca5ff916a42	\N	{}	1
ffb4aeb3-67af-4396-92f9-d0a84c7b4a34	gshop-public	VSGO Pocket Ranger Backpack_image_0_main	\N	2025-10-24 16:42:37.333815+00	2025-10-24 16:42:37.333815+00	2025-10-24 16:42:37.333815+00	{"eTag": "\\"28ecb9347e77c096f3e8879a0d31deaa\\"", "size": 7868, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:38.000Z", "contentLength": 7868, "httpStatusCode": 200}	57f30912-3916-42cc-aa15-fb721c94b9ba	\N	{}	1
2abf557f-4db7-4994-93c2-d9a36cd71b09	gshop-public	VSGO Pocket Ranger Backpack_image_0_preview	\N	2025-10-24 16:42:38.35529+00	2025-10-24 16:42:38.35529+00	2025-10-24 16:42:38.35529+00	{"eTag": "\\"ef243d68689703ef4d18cc54fee7073a\\"", "size": 7948, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:39.000Z", "contentLength": 7948, "httpStatusCode": 200}	622c567b-5b68-432d-9d26-9a0ec45a05d6	\N	{}	1
cbf2ecbc-c60b-417c-a2c5-9115f007de6b	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_1_main	\N	2025-10-24 17:49:07.476666+00	2025-10-24 17:49:07.476666+00	2025-10-24 17:49:07.476666+00	{"eTag": "\\"849f41a68977525d4b89a179516d7aa8\\"", "size": 75002, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:08.000Z", "contentLength": 75002, "httpStatusCode": 200}	ebce7dc6-8d0c-4814-a2aa-9e8af6e02652	\N	{}	1
ad2beadc-192e-4ff3-8d6e-11a5e1fcc94e	gshop-public	VSGO Pocket Ranger Backpack_image_0_thumbnail	\N	2025-10-24 16:42:39.317761+00	2025-10-24 16:42:39.317761+00	2025-10-24 16:42:39.317761+00	{"eTag": "\\"3c04d9f0c1147607f7c9d2dce209b4b1\\"", "size": 3518, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:40.000Z", "contentLength": 3518, "httpStatusCode": 200}	fb7cb40f-589a-41a3-ba79-8bf1214a9ae6	\N	{}	1
dc689c64-a5bd-41a6-969b-bfedf3fca104	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_3_main	\N	2025-10-24 16:52:07.453649+00	2025-10-24 16:52:07.453649+00	2025-10-24 16:52:07.453649+00	{"eTag": "\\"2755c1f410a944d5323a8fabbd400f83\\"", "size": 84116, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:08.000Z", "contentLength": 84116, "httpStatusCode": 200}	2237b511-95bc-4459-86e5-365e9904c617	\N	{}	1
8ff812c1-507b-46ca-a890-2758b8ef0f93	gshop-public	VSGO Pocket Ranger Backpack_image_1_main	\N	2025-10-24 16:42:39.975171+00	2025-10-24 16:42:39.975171+00	2025-10-24 16:42:39.975171+00	{"eTag": "\\"17e3f36e2654cc992440ecbd447ed94c\\"", "size": 61140, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:40.000Z", "contentLength": 61140, "httpStatusCode": 200}	b7154ae7-202e-4786-972f-df57151f851a	\N	{}	1
07e122b7-92a3-4dc8-9f34-0846cef05d86	gshop-public	VSGO Pocket Ranger Backpack_image_1_preview	\N	2025-10-24 16:42:40.984151+00	2025-10-24 16:42:40.984151+00	2025-10-24 16:42:40.984151+00	{"eTag": "\\"09a9abc02b4fb72d9614690f39276efd\\"", "size": 33948, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:41.000Z", "contentLength": 33948, "httpStatusCode": 200}	4f8a8418-4edd-413c-992b-813d5afcb292	\N	{}	1
e5f41b08-dbe0-4b8e-8b8a-cda02277ad27	gshop-public	VSGO Pocket Ranger Backpack_image_1_thumbnail	\N	2025-10-24 16:42:41.976243+00	2025-10-24 16:42:41.976243+00	2025-10-24 16:42:41.976243+00	{"eTag": "\\"af3d258ebf25661b637eef341edc8885\\"", "size": 6532, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:42.000Z", "contentLength": 6532, "httpStatusCode": 200}	0c1d6e03-84b7-4c99-acf8-8968984235fa	\N	{}	1
aca60a6a-5bb8-4ed7-b132-aeed046c938c	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_3_preview	\N	2025-10-24 16:52:08.063314+00	2025-10-24 16:52:08.063314+00	2025-10-24 16:52:08.063314+00	{"eTag": "\\"e0cbb7056f7774a9df1766947bd4f476\\"", "size": 56114, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:09.000Z", "contentLength": 56114, "httpStatusCode": 200}	aac2bbc1-83ab-46b6-aa2a-c0e4262d66a9	\N	{}	1
1251740a-c91f-4758-9bcf-38388359bef5	gshop-public	VSGO Pocket Ranger Backpack_image_2_main	\N	2025-10-24 16:42:43.917602+00	2025-10-24 16:42:43.917602+00	2025-10-24 16:42:43.917602+00	{"eTag": "\\"3a24d60ede4dd581e5bb38df3706e617\\"", "size": 140562, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:44.000Z", "contentLength": 140562, "httpStatusCode": 200}	91ebf718-7292-4f68-aedf-9ea727fe6a87	\N	{}	1
83370621-e1e3-4492-ad00-13735ed362c3	gshop-public	VSGO Pocket Ranger Backpack_image_2_preview	\N	2025-10-24 16:42:44.992607+00	2025-10-24 16:42:44.992607+00	2025-10-24 16:42:44.992607+00	{"eTag": "\\"2f90cb890f276ac15a7274e7362e78e4\\"", "size": 94944, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:45.000Z", "contentLength": 94944, "httpStatusCode": 200}	e0bf5ec9-0a29-45c4-a733-0b506cfd1904	\N	{}	1
c8eb4274-5fd2-45c1-acbe-158ebd9f0805	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_3_thumbnail	\N	2025-10-24 16:52:09.176394+00	2025-10-24 16:52:09.176394+00	2025-10-24 16:52:09.176394+00	{"eTag": "\\"78c69e6124b7108d98ce2bb821fe0be4\\"", "size": 7488, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:10.000Z", "contentLength": 7488, "httpStatusCode": 200}	2ea36d03-4bb1-420f-a487-8c335de4d84c	\N	{}	1
511f0b46-e9f4-4b42-85e9-c0d8156b3d66	gshop-public	VSGO Pocket Ranger Backpack_image_2_thumbnail	\N	2025-10-24 16:42:45.67143+00	2025-10-24 16:42:45.67143+00	2025-10-24 16:42:45.67143+00	{"eTag": "\\"4e70c5fd8437b65f6c812766aeb94702\\"", "size": 10290, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:46.000Z", "contentLength": 10290, "httpStatusCode": 200}	2dd25336-4713-450c-9c27-1dae818b94dc	\N	{}	1
8bfd4b9b-d6ee-4ac8-bcad-1dd262dc841c	gshop-public	VSGO Pocket Ranger Backpack_image_3_main	\N	2025-10-24 16:42:46.577652+00	2025-10-24 16:42:46.577652+00	2025-10-24 16:42:46.577652+00	{"eTag": "\\"bd1fba2604e53bd4d168095acb7aa23e\\"", "size": 78528, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:47.000Z", "contentLength": 78528, "httpStatusCode": 200}	d4ee4e19-4b95-40b2-80a7-4703b85c8d24	\N	{}	1
55472d5f-825a-48dd-a127-615ec36f84ec	gshop-public	VSGO Pocket Ranger Backpack_image_3_preview	\N	2025-10-24 16:42:47.517434+00	2025-10-24 16:42:47.517434+00	2025-10-24 16:42:47.517434+00	{"eTag": "\\"c428623e93175b89ff2649169f45a932\\"", "size": 43874, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:48.000Z", "contentLength": 43874, "httpStatusCode": 200}	2228d08e-22b7-4b5c-b805-0502ef958398	\N	{}	1
8a67861e-9c7a-4c68-b3eb-533c277ba3e0	gshop-public	VSGO Pocket Ranger Backpack_image_3_thumbnail	\N	2025-10-24 16:42:48.339531+00	2025-10-24 16:42:48.339531+00	2025-10-24 16:42:48.339531+00	{"eTag": "\\"2ede7743c58e3a73a17ccce8b010a5bd\\"", "size": 8394, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:42:49.000Z", "contentLength": 8394, "httpStatusCode": 200}	582e7723-4dcf-45ba-9ad8-7e3195cb3b07	\N	{}	1
72564ba0-9463-41d1-bf56-ca91756b6c52	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_0_main	\N	2025-10-24 16:44:08.156824+00	2025-10-24 16:44:08.156824+00	2025-10-24 16:44:08.156824+00	{"eTag": "\\"5a0ae58623510b683453e2c18ee4e584\\"", "size": 50022, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:09.000Z", "contentLength": 50022, "httpStatusCode": 200}	e3f9d33a-6662-4f9a-803d-1a7739c8b532	\N	{}	1
711ea251-9740-4134-93ab-351c0c950900	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_4_main	\N	2025-10-24 16:52:09.846604+00	2025-10-24 16:52:09.846604+00	2025-10-24 16:52:09.846604+00	{"eTag": "\\"d600226a6b15b777cc7e4dba4cd0295a\\"", "size": 24222, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:10.000Z", "contentLength": 24222, "httpStatusCode": 200}	cb98fd2d-3ddf-43c0-ae01-1d68d887517d	\N	{}	1
775eaf1a-f338-4aa1-9668-c50fe6f25bdd	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_0_preview	\N	2025-10-24 16:44:09.141465+00	2025-10-24 16:44:09.141465+00	2025-10-24 16:44:09.141465+00	{"eTag": "\\"fb27aaff577e0186638b6e3c58162bd3\\"", "size": 23316, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:10.000Z", "contentLength": 23316, "httpStatusCode": 200}	a5f68d1c-859f-40eb-8fe6-709082c05515	\N	{}	1
aa1efc7e-acae-4083-9de3-44412c823dba	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_1_preview	\N	2025-10-24 17:49:08.308604+00	2025-10-24 17:49:08.308604+00	2025-10-24 17:49:08.308604+00	{"eTag": "\\"8e4b414cedb5e61d3dc9c51d8c3fe9a2\\"", "size": 45894, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:09.000Z", "contentLength": 45894, "httpStatusCode": 200}	af373929-0877-4c4b-99ae-0cbc4b9a722b	\N	{}	1
5ada85ec-fa9a-4c71-889f-09abae6fcf9e	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_0_thumbnail	\N	2025-10-24 16:44:10.033945+00	2025-10-24 16:44:10.033945+00	2025-10-24 16:44:10.033945+00	{"eTag": "\\"355daa2b57ee2996465bbce48d353aa9\\"", "size": 3728, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:10.000Z", "contentLength": 3728, "httpStatusCode": 200}	17d03332-41d6-4d2a-ba33-497bf57aac84	\N	{}	1
ff5020e5-ff3f-4a5a-abb3-46da4d7234ed	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_4_preview	\N	2025-10-24 16:52:10.822633+00	2025-10-24 16:52:10.822633+00	2025-10-24 16:52:10.822633+00	{"eTag": "\\"ec6724d2c4e672b486100d6a7c6fa9bc\\"", "size": 15000, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:11.000Z", "contentLength": 15000, "httpStatusCode": 200}	774be999-e9c3-4e19-90aa-099476f0065d	\N	{}	1
cfdabff6-b9b4-47cd-976c-64be9afa4ec2	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_1_main	\N	2025-10-24 16:44:11.00065+00	2025-10-24 16:44:11.00065+00	2025-10-24 16:44:11.00065+00	{"eTag": "\\"aa52ccbdd05bb6c2b6c64f239d19653c\\"", "size": 36454, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:11.000Z", "contentLength": 36454, "httpStatusCode": 200}	f9520c1a-88f8-4b52-90bd-73df6de85296	\N	{}	1
f58cb1fe-4875-4168-94b6-d646d06863ab	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_1_preview	\N	2025-10-24 16:44:11.806922+00	2025-10-24 16:44:11.806922+00	2025-10-24 16:44:11.806922+00	{"eTag": "\\"577491599e926f012dcd29bb42527c40\\"", "size": 27180, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:12.000Z", "contentLength": 27180, "httpStatusCode": 200}	7f542f6e-46b0-425e-b8b8-5dafe913a347	\N	{}	1
01c245ce-e708-40ef-a779-516ba5fae72f	gshop-public	OLIGHT Seeker 4 Pro Rechargeable Flashlight_image_4_thumbnail	\N	2025-10-24 16:52:11.952302+00	2025-10-24 16:52:11.952302+00	2025-10-24 16:52:11.952302+00	{"eTag": "\\"4b1283899ed7524b612efb268c5a96a4\\"", "size": 2972, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:52:12.000Z", "contentLength": 2972, "httpStatusCode": 200}	b1cf742e-2342-49f0-a1b6-ec222d82fbf0	\N	{}	1
6ef20d5d-a97f-48a2-aeb4-5c1eed2d00e7	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_1_thumbnail	\N	2025-10-24 16:44:12.710814+00	2025-10-24 16:44:12.710814+00	2025-10-24 16:44:12.710814+00	{"eTag": "\\"7904757c880b083e1fda7405be9d4b82\\"", "size": 4866, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:13.000Z", "contentLength": 4866, "httpStatusCode": 200}	bf3377de-46e4-411e-8312-e7d1626fc1f9	\N	{}	1
488615b2-c271-434e-9b0b-7de809d2be3b	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_2_main	\N	2025-10-24 16:44:13.407053+00	2025-10-24 16:44:13.407053+00	2025-10-24 16:44:13.407053+00	{"eTag": "\\"1ef2f3d00dea6fe2328c18b355fa0bbc\\"", "size": 50554, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:14.000Z", "contentLength": 50554, "httpStatusCode": 200}	f9cb42e3-839f-4966-95f5-dfbe39692851	\N	{}	1
79cacd29-58db-4383-bec4-99f6014f9b81	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_2_preview	\N	2025-10-24 16:44:14.435026+00	2025-10-24 16:44:14.435026+00	2025-10-24 16:44:14.435026+00	{"eTag": "\\"5a825c3e6fc0963f629dcb4b8bd72103\\"", "size": 43722, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:15.000Z", "contentLength": 43722, "httpStatusCode": 200}	2509bcce-aa30-4996-ad88-0564419df30a	\N	{}	1
2cc17ab0-4757-4592-a2e9-370bcb7dc7a3	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_2_thumbnail	\N	2025-10-24 16:44:15.073317+00	2025-10-24 16:44:15.073317+00	2025-10-24 16:44:15.073317+00	{"eTag": "\\"9b2555fb556841e4b66cb074a59f028d\\"", "size": 5656, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:16.000Z", "contentLength": 5656, "httpStatusCode": 200}	b56570fb-c9a0-42c6-94c2-19de2786bf77	\N	{}	1
715c1eb7-14cc-4890-86d3-1bd1a579952f	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_3_main	\N	2025-10-24 16:44:16.105093+00	2025-10-24 16:44:16.105093+00	2025-10-24 16:44:16.105093+00	{"eTag": "\\"234cff67259fd53a30ab5e205a585461\\"", "size": 29898, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:16.000Z", "contentLength": 29898, "httpStatusCode": 200}	39ce96af-63de-45aa-ac25-a56609889e50	\N	{}	1
bca11c18-095b-4ec3-be0f-c87190524efb	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_3_preview	\N	2025-10-24 16:44:16.84103+00	2025-10-24 16:44:16.84103+00	2025-10-24 16:44:16.84103+00	{"eTag": "\\"2a21b711fe37c1ccd1a67e8cf667c819\\"", "size": 23124, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:17.000Z", "contentLength": 23124, "httpStatusCode": 200}	574486fc-423a-499d-8eff-98a7fea0f156	\N	{}	1
bc77a21b-d8b8-4e3d-a42e-51c93f0e4135	gshop-public	MOUNTAINTOP 50L Internal Frame Backpack_image_3_thumbnail	\N	2025-10-24 16:44:18.174185+00	2025-10-24 16:44:18.174185+00	2025-10-24 16:44:18.174185+00	{"eTag": "\\"3957e2082d4a022dab8c1cb295e27955\\"", "size": 4662, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:44:19.000Z", "contentLength": 4662, "httpStatusCode": 200}	2f9f4dee-8193-4fd9-8081-db355b85e2b7	\N	{}	1
2c1ec08a-1c1d-4c8a-9732-b55ede670859	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_1_thumbnail	\N	2025-10-24 17:49:09.419064+00	2025-10-24 17:49:09.419064+00	2025-10-24 17:49:09.419064+00	{"eTag": "\\"7394d06a89831a12efa54d5d983ef880\\"", "size": 6856, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:10.000Z", "contentLength": 6856, "httpStatusCode": 200}	ff30ca90-565b-4ea5-8ef3-82533f2433ec	\N	{}	1
ad4c1504-e180-4c05-8f1a-0ad8cc4d02d8	gshop-public	Lighting EVER LED Flashlight_image_0_main	\N	2025-10-24 16:46:57.4568+00	2025-10-24 16:46:57.4568+00	2025-10-24 16:46:57.4568+00	{"eTag": "\\"f66335bb6291dee84e49b897a3657663\\"", "size": 41234, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:46:58.000Z", "contentLength": 41234, "httpStatusCode": 200}	9f19d335-77eb-4581-9351-05682f579658	\N	{}	1
f036cae0-b505-44b5-b941-47d6bd670f6f	gshop-public	zxczxc_image_0_main	\N	2025-10-25 19:29:47.10109+00	2025-10-25 19:29:47.10109+00	2025-10-25 19:29:47.10109+00	{"eTag": "\\"14dbba3e54cedb87ef996f2c3ab50316\\"", "size": 2290, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T19:29:48.000Z", "contentLength": 2290, "httpStatusCode": 200}	a9c98493-c227-42ca-9b6d-57121a88283f	\N	{}	1
33ae38fc-f92a-4b0b-bdf4-41acab18756c	gshop-public	Lighting EVER LED Flashlight_image_0_preview	\N	2025-10-24 16:46:58.053713+00	2025-10-24 16:46:58.053713+00	2025-10-24 16:46:58.053713+00	{"eTag": "\\"8fcd89e4b302be5ac33dae220be31bc3\\"", "size": 24106, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:46:59.000Z", "contentLength": 24106, "httpStatusCode": 200}	f3b90beb-d510-4d35-991c-63710e4deabf	\N	{}	1
89436e4d-0c76-4b51-b297-6a0ea935f272	gshop-public	Nitecore EDC35 5000_image_4_thumbnail	\N	2025-10-24 17:14:40.764381+00	2025-10-24 17:14:40.764381+00	2025-10-24 17:14:40.764381+00	{"eTag": "\\"60507aa1f5377c7433aa40e9249682e3\\"", "size": 2024, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:41.000Z", "contentLength": 2024, "httpStatusCode": 200}	9bc74006-8a4d-48a3-82dd-52e83b36806c	\N	{}	1
f0fe1427-67e4-4021-ad09-53997c8e48b7	gshop-public	Lighting EVER LED Flashlight_image_0_thumbnail	\N	2025-10-24 16:46:59.052134+00	2025-10-24 16:46:59.052134+00	2025-10-24 16:46:59.052134+00	{"eTag": "\\"b82ba366837dcd431452c5736d44b748\\"", "size": 4254, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:00.000Z", "contentLength": 4254, "httpStatusCode": 200}	6eabcd95-6526-4297-94aa-167cf5b08219	\N	{}	1
626531dc-5e2e-40be-b802-9a637541a313	gshop-public	NORTIV 8 Hiking Boots_image_0_preview	\N	2025-10-24 17:20:24.860316+00	2025-10-24 17:20:24.860316+00	2025-10-24 17:20:24.860316+00	{"eTag": "\\"4856710bb8bbfc9f50f814ad54387a33\\"", "size": 34262, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:25.000Z", "contentLength": 34262, "httpStatusCode": 200}	f1d1bf33-b9a5-41d2-ac3e-2572cca74bd2	\N	{}	1
0792d929-eeb8-46be-b92e-a60a3c44db56	gshop-public	Lighting EVER LED Flashlight_image_1_main	\N	2025-10-24 16:46:59.855585+00	2025-10-24 16:46:59.855585+00	2025-10-24 16:46:59.855585+00	{"eTag": "\\"3417f3c8b4a81c8046252a2bf90c8ed2\\"", "size": 50202, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:00.000Z", "contentLength": 50202, "httpStatusCode": 200}	c97b3026-b90b-4a48-a8d8-029b793151d6	\N	{}	1
18f596ad-675c-40b7-a3b7-94d5176b0f50	gshop-public	Lighting EVER LED Flashlight_image_1_preview	\N	2025-10-24 16:47:01.155018+00	2025-10-24 16:47:01.155018+00	2025-10-24 16:47:01.155018+00	{"eTag": "\\"375113bd71e90e8f208cc381317fa59c\\"", "size": 26494, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:02.000Z", "contentLength": 26494, "httpStatusCode": 200}	289d5ea7-e0d3-4299-a3e7-9c6edd142906	\N	{}	1
eb8bac55-49f0-462b-9d50-795ba59ff8e4	gshop-public	NORTIV 8 Hiking Boots_image_0_thumbnail	\N	2025-10-24 17:20:25.805481+00	2025-10-24 17:20:25.805481+00	2025-10-24 17:20:25.805481+00	{"eTag": "\\"60d10509c6835a96250bc0b2e2c3adbb\\"", "size": 4292, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:26.000Z", "contentLength": 4292, "httpStatusCode": 200}	a07e90d1-bd1d-49ad-ad62-f3abcb13cdd2	\N	{}	1
20d2a5c1-5686-4648-b0f1-9ede0b83e29e	gshop-public	Lighting EVER LED Flashlight_image_1_thumbnail	\N	2025-10-24 16:47:03.12244+00	2025-10-24 16:47:03.12244+00	2025-10-24 16:47:03.12244+00	{"eTag": "\\"5af6d20523d117955a70a802642e6a52\\"", "size": 4708, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:03.000Z", "contentLength": 4708, "httpStatusCode": 200}	b6a8b18f-e15a-4061-913a-3f3455e07357	\N	{}	1
02c92022-f36f-4d9a-8591-f019268e8b75	gshop-public	Lighting EVER LED Flashlight_image_2_main	\N	2025-10-24 16:47:04.223201+00	2025-10-24 16:47:04.223201+00	2025-10-24 16:47:04.223201+00	{"eTag": "\\"110f988c93cf33f400e054b5a148655c\\"", "size": 45170, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:05.000Z", "contentLength": 45170, "httpStatusCode": 200}	0323ea4f-64d9-456a-a5b9-5b0dfbf24fbd	\N	{}	1
93f81d0b-23fa-4098-9e46-49424d709b09	gshop-public	Lighting EVER LED Flashlight_image_2_preview	\N	2025-10-24 16:47:04.940854+00	2025-10-24 16:47:04.940854+00	2025-10-24 16:47:04.940854+00	{"eTag": "\\"80aee00b510984ef4e74c7bc40d51227\\"", "size": 21248, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:05.000Z", "contentLength": 21248, "httpStatusCode": 200}	10616634-053a-48c6-af29-8e9c7a7eb04c	\N	{}	1
ecc0a889-2360-4db2-acfe-e6e7035e6889	gshop-public	Lighting EVER LED Flashlight_image_2_thumbnail	\N	2025-10-24 16:47:05.98493+00	2025-10-24 16:47:05.98493+00	2025-10-24 16:47:05.98493+00	{"eTag": "\\"2cacd83468d0ddcfb785bc9443706669\\"", "size": 4114, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:06.000Z", "contentLength": 4114, "httpStatusCode": 200}	48ba4d65-cb34-48ed-99eb-bc8b8ba84e31	\N	{}	1
4aeff867-4258-49fe-8cfe-f049fe71ee49	gshop-public	Lighting EVER LED Flashlight_image_3_main	\N	2025-10-24 16:47:06.68757+00	2025-10-24 16:47:06.68757+00	2025-10-24 16:47:06.68757+00	{"eTag": "\\"1aa98d00b1aa7ce65f37ce67b92361c3\\"", "size": 74440, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:07.000Z", "contentLength": 74440, "httpStatusCode": 200}	df65fd4c-febd-471d-8695-ef2a5c53ce58	\N	{}	1
44e50704-bc31-4cb9-bf77-5d9b3f3d7192	gshop-public	Lighting EVER LED Flashlight_image_3_preview	\N	2025-10-24 16:47:08.068864+00	2025-10-24 16:47:08.068864+00	2025-10-24 16:47:08.068864+00	{"eTag": "\\"5c11fbb1cfc576250de71cc8fe843b43\\"", "size": 42680, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:09.000Z", "contentLength": 42680, "httpStatusCode": 200}	5b889bac-2bd9-4008-a70d-6f4be03455e2	\N	{}	1
b50ca75d-b567-4475-bfc6-fb3ce6971d76	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_2_main	\N	2025-10-24 17:49:10.302725+00	2025-10-24 17:49:10.302725+00	2025-10-24 17:49:10.302725+00	{"eTag": "\\"0fd21363bdac7dd177d623575fbee3ac\\"", "size": 88786, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:11.000Z", "contentLength": 88786, "httpStatusCode": 200}	f03812a3-58f6-4504-bf81-72a7a8b20504	\N	{}	1
5b386591-2c96-46b9-940d-8715c85d8140	gshop-public	Lighting EVER LED Flashlight_image_3_thumbnail	\N	2025-10-24 16:47:08.70973+00	2025-10-24 16:47:08.70973+00	2025-10-24 16:47:08.70973+00	{"eTag": "\\"62525e311b63d493fe3345483cde90f5\\"", "size": 6776, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:09.000Z", "contentLength": 6776, "httpStatusCode": 200}	afe35014-53f5-432e-ab6c-ab04c1997823	\N	{}	1
d2acafd8-5a48-43a4-9a26-eef6464340b5	gshop-public	Nitecore EDC35 5000_image_0_main	\N	2025-10-24 17:14:25.544626+00	2025-10-24 17:14:25.544626+00	2025-10-24 17:14:25.544626+00	{"eTag": "\\"c7ac42f91e1cbbe2ac68e3515b3bb86a\\"", "size": 44890, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:26.000Z", "contentLength": 44890, "httpStatusCode": 200}	28c2997a-338c-499e-ac34-c86713a99df4	\N	{}	1
ecec298b-2f33-4015-8395-2e1b71fb6c51	gshop-public	Lighting EVER LED Flashlight_image_4_main	\N	2025-10-24 16:47:09.733416+00	2025-10-24 16:47:09.733416+00	2025-10-24 16:47:09.733416+00	{"eTag": "\\"936f3421068b831889d776cb4f6f1bdc\\"", "size": 103706, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:10.000Z", "contentLength": 103706, "httpStatusCode": 200}	0082ea4b-cc23-4dfa-b791-086171c0e44a	\N	{}	1
7645a2d3-d40f-4b7c-8ec5-cdc50f78e515	gshop-public	zxczxc_image_0_preview	\N	2025-10-25 19:29:47.7841+00	2025-10-25 19:29:47.7841+00	2025-10-25 19:29:47.7841+00	{"eTag": "\\"45e779eaac5b83ab256dc0e16f051525\\"", "size": 2000, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T19:29:48.000Z", "contentLength": 2000, "httpStatusCode": 200}	eac2ab06-1479-4f37-89ce-8bf48f846d17	\N	{}	1
85639a8a-18e7-4a71-9fba-07bcd5705884	gshop-public	Lighting EVER LED Flashlight_image_4_preview	\N	2025-10-24 16:47:10.56186+00	2025-10-24 16:47:10.56186+00	2025-10-24 16:47:10.56186+00	{"eTag": "\\"28c035f1f535167a074e458ac19e442d\\"", "size": 60246, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:11.000Z", "contentLength": 60246, "httpStatusCode": 200}	21788922-71e8-4fb5-868c-66963d17ad26	\N	{}	1
ddd3c1e1-2fc2-4e61-8dd0-8082b655d22c	gshop-public	Nitecore EDC35 5000_image_0_preview	\N	2025-10-24 17:14:26.356197+00	2025-10-24 17:14:26.356197+00	2025-10-24 17:14:26.356197+00	{"eTag": "\\"342511498aaad426ce47b6deb4731723\\"", "size": 26232, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:27.000Z", "contentLength": 26232, "httpStatusCode": 200}	e2239cfb-5613-41b2-b2ec-da665fbbbcd4	\N	{}	1
8e340293-26be-4a34-a9a4-7460a8119819	gshop-public	Lighting EVER LED Flashlight_image_4_thumbnail	\N	2025-10-24 16:47:12.491821+00	2025-10-24 16:47:12.491821+00	2025-10-24 16:47:12.491821+00	{"eTag": "\\"495405b8f9371c363aa70f698f22a744\\"", "size": 7210, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:47:13.000Z", "contentLength": 7210, "httpStatusCode": 200}	00c53d5f-54fb-4c37-ac6a-bff809e8c4a3	\N	{}	1
4326e77e-8cfb-4b26-a5bd-97c46b9508a3	gshop-public	NEXTORCH P91 Tactical Flashlight_image_0_main	\N	2025-10-24 16:48:53.629524+00	2025-10-24 16:48:53.629524+00	2025-10-24 16:48:53.629524+00	{"eTag": "\\"6593a75c07652d6490ca8d85adff27f1\\"", "size": 26910, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:48:54.000Z", "contentLength": 26910, "httpStatusCode": 200}	6e1a389a-adf7-4792-b611-d845e228f9d8	\N	{}	1
b901f9af-498c-425e-b094-f817e147e51c	gshop-public	Nitecore EDC35 5000_image_0_thumbnail	\N	2025-10-24 17:14:27.265098+00	2025-10-24 17:14:27.265098+00	2025-10-24 17:14:27.265098+00	{"eTag": "\\"95853f7ad4bc3b2559971dd0430c812f\\"", "size": 4858, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:28.000Z", "contentLength": 4858, "httpStatusCode": 200}	878e54a1-eefd-4617-8d90-dff9a64e5bed	\N	{}	1
deaeff24-8856-4745-8b45-485305e8cee7	gshop-public	NEXTORCH P91 Tactical Flashlight_image_0_preview	\N	2025-10-24 16:48:54.505155+00	2025-10-24 16:48:54.505155+00	2025-10-24 16:48:54.505155+00	{"eTag": "\\"536dced9309b353bcaf9a39d06306fda\\"", "size": 15834, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:48:55.000Z", "contentLength": 15834, "httpStatusCode": 200}	d8c855a3-cefe-4858-b807-471adcb1461a	\N	{}	1
621d3791-aab7-421f-89fa-9c2f8ab390d0	gshop-public	NEXTORCH P91 Tactical Flashlight_image_0_thumbnail	\N	2025-10-24 16:48:55.077145+00	2025-10-24 16:48:55.077145+00	2025-10-24 16:48:55.077145+00	{"eTag": "\\"5605d7a065ac300eb19e92e9a5e5789a\\"", "size": 2906, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:48:56.000Z", "contentLength": 2906, "httpStatusCode": 200}	4085358b-bc35-4df8-9a6f-0d74cd136da6	\N	{}	1
d8a981d5-1b52-4836-b7cc-ec342bef973a	gshop-public	NEXTORCH P91 Tactical Flashlight_image_1_main	\N	2025-10-24 16:48:56.359467+00	2025-10-24 16:48:56.359467+00	2025-10-24 16:48:56.359467+00	{"eTag": "\\"1d2ec6ca680c6104a00f29c45c743461\\"", "size": 66778, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:48:57.000Z", "contentLength": 66778, "httpStatusCode": 200}	f5862598-31d8-49ec-9c5e-9720103ac11e	\N	{}	1
5320128e-59a8-4b3a-aa33-7ba4046c7ae7	gshop-public	NEXTORCH P91 Tactical Flashlight_image_1_preview	\N	2025-10-24 16:48:56.969759+00	2025-10-24 16:48:56.969759+00	2025-10-24 16:48:56.969759+00	{"eTag": "\\"84ed392ef1eed3cc7a37d74440ed0ad2\\"", "size": 40152, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:48:57.000Z", "contentLength": 40152, "httpStatusCode": 200}	70b37f32-20df-483b-8d48-e856575598d3	\N	{}	1
472b7976-2c59-43ca-9654-48f31ff61dd1	gshop-public	NEXTORCH P91 Tactical Flashlight_image_1_thumbnail	\N	2025-10-24 16:48:57.982126+00	2025-10-24 16:48:57.982126+00	2025-10-24 16:48:57.982126+00	{"eTag": "\\"7a54cc692ed1c20ee68629dc48101af8\\"", "size": 6416, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:48:58.000Z", "contentLength": 6416, "httpStatusCode": 200}	41ef236e-f476-47fd-ab7a-0b7d378592ce	\N	{}	1
3a88b765-8330-4bd3-8783-1e975e295dfa	gshop-public	NEXTORCH P91 Tactical Flashlight_image_2_main	\N	2025-10-24 16:48:58.700688+00	2025-10-24 16:48:58.700688+00	2025-10-24 16:48:58.700688+00	{"eTag": "\\"0a7923f9545a3fc030b6985c42535b98\\"", "size": 55594, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:48:59.000Z", "contentLength": 55594, "httpStatusCode": 200}	7d123547-f866-4328-a915-df58fd15e004	\N	{}	1
371e89c0-bf90-4f81-8f54-ffc6883c143e	gshop-public	Nitecore EDC35 5000_image_1_main	\N	2025-10-24 17:14:28.056624+00	2025-10-24 17:14:28.056624+00	2025-10-24 17:14:28.056624+00	{"eTag": "\\"965f446e3444f9d4fd05e86d2a994b51\\"", "size": 25786, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:28.000Z", "contentLength": 25786, "httpStatusCode": 200}	d38267f7-7276-479f-8690-95c666460f2c	\N	{}	1
1997e86d-26f2-4c7b-bdf4-278f6bb42d6f	gshop-public	NEXTORCH P91 Tactical Flashlight_image_2_preview	\N	2025-10-24 16:48:59.777707+00	2025-10-24 16:48:59.777707+00	2025-10-24 16:48:59.777707+00	{"eTag": "\\"66803f665677e51f35a219bef19f6a85\\"", "size": 33870, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:49:00.000Z", "contentLength": 33870, "httpStatusCode": 200}	7874f62f-351b-406f-a4ea-5b9218efd36c	\N	{}	1
f6536961-76eb-4470-a5ee-ec44232ec7b0	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_2_preview	\N	2025-10-24 17:49:11.473639+00	2025-10-24 17:49:11.473639+00	2025-10-24 17:49:11.473639+00	{"eTag": "\\"0008dfa0bb86046ae54c910918c59317\\"", "size": 46114, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:12.000Z", "contentLength": 46114, "httpStatusCode": 200}	356b6d6c-4ca3-4197-b464-796bf6481284	\N	{}	1
e5ba3073-6d91-47b0-8730-0733de5cf49a	gshop-public	NEXTORCH P91 Tactical Flashlight_image_2_thumbnail	\N	2025-10-24 16:49:00.463502+00	2025-10-24 16:49:00.463502+00	2025-10-24 16:49:00.463502+00	{"eTag": "\\"41bd7ea2fa8e2a741891acff4781f97e\\"", "size": 6098, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:49:01.000Z", "contentLength": 6098, "httpStatusCode": 200}	81592cd5-7371-4fb8-87a3-687deabe6027	\N	{}	1
fca16bbe-a739-42be-95f4-a53650d94e75	gshop-public	Nitecore EDC35 5000_image_1_preview	\N	2025-10-24 17:14:29.079088+00	2025-10-24 17:14:29.079088+00	2025-10-24 17:14:29.079088+00	{"eTag": "\\"045ae93703095f5d363fa5b3b72d394c\\"", "size": 14704, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:30.000Z", "contentLength": 14704, "httpStatusCode": 200}	319f656c-7833-4d34-a34c-b5bb7ed58966	\N	{}	1
60f08af0-8032-444b-9b2e-9c07702d2692	gshop-public	NEXTORCH P91 Tactical Flashlight_image_3_main	\N	2025-10-24 16:49:03.822659+00	2025-10-24 16:49:03.822659+00	2025-10-24 16:49:03.822659+00	{"eTag": "\\"7e01080a669d35c201ed0ed2e561c3a0\\"", "size": 61170, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:49:04.000Z", "contentLength": 61170, "httpStatusCode": 200}	ab836e9b-03c1-4a13-bfa5-9d28573c1aa1	\N	{}	1
63b2b45a-4b9e-46aa-83c4-e18c052bf3de	gshop-public	NEXTORCH P91 Tactical Flashlight_image_3_preview	\N	2025-10-24 16:49:04.618815+00	2025-10-24 16:49:04.618815+00	2025-10-24 16:49:04.618815+00	{"eTag": "\\"626ce15900bce4daeabb7408f44273df\\"", "size": 32210, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:49:05.000Z", "contentLength": 32210, "httpStatusCode": 200}	4118fa0f-bf57-401b-8dae-f51524f2b341	\N	{}	1
67bb1575-0034-47f1-b807-79a71e02721a	gshop-public	Nitecore EDC35 5000_image_1_thumbnail	\N	2025-10-24 17:14:29.950398+00	2025-10-24 17:14:29.950398+00	2025-10-24 17:14:29.950398+00	{"eTag": "\\"2412bc842cae3194a49a0e1db79ef1a7\\"", "size": 2814, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:30.000Z", "contentLength": 2814, "httpStatusCode": 200}	f76df731-490f-4db5-9194-ed49047262e0	\N	{}	1
fec697d4-4c29-49af-864c-617bf6a924dd	gshop-public	NEXTORCH P91 Tactical Flashlight_image_3_thumbnail	\N	2025-10-24 16:49:05.735201+00	2025-10-24 16:49:05.735201+00	2025-10-24 16:49:05.735201+00	{"eTag": "\\"b43d01a4162206453163d080fd7b5df3\\"", "size": 6134, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:49:06.000Z", "contentLength": 6134, "httpStatusCode": 200}	7d811813-fd3e-42d2-abfc-43812d3b8e5f	\N	{}	1
a17d994e-00fe-42a4-841f-0c2e5c67a401	gshop-public	NORTIV 8 Hiking Boots_image_0_main	\N	2025-10-24 17:20:24.241085+00	2025-10-24 17:20:24.241085+00	2025-10-24 17:20:24.241085+00	{"eTag": "\\"a4cc821c8a2896aa096d275771517cdc\\"", "size": 83124, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:25.000Z", "contentLength": 83124, "httpStatusCode": 200}	b0cc4f18-502f-45d4-a21c-cb201b99ea7b	\N	{}	1
fa6f61d0-38bc-4d9e-b035-8a0fef098ba3	gshop-public	Nitecore P20iX Tactical Flashlight_image_0_main	\N	2025-10-24 16:50:17.812641+00	2025-10-24 16:50:17.812641+00	2025-10-24 16:50:17.812641+00	{"eTag": "\\"d7edbc209bd66b68bab1fa208a3abe47\\"", "size": 24824, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:18.000Z", "contentLength": 24824, "httpStatusCode": 200}	8ed24597-9e9a-44fc-a750-06c417f8e469	\N	{}	1
e07d21db-8f78-4267-850a-cc940dbd6669	gshop-public	Nitecore P20iX Tactical Flashlight_image_0_preview	\N	2025-10-24 16:50:18.585417+00	2025-10-24 16:50:18.585417+00	2025-10-24 16:50:18.585417+00	{"eTag": "\\"77e3293b69cca05a99417ff5661e4637\\"", "size": 21206, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:19.000Z", "contentLength": 21206, "httpStatusCode": 200}	473cddc3-1c0f-4151-b391-fc00261b64d4	\N	{}	1
b1d77397-136a-431d-9879-c143567f7532	gshop-public	Nitecore P20iX Tactical Flashlight_image_0_thumbnail	\N	2025-10-24 16:50:19.480531+00	2025-10-24 16:50:19.480531+00	2025-10-24 16:50:19.480531+00	{"eTag": "\\"63395c8327302b2c30de2c285d3e59f3\\"", "size": 3592, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:20.000Z", "contentLength": 3592, "httpStatusCode": 200}	74a3538e-7d69-470d-88a1-2d2fe42fe9e9	\N	{}	1
6e589ad0-c153-4d07-81bc-084516a527ca	gshop-public	Nitecore P20iX Tactical Flashlight_image_1_main	\N	2025-10-24 16:50:20.332833+00	2025-10-24 16:50:20.332833+00	2025-10-24 16:50:20.332833+00	{"eTag": "\\"0e7ea0e73e0c7c5086ace69a2c7759c3\\"", "size": 29640, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:21.000Z", "contentLength": 29640, "httpStatusCode": 200}	faf3f200-3c6d-4fae-b968-885fae3f8413	\N	{}	1
6d0a3fb7-f5c3-4e2e-b69c-96afbdb85de8	gshop-public	Nitecore P20iX Tactical Flashlight_image_1_preview	\N	2025-10-24 16:50:21.331963+00	2025-10-24 16:50:21.331963+00	2025-10-24 16:50:21.331963+00	{"eTag": "\\"909c058c72bacd01e78a78aedfd3613b\\"", "size": 20022, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:22.000Z", "contentLength": 20022, "httpStatusCode": 200}	79818980-b068-489c-9b2d-0afdfa8dc846	\N	{}	1
67ad0a7b-0784-4d2d-a736-410c0cdf66be	gshop-public	Nitecore P20iX Tactical Flashlight_image_1_thumbnail	\N	2025-10-24 16:50:21.99201+00	2025-10-24 16:50:21.99201+00	2025-10-24 16:50:21.99201+00	{"eTag": "\\"55f70fa4b37f3587d264e01d7c8ebe8c\\"", "size": 4106, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:22.000Z", "contentLength": 4106, "httpStatusCode": 200}	d0fa216b-86db-43fb-ae8c-d2a0969ee4ac	\N	{}	1
49d404f4-89e9-49cf-8607-ce0dcff8f8ae	gshop-public	zxczxc_image_0_thumbnail	\N	2025-10-25 19:29:48.706569+00	2025-10-25 19:29:48.706569+00	2025-10-25 19:29:48.706569+00	{"eTag": "\\"03fbd57e02ca34fef922571c6cee7374\\"", "size": 1762, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T19:29:49.000Z", "contentLength": 1762, "httpStatusCode": 200}	b71dd2ea-2757-48ff-9ccd-adbc9564faea	\N	{}	1
60af0dff-6ad3-4238-bb7a-ecad0c8e1fad	gshop-public	Nitecore P20iX Tactical Flashlight_image_2_main	\N	2025-10-24 16:50:23.182514+00	2025-10-24 16:50:23.182514+00	2025-10-24 16:50:23.182514+00	{"eTag": "\\"d6c4b90095d584a015adf50aa3ae15a0\\"", "size": 30996, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:24.000Z", "contentLength": 30996, "httpStatusCode": 200}	bf1f2eb7-a997-42c0-8592-2e9d6b2b32f6	\N	{}	1
d4977f4c-3d40-415f-876b-f89eb4e479ee	gshop-public	Nitecore EDC35 5000_image_2_main	\N	2025-10-24 17:14:31.069437+00	2025-10-24 17:14:31.069437+00	2025-10-24 17:14:31.069437+00	{"eTag": "\\"11449db4f15909583ce8617037a08f4b\\"", "size": 21960, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:32.000Z", "contentLength": 21960, "httpStatusCode": 200}	7d91d35d-4078-4162-9178-e934e81af96d	\N	{}	1
5619fedc-63d9-4ac5-8991-7eca360931ed	gshop-public	Nitecore P20iX Tactical Flashlight_image_2_preview	\N	2025-10-24 16:50:23.805458+00	2025-10-24 16:50:23.805458+00	2025-10-24 16:50:23.805458+00	{"eTag": "\\"c6c7c73c10ffb35d84bf46fec4664e3c\\"", "size": 25580, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:24.000Z", "contentLength": 25580, "httpStatusCode": 200}	74074d52-21e9-4f31-95e9-de58d3dc9ef7	\N	{}	1
0d64c81f-724a-41b5-9853-a7ce08533be3	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_2_thumbnail	\N	2025-10-24 17:49:12.069378+00	2025-10-24 17:49:12.069378+00	2025-10-24 17:49:12.069378+00	{"eTag": "\\"cd88f65b2f23913ecfae13ca3a437502\\"", "size": 6796, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:13.000Z", "contentLength": 6796, "httpStatusCode": 200}	15558071-a680-4c17-95ee-c3b12913a7c5	\N	{}	1
a08d10f1-02ba-41ee-844a-80c0e5924bba	gshop-public	Nitecore P20iX Tactical Flashlight_image_2_thumbnail	\N	2025-10-24 16:50:24.623476+00	2025-10-24 16:50:24.623476+00	2025-10-24 16:50:24.623476+00	{"eTag": "\\"ae69401d000df6566c8ca22d57123dc9\\"", "size": 5298, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:25.000Z", "contentLength": 5298, "httpStatusCode": 200}	accc9cdc-d52b-4b78-806b-c03c70898c3d	\N	{}	1
1c056af6-482d-4a29-b757-71c11276c7d0	gshop-public	Nitecore P20iX Tactical Flashlight_image_3_main	\N	2025-10-24 16:50:25.264656+00	2025-10-24 16:50:25.264656+00	2025-10-24 16:50:25.264656+00	{"eTag": "\\"4ae4b1fcb943bf4a295bb3c07b014d73\\"", "size": 25700, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:26.000Z", "contentLength": 25700, "httpStatusCode": 200}	f1cffbdc-3621-4ef2-873d-2a620ce2acde	\N	{}	1
a574ec8e-6aa3-4c98-b031-68ff520143a6	gshop-public	Nitecore EDC35 5000_image_2_thumbnail	\N	2025-10-24 17:14:34.846763+00	2025-10-24 17:14:34.846763+00	2025-10-24 17:14:34.846763+00	{"eTag": "\\"5d4c545b99d57656e14a8c52dc69e8db\\"", "size": 3276, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:35.000Z", "contentLength": 3276, "httpStatusCode": 200}	c64770a7-5daa-4f6d-a21b-08b4610792ba	\N	{}	1
ef21a3c0-0e85-4a34-aae8-742d1ef4d8fb	gshop-public	Nitecore P20iX Tactical Flashlight_image_3_preview	\N	2025-10-24 16:50:26.423454+00	2025-10-24 16:50:26.423454+00	2025-10-24 16:50:26.423454+00	{"eTag": "\\"aec23c92813e7fc9da78812120226ca4\\"", "size": 9396, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:27.000Z", "contentLength": 9396, "httpStatusCode": 200}	153ad2c7-8e51-4f68-8487-2b60b450b6a0	\N	{}	1
23767601-e57b-45eb-8a81-fcc3ebb3ea50	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_3_main	\N	2025-10-24 17:49:13.011701+00	2025-10-24 17:49:13.011701+00	2025-10-24 17:49:13.011701+00	{"eTag": "\\"113fecd8221daddc654257cf7978a2cd\\"", "size": 45342, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:13.000Z", "contentLength": 45342, "httpStatusCode": 200}	1d134d20-1c87-4704-91e1-643caac9fbab	\N	{}	1
dda84d2a-05d4-4bc5-8ea9-0452da4f74b4	gshop-public	Nitecore P20iX Tactical Flashlight_image_3_thumbnail	\N	2025-10-24 16:50:27.211171+00	2025-10-24 16:50:27.211171+00	2025-10-24 16:50:27.211171+00	{"eTag": "\\"9a70567d9506de6bc055c5085ea429de\\"", "size": 2148, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T16:50:28.000Z", "contentLength": 2148, "httpStatusCode": 200}	ed7484e1-7170-4cc5-9be8-1305aa4c175a	\N	{}	1
40bde5a4-f30c-49d0-b684-b07c9f134e70	gshop-public	Nitecore EDC35 5000_image_3_main	\N	2025-10-24 17:14:35.470629+00	2025-10-24 17:14:35.470629+00	2025-10-24 17:14:35.470629+00	{"eTag": "\\"4fa7918b9436ffb1e1029fe8dc7f6d05\\"", "size": 31748, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:36.000Z", "contentLength": 31748, "httpStatusCode": 200}	f7d633c0-0891-42db-8259-7a3e8383af88	\N	{}	1
801e982a-84e7-4093-8ea2-2c348c509ff7	gshop-public	Nitecore EDC35 5000_image_3_preview	\N	2025-10-24 17:14:36.497218+00	2025-10-24 17:14:36.497218+00	2025-10-24 17:14:36.497218+00	{"eTag": "\\"64237d9784f059cf51741350f969be9c\\"", "size": 26646, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:37.000Z", "contentLength": 26646, "httpStatusCode": 200}	eb0f1d0f-9d47-4611-866b-74049ce27200	\N	{}	1
0ca4abf2-56c9-44c0-b6bc-7aa941a75409	gshop-public	Nitecore EDC35 5000_image_3_thumbnail	\N	2025-10-24 17:14:37.406535+00	2025-10-24 17:14:37.406535+00	2025-10-24 17:14:37.406535+00	{"eTag": "\\"2f94689e7087f656719dca495dfdc119\\"", "size": 4218, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:38.000Z", "contentLength": 4218, "httpStatusCode": 200}	894c378b-02f9-4d4c-991c-1e4c8a741142	\N	{}	1
1dd67ea8-f787-4530-903b-e69e365ea7d4	gshop-public	Nitecore EDC35 5000_image_4_main	\N	2025-10-24 17:14:38.296059+00	2025-10-24 17:14:38.296059+00	2025-10-24 17:14:38.296059+00	{"eTag": "\\"0498effcda326262281112151215573e\\"", "size": 14088, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:14:39.000Z", "contentLength": 14088, "httpStatusCode": 200}	e3899590-22df-49b0-86a0-a21ba8472f4b	\N	{}	1
88b730d9-1e73-48aa-a2c0-4e1ae0ee0fe0	gshop-public	NORTIV 8 Hiking Boots_image_1_main	\N	2025-10-24 17:20:26.503299+00	2025-10-24 17:20:26.503299+00	2025-10-24 17:20:26.503299+00	{"eTag": "\\"65fccfe35ef0e34ab5fd4d5fc8861561\\"", "size": 81348, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:27.000Z", "contentLength": 81348, "httpStatusCode": 200}	04ae0dda-fca7-41a4-80be-10a0d89bd941	\N	{}	1
9b8685e5-cab8-46cb-89ad-7dfe77bcfd73	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_3_preview	\N	2025-10-24 17:49:13.754923+00	2025-10-24 17:49:13.754923+00	2025-10-24 17:49:13.754923+00	{"eTag": "\\"b18ff1a1496376fcec348a530cbc144c\\"", "size": 29236, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:14.000Z", "contentLength": 29236, "httpStatusCode": 200}	cc99cba3-7c4f-4ea3-b205-f027af4f2609	\N	{}	1
e9e385f5-81ce-4fa8-b9ad-2707e2c74252	gshop-public	NORTIV 8 Hiking Boots_image_1_preview	\N	2025-10-24 17:20:27.417775+00	2025-10-24 17:20:27.417775+00	2025-10-24 17:20:27.417775+00	{"eTag": "\\"089e9fe0653d0a44230fd63cebd5f2cc\\"", "size": 44620, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:28.000Z", "contentLength": 44620, "httpStatusCode": 200}	edf0fece-626e-4cf4-9767-22383a87fe3e	\N	{}	1
e48f9223-2fdf-484b-bf77-95e624496a29	gshop-public	NORTIV 8 Hiking Boots_image_1_thumbnail	\N	2025-10-24 17:20:28.276702+00	2025-10-24 17:20:28.276702+00	2025-10-24 17:20:28.276702+00	{"eTag": "\\"ed0b68575f93d7422c260b84a20de90b\\"", "size": 6510, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:29.000Z", "contentLength": 6510, "httpStatusCode": 200}	18a8a0e8-2776-4984-9f0d-f89ad18d91cf	\N	{}	1
d71c9118-5d2c-4f69-b09a-97c2ab3b96b1	gshop-public	Helikon-Tex Men UTP Ripstop Pants_image_3_thumbnail	\N	2025-10-24 17:49:14.648577+00	2025-10-24 17:49:14.648577+00	2025-10-24 17:49:14.648577+00	{"eTag": "\\"b1faea04cac06689b963d492d743b13c\\"", "size": 4478, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:49:15.000Z", "contentLength": 4478, "httpStatusCode": 200}	bc8f9c40-f267-4898-beb4-5551a9dd64df	\N	{}	1
b18b7ef6-2d8c-4651-b1fd-31667f91d246	gshop-public	NORTIV 8 Hiking Boots_image_2_main	\N	2025-10-24 17:20:29.336484+00	2025-10-24 17:20:29.336484+00	2025-10-24 17:20:29.336484+00	{"eTag": "\\"c5a7bc7133863a51c539def74d638a6f\\"", "size": 84508, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:30.000Z", "contentLength": 84508, "httpStatusCode": 200}	83871efa-e604-4eca-8866-7b602f89c20a	\N	{}	1
46262f80-ce6b-4a65-8527-32916e5086ec	gshop-public	sda_image_0_main	\N	2025-10-25 20:05:15.368023+00	2025-10-25 20:05:15.368023+00	2025-10-25 20:05:15.368023+00	{"eTag": "\\"709356a7d9ce7813c6218e82ef89c6e2\\"", "size": 18162, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:16.000Z", "contentLength": 18162, "httpStatusCode": 200}	ca4e5845-539c-4f43-9b45-a8edf76aac4d	\N	{}	1
2d5bf313-5bb3-4526-9b3b-b9b18a1ca539	gshop-public	NORTIV 8 Hiking Boots_image_2_preview	\N	2025-10-24 17:20:30.119405+00	2025-10-24 17:20:30.119405+00	2025-10-24 17:20:30.119405+00	{"eTag": "\\"e2b88ed972bdf12025a6cc3362595e91\\"", "size": 49224, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:31.000Z", "contentLength": 49224, "httpStatusCode": 200}	ecfa8dfb-19d3-4e10-93e3-f06c6ef568da	\N	{}	1
05d91344-b5d1-4589-a089-ea8916d9c8db	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_0_main	\N	2025-10-24 17:50:28.412303+00	2025-10-24 17:50:28.412303+00	2025-10-24 17:50:28.412303+00	{"eTag": "\\"00474e434c18d3231bd0a730a44f8d1f\\"", "size": 32792, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:29.000Z", "contentLength": 32792, "httpStatusCode": 200}	5614421b-75d0-4ca2-80c6-9f6996e92889	\N	{}	1
b9657d39-ae2b-486d-afcd-3249a6791b0c	gshop-public	NORTIV 8 Hiking Boots_image_2_thumbnail	\N	2025-10-24 17:20:30.963049+00	2025-10-24 17:20:30.963049+00	2025-10-24 17:20:30.963049+00	{"eTag": "\\"509b3aefb2cc42c754c5b90a88dfac03\\"", "size": 7834, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:31.000Z", "contentLength": 7834, "httpStatusCode": 200}	09775fb6-d346-498e-ab93-38f1753e879e	\N	{}	1
b67a2a9d-11de-440a-b3c3-15ddef0601a0	gshop-public	NORTIV 8 Hiking Boots_image_3_main	\N	2025-10-24 17:20:31.528771+00	2025-10-24 17:20:31.528771+00	2025-10-24 17:20:31.528771+00	{"eTag": "\\"733baab559ea635a0440b8f3c2e8ddf1\\"", "size": 57492, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:32.000Z", "contentLength": 57492, "httpStatusCode": 200}	38a99ae7-bdc4-4303-8fa6-296e74c625de	\N	{}	1
149d9daf-bb55-42e9-a308-03514e691ee8	gshop-public	NORTIV 8 Hiking Boots_image_3_preview	\N	2025-10-24 17:20:32.36601+00	2025-10-24 17:20:32.36601+00	2025-10-24 17:20:32.36601+00	{"eTag": "\\"d438fca2a221828b5b6b8081b101ac0b\\"", "size": 29520, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:33.000Z", "contentLength": 29520, "httpStatusCode": 200}	63418ac0-7477-4f38-8d80-cb2791a107df	\N	{}	1
66516c83-e1de-44c3-9cf3-ae72638ff0bb	gshop-public	NORTIV 8 Hiking Boots_image_3_thumbnail	\N	2025-10-24 17:20:33.320945+00	2025-10-24 17:20:33.320945+00	2025-10-24 17:20:33.320945+00	{"eTag": "\\"ae22ad6bf246edbac04b862bc3064847\\"", "size": 5906, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:34.000Z", "contentLength": 5906, "httpStatusCode": 200}	f58562e2-a58c-4c6f-b0b5-394e080ae8a8	\N	{}	1
5b02c93b-921f-4644-9bcc-1c1467e89a2f	gshop-public	NORTIV 8 Hiking Boots_image_4_main	\N	2025-10-24 17:20:34.323606+00	2025-10-24 17:20:34.323606+00	2025-10-24 17:20:34.323606+00	{"eTag": "\\"609ea0210457eb91a4d2bdd0dc52344c\\"", "size": 69832, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:35.000Z", "contentLength": 69832, "httpStatusCode": 200}	b937d8c2-22b7-436d-9025-f5a193c14e26	\N	{}	1
c0f36073-38d1-4f99-9752-a927d7399c7d	gshop-public	NORTIV 8 Hiking Boots_image_4_preview	\N	2025-10-24 17:20:34.955117+00	2025-10-24 17:20:34.955117+00	2025-10-24 17:20:34.955117+00	{"eTag": "\\"626fbc9bab0aa457276c06b7e62ae46f\\"", "size": 37320, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:35.000Z", "contentLength": 37320, "httpStatusCode": 200}	cfa63127-e0bf-4a71-b543-a1131d9f22af	\N	{}	1
c7f3fce2-123c-4625-8234-b9163902d4ab	gshop-public	NORTIV 8 Hiking Boots_image_4_thumbnail	\N	2025-10-24 17:20:36.060604+00	2025-10-24 17:20:36.060604+00	2025-10-24 17:20:36.060604+00	{"eTag": "\\"175c8cf300c615fff38805a4e39b4c33\\"", "size": 6112, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:20:36.000Z", "contentLength": 6112, "httpStatusCode": 200}	31ca1fa5-38ad-436e-87fb-b5abadedc87d	\N	{}	1
ac4c6278-5636-4ae6-8f6f-3da696dab847	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_0_main	\N	2025-10-24 17:22:38.114661+00	2025-10-24 17:22:38.114661+00	2025-10-24 17:22:38.114661+00	{"eTag": "\\"d3608b7436de712fcd67c81da2743633\\"", "size": 77892, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:39.000Z", "contentLength": 77892, "httpStatusCode": 200}	343dccc3-c41b-4df8-b317-a787ceed2da7	\N	{}	1
cd7ff849-572f-4949-9c71-c2baf0329b08	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_0_preview	\N	2025-10-24 17:50:29.676329+00	2025-10-24 17:50:29.676329+00	2025-10-24 17:50:29.676329+00	{"eTag": "\\"0c01df8dea73b6fb8a056230836e59e6\\"", "size": 10430, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:30.000Z", "contentLength": 10430, "httpStatusCode": 200}	921f962e-5688-4f6c-bbed-a3247f9380ed	\N	{}	1
59231fd5-6d13-4b4e-ae14-fea433e2eef9	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_0_preview	\N	2025-10-24 17:22:38.904678+00	2025-10-24 17:22:38.904678+00	2025-10-24 17:22:38.904678+00	{"eTag": "\\"bf673835a565c7de6c05583395687d0d\\"", "size": 39614, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:39.000Z", "contentLength": 39614, "httpStatusCode": 200}	46df02d5-993f-4882-9e22-82f88aee4732	\N	{}	1
d86e7b2d-e3b9-437e-9597-493148f3e260	gshop-public	sda_image_0_preview	\N	2025-10-25 20:05:16.159798+00	2025-10-25 20:05:16.159798+00	2025-10-25 20:05:16.159798+00	{"eTag": "\\"a352e72453f2c56616c717e3869b88ac\\"", "size": 17396, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:17.000Z", "contentLength": 17396, "httpStatusCode": 200}	dc19d6c5-d46e-4474-b9bf-cb8f5d849cbf	\N	{}	1
f238e722-bd2d-4e81-9494-f90550e9f7c7	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_0_thumbnail	\N	2025-10-24 17:22:39.782855+00	2025-10-24 17:22:39.782855+00	2025-10-24 17:22:39.782855+00	{"eTag": "\\"2511e1ea4205c69deeb9252aa3312a32\\"", "size": 4640, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:40.000Z", "contentLength": 4640, "httpStatusCode": 200}	c8145551-d443-4c0f-963c-2073e7623c32	\N	{}	1
628080e8-ec7a-4a8b-aa8b-94114a2b38f7	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_0_thumbnail	\N	2025-10-24 17:50:30.473082+00	2025-10-24 17:50:30.473082+00	2025-10-24 17:50:30.473082+00	{"eTag": "\\"56913a9cca5c29692f5bbb2d86f323b6\\"", "size": 2544, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:31.000Z", "contentLength": 2544, "httpStatusCode": 200}	2bc59d44-e691-4d08-a728-eb6fd28f4227	\N	{}	1
74369af4-34c1-43af-a0c8-550768c746dd	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_1_main	\N	2025-10-24 17:22:40.463078+00	2025-10-24 17:22:40.463078+00	2025-10-24 17:22:40.463078+00	{"eTag": "\\"f60d5d2d7016f1c9115ab59a4b8c9f3e\\"", "size": 61786, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:41.000Z", "contentLength": 61786, "httpStatusCode": 200}	75541502-a1d5-4fc1-8ec2-2cae353b8a3d	\N	{}	1
c813b399-e5ac-4cb0-b02f-76a769ae8a27	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_1_preview	\N	2025-10-24 17:22:41.416162+00	2025-10-24 17:22:41.416162+00	2025-10-24 17:22:41.416162+00	{"eTag": "\\"689b3be080eacccd45a34de5c4042d0c\\"", "size": 31960, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:42.000Z", "contentLength": 31960, "httpStatusCode": 200}	9ad6745c-4f8d-45f6-a552-f91d3010a14d	\N	{}	1
62a00b12-270b-46f7-a163-f3b5f8a8920a	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_1_main	\N	2025-10-24 17:50:31.738549+00	2025-10-24 17:50:31.738549+00	2025-10-24 17:50:31.738549+00	{"eTag": "\\"00d91b9ff5e5a0271387c98d8999f743\\"", "size": 32300, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:32.000Z", "contentLength": 32300, "httpStatusCode": 200}	1a968876-db98-4365-b2e4-9a2e421dbd5b	\N	{}	1
07800789-675f-43db-885b-ae45cf0bba0c	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_1_thumbnail	\N	2025-10-24 17:22:42.112864+00	2025-10-24 17:22:42.112864+00	2025-10-24 17:22:42.112864+00	{"eTag": "\\"eca0b37d76b45e7734a86cdbcba17cb0\\"", "size": 5000, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:43.000Z", "contentLength": 5000, "httpStatusCode": 200}	53c5d3ea-4af8-4edb-8663-a52c66405d06	\N	{}	1
20cdd6ee-f058-43ed-b0bb-61345ff2978c	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_2_main	\N	2025-10-24 17:22:43.358676+00	2025-10-24 17:22:43.358676+00	2025-10-24 17:22:43.358676+00	{"eTag": "\\"7ae71980247960adeda3883331826bfa\\"", "size": 94606, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:44.000Z", "contentLength": 94606, "httpStatusCode": 200}	1bd27587-5e45-406d-9f8d-26c560f692e7	\N	{}	1
cc0bacb0-16a3-4769-8f01-b9d708dfa42c	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_2_preview	\N	2025-10-24 17:22:43.959527+00	2025-10-24 17:22:43.959527+00	2025-10-24 17:22:43.959527+00	{"eTag": "\\"61fa0b5966ec33be574c92afcde678ce\\"", "size": 66452, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:44.000Z", "contentLength": 66452, "httpStatusCode": 200}	638ad6c8-44ba-459a-9b5d-f876d7ce5346	\N	{}	1
a0a4d290-a4f1-41ee-b720-646a195089ca	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_2_thumbnail	\N	2025-10-24 17:22:44.914933+00	2025-10-24 17:22:44.914933+00	2025-10-24 17:22:44.914933+00	{"eTag": "\\"e478fd039ccee9929c5c6cca9eb7e17a\\"", "size": 10316, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:45.000Z", "contentLength": 10316, "httpStatusCode": 200}	f7658e21-3530-472a-bfca-854c2473d700	\N	{}	1
0ed4dba8-8f3b-4439-a4fb-1e5bd21f50fb	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_3_main	\N	2025-10-24 17:22:45.686883+00	2025-10-24 17:22:45.686883+00	2025-10-24 17:22:45.686883+00	{"eTag": "\\"f0d7b1403afb7eec616b40493ae152c3\\"", "size": 107716, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:46.000Z", "contentLength": 107716, "httpStatusCode": 200}	186c407e-371d-4f0a-ae04-9886687c481c	\N	{}	1
052d479c-0fb3-410d-898f-9d8c5edf0be6	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_3_preview	\N	2025-10-24 17:22:46.613173+00	2025-10-24 17:22:46.613173+00	2025-10-24 17:22:46.613173+00	{"eTag": "\\"8cae3ea237645663f51117b8ebd67306\\"", "size": 68018, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:47.000Z", "contentLength": 68018, "httpStatusCode": 200}	2904ce8a-96a3-4a9d-9db0-c8bd732f92ce	\N	{}	1
c0941842-1c3e-4166-95d7-5c998ea35cba	gshop-public	SHULOOK Men's Waterproof Hiking Boots _image_3_thumbnail	\N	2025-10-24 17:22:47.358433+00	2025-10-24 17:22:47.358433+00	2025-10-24 17:22:47.358433+00	{"eTag": "\\"26633fe28f203d100c4da0713d7d00ac\\"", "size": 8598, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:22:48.000Z", "contentLength": 8598, "httpStatusCode": 200}	f5d47674-7fc8-4a79-8312-fd82a55b29b5	\N	{}	1
e05a312f-16ce-4b94-966f-e96205d27f98	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_1_preview	\N	2025-10-24 17:50:32.474554+00	2025-10-24 17:50:32.474554+00	2025-10-24 17:50:32.474554+00	{"eTag": "\\"fd3c8e0ad190f1ba93ee2a8876903714\\"", "size": 13974, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:33.000Z", "contentLength": 13974, "httpStatusCode": 200}	3cf7aaf6-989e-4888-a13a-07e14a18b579	\N	{}	1
846d4d7a-3933-47a9-85c9-58f5a46afe58	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_0_main	\N	2025-10-24 17:24:36.295051+00	2025-10-24 17:24:36.295051+00	2025-10-24 17:24:36.295051+00	{"eTag": "\\"f66beb6623162a2c5278457527c7f86e\\"", "size": 62568, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:37.000Z", "contentLength": 62568, "httpStatusCode": 200}	d1b331ad-36da-40fa-b40a-dbe3fdc5f129	\N	{}	1
edb94429-8fe5-4442-b540-3b611c22aede	gshop-public	sda_image_0_thumbnail	\N	2025-10-25 20:05:17.149648+00	2025-10-25 20:05:17.149648+00	2025-10-25 20:05:17.149648+00	{"eTag": "\\"611f59177b22f8cfbf77c0b83a5f82a4\\"", "size": 4508, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:18.000Z", "contentLength": 4508, "httpStatusCode": 200}	6e1ff608-0cd0-4f32-8756-996883d127ba	\N	{}	1
0f68719f-e4cc-4bab-94c1-a04f2837eff0	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_0_preview	\N	2025-10-24 17:24:36.916347+00	2025-10-24 17:24:36.916347+00	2025-10-24 17:24:36.916347+00	{"eTag": "\\"b7f7e0226ae644889ea6a135548a3650\\"", "size": 34436, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:37.000Z", "contentLength": 34436, "httpStatusCode": 200}	e7dcbfa3-3397-481a-9afc-6e823b99fcba	\N	{}	1
82f58c42-23c1-4397-be3d-97e77a5aa1b7	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_1_thumbnail	\N	2025-10-24 17:50:33.565539+00	2025-10-24 17:50:33.565539+00	2025-10-24 17:50:33.565539+00	{"eTag": "\\"fbdc3153fa02f050a8b71e937c57a996\\"", "size": 2900, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:34.000Z", "contentLength": 2900, "httpStatusCode": 200}	4dd794d0-61e7-4ff6-87cc-9725d0da69eb	\N	{}	1
8f86b8b4-3c42-4c5d-a664-547f10761e4f	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_0_thumbnail	\N	2025-10-24 17:24:37.905859+00	2025-10-24 17:24:37.905859+00	2025-10-24 17:24:37.905859+00	{"eTag": "\\"03fd54f03e796592cffd1a2803a3882f\\"", "size": 4766, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:38.000Z", "contentLength": 4766, "httpStatusCode": 200}	b1475e56-380b-49c1-abb1-b42e8ff39c13	\N	{}	1
3f45b8f0-6b4a-4972-8382-0d7bbd311c81	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_1_main	\N	2025-10-24 17:24:38.483947+00	2025-10-24 17:24:38.483947+00	2025-10-24 17:24:38.483947+00	{"eTag": "\\"1950a707eeba2f8bf62883ca94aff22a\\"", "size": 59774, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:39.000Z", "contentLength": 59774, "httpStatusCode": 200}	846021ac-2130-48fb-8c6e-2d0bb34bbe2c	\N	{}	1
76332305-dedc-4999-97af-6e55d4e2df6a	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_2_main	\N	2025-10-24 17:50:34.128991+00	2025-10-24 17:50:34.128991+00	2025-10-24 17:50:34.128991+00	{"eTag": "\\"179e3df87ec7eb9e55e8ccddc3306493\\"", "size": 42264, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:35.000Z", "contentLength": 42264, "httpStatusCode": 200}	6836071a-0ea4-4184-ad8f-bf122026197d	\N	{}	1
b7465c07-bf31-42ac-bf65-0e5036c109a7	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_1_preview	\N	2025-10-24 17:24:39.430231+00	2025-10-24 17:24:39.430231+00	2025-10-24 17:24:39.430231+00	{"eTag": "\\"af611fe7473fdec7a6f32e44a1bfb1bf\\"", "size": 38020, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:40.000Z", "contentLength": 38020, "httpStatusCode": 200}	d6958ad6-5a35-4b2d-b98a-0f81cf908e18	\N	{}	1
883d6feb-790b-48c4-9b02-0ab22fd0e52f	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_1_thumbnail	\N	2025-10-24 17:24:40.258344+00	2025-10-24 17:24:40.258344+00	2025-10-24 17:24:40.258344+00	{"eTag": "\\"228842df7585ec4e64c18e40fba65dc3\\"", "size": 5096, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:41.000Z", "contentLength": 5096, "httpStatusCode": 200}	3bc88a14-474e-430a-b362-c26ef92e8513	\N	{}	1
c5477d6d-67d8-44d6-95df-1f838da7f525	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_2_main	\N	2025-10-24 17:24:41.373904+00	2025-10-24 17:24:41.373904+00	2025-10-24 17:24:41.373904+00	{"eTag": "\\"d035a3d083839d3696996334fb0a3e91\\"", "size": 55886, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:42.000Z", "contentLength": 55886, "httpStatusCode": 200}	711864af-a849-44c4-a507-5b1d73a23fa6	\N	{}	1
ba09179b-c4b9-445d-a4ed-3ba1e5b6468b	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_2_preview	\N	2025-10-24 17:24:42.170459+00	2025-10-24 17:24:42.170459+00	2025-10-24 17:24:42.170459+00	{"eTag": "\\"9be2aa4991718e4dd84a95f1f71267f7\\"", "size": 35166, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:43.000Z", "contentLength": 35166, "httpStatusCode": 200}	230b15f1-0888-41b3-bfdf-64a2bab2c730	\N	{}	1
37df3862-40e8-426a-815f-d5623dee815c	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_2_thumbnail	\N	2025-10-24 17:24:43.20406+00	2025-10-24 17:24:43.20406+00	2025-10-24 17:24:43.20406+00	{"eTag": "\\"43cf456b1ad2b2db1bb580f69419997a\\"", "size": 4708, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:44.000Z", "contentLength": 4708, "httpStatusCode": 200}	3dcaffb2-be1a-43b7-a339-cc89cdd9cef6	\N	{}	1
ccc04373-5f2b-42c7-871b-04a4fe886de1	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_3_main	\N	2025-10-24 17:24:43.833549+00	2025-10-24 17:24:43.833549+00	2025-10-24 17:24:43.833549+00	{"eTag": "\\"e75b8310dda0d6d50de52edba720f384\\"", "size": 81564, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:44.000Z", "contentLength": 81564, "httpStatusCode": 200}	389cf66f-1a11-4371-97de-46412477c36f	\N	{}	1
01759236-9507-4396-a564-fd2bc0d7aaed	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_3_preview	\N	2025-10-24 17:24:44.929696+00	2025-10-24 17:24:44.929696+00	2025-10-24 17:24:44.929696+00	{"eTag": "\\"6d20ea46820b9710e6c74b0c44b68e75\\"", "size": 57426, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:45.000Z", "contentLength": 57426, "httpStatusCode": 200}	53b4aade-c883-41aa-88ec-1a1e3db4815b	\N	{}	1
8b7d8423-19a0-4c7e-9359-99c80e268709	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_2_preview	\N	2025-10-24 17:50:35.137446+00	2025-10-24 17:50:35.137446+00	2025-10-24 17:50:35.137446+00	{"eTag": "\\"ab8f17e9c811eab942bbdf3cced68210\\"", "size": 9946, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:36.000Z", "contentLength": 9946, "httpStatusCode": 200}	acd42f61-12c0-4470-9c18-567e0067a19f	\N	{}	1
16f7630e-4122-4d55-a5d3-c6df63988147	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_3_thumbnail	\N	2025-10-24 17:24:45.626929+00	2025-10-24 17:24:45.626929+00	2025-10-24 17:24:45.626929+00	{"eTag": "\\"a049cd1122d92d2d4ed488395e19fb75\\"", "size": 9912, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:46.000Z", "contentLength": 9912, "httpStatusCode": 200}	64ba3193-7c7f-442a-a145-e8393ebf4921	\N	{}	1
4fcaeba1-4b8e-407c-93c3-fbb06a29bdc3	gshop-public	sda_image_1_main	\N	2025-10-25 20:05:17.897731+00	2025-10-25 20:05:17.897731+00	2025-10-25 20:05:17.897731+00	{"eTag": "\\"709356a7d9ce7813c6218e82ef89c6e2\\"", "size": 18162, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:18.000Z", "contentLength": 18162, "httpStatusCode": 200}	5a89151b-b808-42e9-b2e9-d735f8a0bd0b	\N	{}	1
9c2b1723-2c85-4882-9740-ee639d82d898	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_4_main	\N	2025-10-24 17:24:46.510803+00	2025-10-24 17:24:46.510803+00	2025-10-24 17:24:46.510803+00	{"eTag": "\\"02ae07950600dda8cff8d67a1fd36c6a\\"", "size": 28158, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:47.000Z", "contentLength": 28158, "httpStatusCode": 200}	6f6d28e6-2857-493a-980d-38ac130dffdb	\N	{}	1
f4aacf8a-1f0a-4312-8b46-1300aa3b0aa3	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_2_thumbnail	\N	2025-10-24 17:50:35.76422+00	2025-10-24 17:50:35.76422+00	2025-10-24 17:50:35.76422+00	{"eTag": "\\"f5eb2d3312b58335d4fcda059de4be8f\\"", "size": 2280, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:36.000Z", "contentLength": 2280, "httpStatusCode": 200}	42f76f4e-5654-46f4-a76f-641ad883021e	\N	{}	1
347a73d4-1b20-4331-bdaf-5e5f5f5be666	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_4_preview	\N	2025-10-24 17:24:47.24796+00	2025-10-24 17:24:47.24796+00	2025-10-24 17:24:47.24796+00	{"eTag": "\\"704fc70469df318ba050dd0d75072be7\\"", "size": 16880, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:48.000Z", "contentLength": 16880, "httpStatusCode": 200}	a33ebabc-eae1-4397-9423-b56a00ad5ec5	\N	{}	1
4821901d-9e58-44ac-b0b8-1349e69eb2bf	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_4_thumbnail	\N	2025-10-24 17:24:48.13183+00	2025-10-24 17:24:48.13183+00	2025-10-24 17:24:48.13183+00	{"eTag": "\\"e2c8bb7dd05062639a22050f7aa8af42\\"", "size": 3456, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:49.000Z", "contentLength": 3456, "httpStatusCode": 200}	f7268080-884d-4174-a93c-b731b8c26e96	\N	{}	1
db9a7b17-a760-4f9d-9865-496653b63e79	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_3_main	\N	2025-10-24 17:50:36.800852+00	2025-10-24 17:50:36.800852+00	2025-10-24 17:50:36.800852+00	{"eTag": "\\"a8a22da371046793b51a1ca752cf2e29\\"", "size": 22944, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:37.000Z", "contentLength": 22944, "httpStatusCode": 200}	9feeb486-6c5b-4440-af4c-64d317961c94	\N	{}	1
5a2aa29d-f9af-4f9c-94c5-aba83e508a3b	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_5_main	\N	2025-10-24 17:24:49.431083+00	2025-10-24 17:24:49.431083+00	2025-10-24 17:24:49.431083+00	{"eTag": "\\"176c35f4630f262adc79a41d7ea71b7e\\"", "size": 60480, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:50.000Z", "contentLength": 60480, "httpStatusCode": 200}	3ff52a20-bf4a-4ae0-abcb-5f912ac90b2c	\N	{}	1
99e4fc52-fac3-450c-9e22-c99617328391	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_5_preview	\N	2025-10-24 17:24:50.316187+00	2025-10-24 17:24:50.316187+00	2025-10-24 17:24:50.316187+00	{"eTag": "\\"02a966f3abe4d1c628b570d632cb5273\\"", "size": 41656, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:51.000Z", "contentLength": 41656, "httpStatusCode": 200}	4ae28e00-08f9-42e4-b565-ded6f6f0b751	\N	{}	1
cc2de59d-05fd-4c5d-bdc2-e6aa151037e2	gshop-public	HAIX Scout 2.0 Ultra Durable  Boots_image_5_thumbnail	\N	2025-10-24 17:24:50.976079+00	2025-10-24 17:24:50.976079+00	2025-10-24 17:24:50.976079+00	{"eTag": "\\"0f03f965302e9d3846757e22db1ed7e8\\"", "size": 6908, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:24:51.000Z", "contentLength": 6908, "httpStatusCode": 200}	d0137330-f7cb-4175-a78f-f14891491e8a	\N	{}	1
a4cd10f1-91a9-49b9-ac93-4c9085745a9e	gshop-public	Merrell Men's Waterproof Hiking Boot_image_0_main	\N	2025-10-24 17:26:20.851763+00	2025-10-24 17:26:20.851763+00	2025-10-24 17:26:20.851763+00	{"eTag": "\\"b1d1bad7666f71bf4d5341df5b8efe99\\"", "size": 59608, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:21.000Z", "contentLength": 59608, "httpStatusCode": 200}	a17436d8-09a3-4ed4-bb94-820adf705807	\N	{}	1
445e5034-d19d-4e20-a216-f09ee5e6ca65	gshop-public	Merrell Men's Waterproof Hiking Boot_image_0_preview	\N	2025-10-24 17:26:21.817774+00	2025-10-24 17:26:21.817774+00	2025-10-24 17:26:21.817774+00	{"eTag": "\\"37e7732c708d9177c1c939399f08d0c1\\"", "size": 33340, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:22.000Z", "contentLength": 33340, "httpStatusCode": 200}	9bda4c79-f04c-40d6-bf30-99f96b99bde8	\N	{}	1
cd10e041-3ef9-4a12-b117-bf92575a0bf5	gshop-public	Merrell Men's Waterproof Hiking Boot_image_0_thumbnail	\N	2025-10-24 17:26:23.068123+00	2025-10-24 17:26:23.068123+00	2025-10-24 17:26:23.068123+00	{"eTag": "\\"43592e74bf227073ed537d2470379eb3\\"", "size": 4884, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:24.000Z", "contentLength": 4884, "httpStatusCode": 200}	bcca2e25-208b-4426-9c78-115422d9c884	\N	{}	1
a1c1e371-41aa-46cf-b855-9c99858a0861	gshop-public	Merrell Men's Waterproof Hiking Boot_image_1_main	\N	2025-10-24 17:26:23.705976+00	2025-10-24 17:26:23.705976+00	2025-10-24 17:26:23.705976+00	{"eTag": "\\"ed32983c2c168f9986f30e236d38690a\\"", "size": 71994, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:24.000Z", "contentLength": 71994, "httpStatusCode": 200}	4d9db950-64a5-4249-b9b8-aa577e386b6b	\N	{}	1
5772a79a-8bba-481d-90a7-8debd0bc8702	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_3_preview	\N	2025-10-24 17:50:37.529087+00	2025-10-24 17:50:37.529087+00	2025-10-24 17:50:37.529087+00	{"eTag": "\\"38f3144c79ec7858022ebeb75089a0c5\\"", "size": 10174, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:38.000Z", "contentLength": 10174, "httpStatusCode": 200}	4ca0ca18-275f-4515-868f-ee048979d2c6	\N	{}	1
42536290-2c41-4f00-896a-81d914e2733c	gshop-public	Merrell Men's Waterproof Hiking Boot_image_1_preview	\N	2025-10-24 17:26:24.633826+00	2025-10-24 17:26:24.633826+00	2025-10-24 17:26:24.633826+00	{"eTag": "\\"fb5e3395d177e1f8d6d7e4ce9878fc75\\"", "size": 44950, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:25.000Z", "contentLength": 44950, "httpStatusCode": 200}	7915459f-1431-43f9-847c-8d2dcce23e1a	\N	{}	1
dd949398-fd6c-4de4-b7ce-328b502ff4a6	gshop-public	sda_image_1_preview	\N	2025-10-25 20:05:18.916428+00	2025-10-25 20:05:18.916428+00	2025-10-25 20:05:18.916428+00	{"eTag": "\\"a352e72453f2c56616c717e3869b88ac\\"", "size": 17396, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:19.000Z", "contentLength": 17396, "httpStatusCode": 200}	14bbcc96-2fb1-4032-9c6d-73a5692230ec	\N	{}	1
1c9db24a-97b2-4a35-b50b-dac9fb11fe65	gshop-public	Merrell Men's Waterproof Hiking Boot_image_1_thumbnail	\N	2025-10-24 17:26:25.22331+00	2025-10-24 17:26:25.22331+00	2025-10-24 17:26:25.22331+00	{"eTag": "\\"0c234b4c170c9d77d9f21aae7f6f8574\\"", "size": 5880, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:26.000Z", "contentLength": 5880, "httpStatusCode": 200}	a64fa2fb-e7c5-49de-9a4d-7874e4e93f8d	\N	{}	1
7c089df7-e48c-4040-963f-7b604721c833	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_3_thumbnail	\N	2025-10-24 17:50:38.728069+00	2025-10-24 17:50:38.728069+00	2025-10-24 17:50:38.728069+00	{"eTag": "\\"d0b7dcd868ec1d22d2dc6de3dea53170\\"", "size": 2456, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:39.000Z", "contentLength": 2456, "httpStatusCode": 200}	f4c75ba0-4bd9-45e3-8f2d-8089bede045c	\N	{}	1
2b334b87-8fb7-488e-9460-faeebebfd87b	gshop-public	Merrell Men's Waterproof Hiking Boot_image_2_main	\N	2025-10-24 17:26:26.395806+00	2025-10-24 17:26:26.395806+00	2025-10-24 17:26:26.395806+00	{"eTag": "\\"f06f23db8e74769fb95003be3b0806a0\\"", "size": 53208, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:27.000Z", "contentLength": 53208, "httpStatusCode": 200}	5a7eab2a-57a3-4160-ad79-117f7c7f59ae	\N	{}	1
92462d89-254f-46d2-a48e-961980a97eca	gshop-public	Merrell Men's Waterproof Hiking Boot_image_2_preview	\N	2025-10-24 17:26:27.180296+00	2025-10-24 17:26:27.180296+00	2025-10-24 17:26:27.180296+00	{"eTag": "\\"37d8ee02838279842228d7b3e2d4e5e7\\"", "size": 29200, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:28.000Z", "contentLength": 29200, "httpStatusCode": 200}	b2f68fe3-6116-4079-9b27-e4493e1eb3c4	\N	{}	1
af3b088c-05c5-4d00-a89c-5881cf45b335	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_4_main	\N	2025-10-24 17:50:39.510759+00	2025-10-24 17:50:39.510759+00	2025-10-24 17:50:39.510759+00	{"eTag": "\\"755b938186bc7ff4db1ce9032e4ea4b1\\"", "size": 19736, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:40.000Z", "contentLength": 19736, "httpStatusCode": 200}	17a5582c-b5c8-4260-8362-4a0be44cb2b4	\N	{}	1
77d6d7db-c503-40f0-970f-30f7a661e566	gshop-public	Merrell Men's Waterproof Hiking Boot_image_2_thumbnail	\N	2025-10-24 17:26:28.108032+00	2025-10-24 17:26:28.108032+00	2025-10-24 17:26:28.108032+00	{"eTag": "\\"9eb1441ec4aa0485863c70f0890474a0\\"", "size": 4522, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:29.000Z", "contentLength": 4522, "httpStatusCode": 200}	0f7a71fd-d857-4421-8675-c40691aaba71	\N	{}	1
ea28cc90-094a-4301-b8ed-db8a912bba4b	gshop-public	Merrell Men's Waterproof Hiking Boot_image_3_main	\N	2025-10-24 17:26:28.858219+00	2025-10-24 17:26:28.858219+00	2025-10-24 17:26:28.858219+00	{"eTag": "\\"9210eb69a0ff0984f82d3e45c551af87\\"", "size": 55062, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:29.000Z", "contentLength": 55062, "httpStatusCode": 200}	9c8236d2-e2e9-439a-b759-c5147c12d1ca	\N	{}	1
5da72bac-05ba-4ee0-b692-5ba947cadfc1	gshop-public	Merrell Men's Waterproof Hiking Boot_image_3_preview	\N	2025-10-24 17:26:29.86236+00	2025-10-24 17:26:29.86236+00	2025-10-24 17:26:29.86236+00	{"eTag": "\\"a95432c20596d6d8ddf6d0439e5c4580\\"", "size": 29766, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:30.000Z", "contentLength": 29766, "httpStatusCode": 200}	9e8e3926-d10c-4b99-a7ae-998444a9d5cd	\N	{}	1
cf53e973-8535-48e4-9a6d-4797b6dc2e78	gshop-public	Merrell Men's Waterproof Hiking Boot_image_3_thumbnail	\N	2025-10-24 17:26:30.460789+00	2025-10-24 17:26:30.460789+00	2025-10-24 17:26:30.460789+00	{"eTag": "\\"76bd5178dc8a94fa673ca706ac54115a\\"", "size": 4182, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:31.000Z", "contentLength": 4182, "httpStatusCode": 200}	40a5890e-6c88-4fd0-9b01-e1a3b7062c89	\N	{}	1
18337909-51bf-4eea-8e59-c06a4a7f7bef	gshop-public	Merrell Men's Waterproof Hiking Boot_image_4_main	\N	2025-10-24 17:26:31.512175+00	2025-10-24 17:26:31.512175+00	2025-10-24 17:26:31.512175+00	{"eTag": "\\"2b97ad68ba0706d3da98603a6bb87dfe\\"", "size": 31752, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:32.000Z", "contentLength": 31752, "httpStatusCode": 200}	ea3dcb0a-b1fe-4b5a-a17f-a5cdf0dd7861	\N	{}	1
3f8ace6d-332c-4273-9e1a-a7855a6ca85c	gshop-public	Merrell Men's Waterproof Hiking Boot_image_4_preview	\N	2025-10-24 17:26:32.30122+00	2025-10-24 17:26:32.30122+00	2025-10-24 17:26:32.30122+00	{"eTag": "\\"383182f6a07b5a666ddb1bc6b5c307dc\\"", "size": 18882, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:33.000Z", "contentLength": 18882, "httpStatusCode": 200}	ff7c6389-8676-4645-b892-d293df994a41	\N	{}	1
83efe9a1-326c-47b2-be59-77dcb125758d	gshop-public	Merrell Men's Waterproof Hiking Boot_image_4_thumbnail	\N	2025-10-24 17:26:33.239856+00	2025-10-24 17:26:33.239856+00	2025-10-24 17:26:33.239856+00	{"eTag": "\\"ed2c5e161645d78b67d2e86335259562\\"", "size": 3924, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:34.000Z", "contentLength": 3924, "httpStatusCode": 200}	c1305a4a-67f9-4fe7-b916-dabff6ee5646	\N	{}	1
17cce365-450d-4a22-876b-15a41b9a1c5f	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_4_preview	\N	2025-10-24 17:50:40.510592+00	2025-10-24 17:50:40.510592+00	2025-10-24 17:50:40.510592+00	{"eTag": "\\"04d3dc7aa610546cc46795bde6907a1e\\"", "size": 8268, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:41.000Z", "contentLength": 8268, "httpStatusCode": 200}	00ff1d23-dd3d-45a9-b1b5-85d734b2bdb7	\N	{}	1
94d74a7e-7c6a-440a-a8f1-7635390b3e74	gshop-public	Merrell Men's Waterproof Hiking Boot_image_5_main	\N	2025-10-24 17:26:33.894477+00	2025-10-24 17:26:33.894477+00	2025-10-24 17:26:33.894477+00	{"eTag": "\\"971615dbfdd506fce79ebe99a4a6e5e6\\"", "size": 37776, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:34.000Z", "contentLength": 37776, "httpStatusCode": 200}	601a9d66-cab6-4709-8fdf-5d62b1e7c6b6	\N	{}	1
e4631500-b4e2-44f1-8a9e-3aa17fe1689d	gshop-public	sda_image_1_thumbnail	\N	2025-10-25 20:05:19.668132+00	2025-10-25 20:05:19.668132+00	2025-10-25 20:05:19.668132+00	{"eTag": "\\"611f59177b22f8cfbf77c0b83a5f82a4\\"", "size": 4508, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:20.000Z", "contentLength": 4508, "httpStatusCode": 200}	89834f4a-0477-416f-9da4-b7ca204cb3fb	\N	{}	1
9b3ea687-7853-4b65-bc30-46f3fd7f261e	gshop-public	Merrell Men's Waterproof Hiking Boot_image_5_preview	\N	2025-10-24 17:26:34.89992+00	2025-10-24 17:26:34.89992+00	2025-10-24 17:26:34.89992+00	{"eTag": "\\"0b0d68b2e7e500a00e896c573b95726e\\"", "size": 23262, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:35.000Z", "contentLength": 23262, "httpStatusCode": 200}	4ad7b5b9-aee9-41e2-acdb-68dfd6e9fe95	\N	{}	1
4a1da54b-cdd2-4501-b019-5d2b36a38d79	gshop-public	THE NORTH FACE Men's Freedom Insulated Pant_image_4_thumbnail	\N	2025-10-24 17:50:41.023379+00	2025-10-24 17:50:41.023379+00	2025-10-24 17:50:41.023379+00	{"eTag": "\\"1b6ae4b6cb18790bd6da73e6316179a7\\"", "size": 1914, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:50:41.000Z", "contentLength": 1914, "httpStatusCode": 200}	3d22822d-5b25-4ee9-8847-5f7811c0e445	\N	{}	1
967ddaac-2ca5-4c49-94e6-53a6fdf8eebb	gshop-public	Merrell Men's Waterproof Hiking Boot_image_5_thumbnail	\N	2025-10-24 17:26:35.589647+00	2025-10-24 17:26:35.589647+00	2025-10-24 17:26:35.589647+00	{"eTag": "\\"27c905f16f37327768035d1be3f0c94b\\"", "size": 3310, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:26:36.000Z", "contentLength": 3310, "httpStatusCode": 200}	18d678fb-5dcd-45cf-a65f-6f66eca608e0	\N	{}	1
156958fd-877e-4530-8b54-da8ed240afc3	gshop-public	Danner Skyridge Hiking Boots for Men_image_0_main	\N	2025-10-24 17:28:04.870049+00	2025-10-24 17:28:04.870049+00	2025-10-24 17:28:04.870049+00	{"eTag": "\\"2691ba83714e374514b64bbc526d9aa9\\"", "size": 87614, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:05.000Z", "contentLength": 87614, "httpStatusCode": 200}	b63ac6f4-8cd7-4d71-91d5-0b6220d9a361	\N	{}	1
068ee898-d3bd-4c12-ae10-8230849b4f02	gshop-public	Danner Skyridge Hiking Boots for Men_image_0_preview	\N	2025-10-24 17:28:05.652671+00	2025-10-24 17:28:05.652671+00	2025-10-24 17:28:05.652671+00	{"eTag": "\\"926f79e0cb6aa483eba96c341eee6096\\"", "size": 32216, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:06.000Z", "contentLength": 32216, "httpStatusCode": 200}	df28be25-c3ed-475b-9f98-a448742cc59d	\N	{}	1
621829e7-5afb-4d13-8df2-61645a40a02e	gshop-public	Danner Skyridge Hiking Boots for Men_image_0_thumbnail	\N	2025-10-24 17:28:06.692575+00	2025-10-24 17:28:06.692575+00	2025-10-24 17:28:06.692575+00	{"eTag": "\\"c487e0af7a3f739c2b2fa298386b79ad\\"", "size": 4030, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:07.000Z", "contentLength": 4030, "httpStatusCode": 200}	2467e235-b442-4cd7-8f8c-91e8a35e89ff	\N	{}	1
c4a77c88-8f03-4427-bc4b-d7c2e6e54dbe	gshop-public	THE NORTH FACE Men's Freedom Pant _image_0_main	\N	2025-10-24 17:53:17.591692+00	2025-10-24 17:55:51.930045+00	2025-10-24 17:53:17.591692+00	{"eTag": "\\"52656a1053b065e2a03afafda5bff52b\\"", "size": 36004, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:55:52.000Z", "contentLength": 36004, "httpStatusCode": 200}	ac359c56-87c7-4526-bc3a-cc4bb95ccd6d	\N	{}	1
e871e4af-ffb9-465b-a46e-789ef4dbd517	gshop-public	Danner Skyridge Hiking Boots for Men_image_1_main	\N	2025-10-24 17:28:07.54885+00	2025-10-24 17:28:07.54885+00	2025-10-24 17:28:07.54885+00	{"eTag": "\\"1d6b5a705a248dc7049d2172d3fd117a\\"", "size": 75688, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:08.000Z", "contentLength": 75688, "httpStatusCode": 200}	2ab0eaa6-a346-4a63-a16c-e3e76c336488	\N	{}	1
3e5786be-d2c6-4cab-a5e2-da2821bfdf5f	gshop-public	Danner Skyridge Hiking Boots for Men_image_1_preview	\N	2025-10-24 17:28:08.583337+00	2025-10-24 17:28:08.583337+00	2025-10-24 17:28:08.583337+00	{"eTag": "\\"d5696b285c9791041e56aa74d88a8716\\"", "size": 44556, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:09.000Z", "contentLength": 44556, "httpStatusCode": 200}	de20c341-5275-468c-9755-46ace2137e09	\N	{}	1
ddba2264-801e-4923-bde5-c44a78f2f5f6	gshop-public	Danner Skyridge Hiking Boots for Men_image_1_thumbnail	\N	2025-10-24 17:28:09.497701+00	2025-10-24 17:28:09.497701+00	2025-10-24 17:28:09.497701+00	{"eTag": "\\"0698597106069ee4a4c99c6b652bff54\\"", "size": 6650, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:10.000Z", "contentLength": 6650, "httpStatusCode": 200}	7a4939d0-660a-4e69-9a58-d55edc8eba34	\N	{}	1
0878d836-c140-440a-a6a5-4df3c5614a9f	gshop-public	Danner Skyridge Hiking Boots for Men_image_2_main	\N	2025-10-24 17:28:10.398034+00	2025-10-24 17:28:10.398034+00	2025-10-24 17:28:10.398034+00	{"eTag": "\\"848e5113147e333752625d661318626e\\"", "size": 49096, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:11.000Z", "contentLength": 49096, "httpStatusCode": 200}	82d6558c-51ef-480b-a561-a73c9473616a	\N	{}	1
fe585b2b-79b6-406a-a360-7ac8400199c5	gshop-public	Danner Skyridge Hiking Boots for Men_image_2_preview	\N	2025-10-24 17:28:11.32377+00	2025-10-24 17:28:11.32377+00	2025-10-24 17:28:11.32377+00	{"eTag": "\\"ed1009082974ca78e2936728b2a8bd2d\\"", "size": 29794, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:12.000Z", "contentLength": 29794, "httpStatusCode": 200}	bd6391fa-bc0f-4b66-afef-71b360465af4	\N	{}	1
51501283-4f35-4089-8e71-64914d7534a2	gshop-public	sda_image_2_main	\N	2025-10-25 20:05:20.566588+00	2025-10-25 20:05:20.566588+00	2025-10-25 20:05:20.566588+00	{"eTag": "\\"709356a7d9ce7813c6218e82ef89c6e2\\"", "size": 18162, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:21.000Z", "contentLength": 18162, "httpStatusCode": 200}	6ce48f9e-4598-48ae-af4d-186a3d0f2e16	\N	{}	1
a7e96824-800b-471a-acfa-003953673aa3	gshop-public	Danner Skyridge Hiking Boots for Men_image_2_thumbnail	\N	2025-10-24 17:28:12.223484+00	2025-10-24 17:28:12.223484+00	2025-10-24 17:28:12.223484+00	{"eTag": "\\"62fa9397b80722469557b1509ef6e215\\"", "size": 5046, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:13.000Z", "contentLength": 5046, "httpStatusCode": 200}	4d582dcb-491e-4be3-a20b-dcecd77b7c30	\N	{}	1
341c2927-0762-4dc2-acaf-c40f2d230810	gshop-public	Danner Skyridge Hiking Boots for Men_image_3_main	\N	2025-10-24 17:28:13.226623+00	2025-10-24 17:28:13.226623+00	2025-10-24 17:28:13.226623+00	{"eTag": "\\"666815aca9ce0e9f88025998be7e74da\\"", "size": 58038, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:14.000Z", "contentLength": 58038, "httpStatusCode": 200}	1484775a-6a25-4f6e-b434-fd37f24256a9	\N	{}	1
6abd97b6-fc59-4235-8fbf-779fc8d51219	gshop-public	Danner Skyridge Hiking Boots for Men_image_3_preview	\N	2025-10-24 17:28:14.156167+00	2025-10-24 17:28:14.156167+00	2025-10-24 17:28:14.156167+00	{"eTag": "\\"af4e926b38ed4919d80b84b097b694ca\\"", "size": 30666, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:15.000Z", "contentLength": 30666, "httpStatusCode": 200}	54781773-a6fd-4ef7-bc16-c545501f81c6	\N	{}	1
8e3fb532-e3c6-46bf-933c-ea911eed418b	gshop-public	Danner Skyridge Hiking Boots for Men_image_3_thumbnail	\N	2025-10-24 17:28:14.702963+00	2025-10-24 17:28:14.702963+00	2025-10-24 17:28:14.702963+00	{"eTag": "\\"56fe7c43ee8ca710fbe6071b688703c6\\"", "size": 6162, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:15.000Z", "contentLength": 6162, "httpStatusCode": 200}	4cfb3320-ab4d-40ed-a5ee-9a62cd966cea	\N	{}	1
04989f68-2591-4399-8c6a-3ca68b58b094	gshop-public	sda_image_2_preview	\N	2025-10-25 20:05:21.144387+00	2025-10-25 20:05:21.144387+00	2025-10-25 20:05:21.144387+00	{"eTag": "\\"a352e72453f2c56616c717e3869b88ac\\"", "size": 17396, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:22.000Z", "contentLength": 17396, "httpStatusCode": 200}	f66e4aa1-2d75-4472-a18e-b1321762314c	\N	{}	1
3bfbbee3-ce1b-4487-b324-6401fd78db52	gshop-public	Danner Skyridge Hiking Boots for Men_image_4_main	\N	2025-10-24 17:28:15.726847+00	2025-10-24 17:28:15.726847+00	2025-10-24 17:28:15.726847+00	{"eTag": "\\"ce7a60a93788d5881f62dcba712bb814\\"", "size": 49404, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:16.000Z", "contentLength": 49404, "httpStatusCode": 200}	21f8f203-1809-4bdf-a66b-a912ea7c0bf7	\N	{}	1
4d20c9a4-5ad6-42f0-b467-861c3d6f5008	gshop-public	Danner Skyridge Hiking Boots for Men_image_4_preview	\N	2025-10-24 17:28:16.712951+00	2025-10-24 17:28:16.712951+00	2025-10-24 17:28:16.712951+00	{"eTag": "\\"0226ac7cd6637d497851dde4f924598c\\"", "size": 26826, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:17.000Z", "contentLength": 26826, "httpStatusCode": 200}	a171d09e-1a87-45d6-8748-0d5df32812b6	\N	{}	1
1eb6a9f5-bf6e-42fc-afb5-acc4bdc01d0e	gshop-public	Danner Skyridge Hiking Boots for Men_image_4_thumbnail	\N	2025-10-24 17:28:18.076278+00	2025-10-24 17:28:18.076278+00	2025-10-24 17:28:18.076278+00	{"eTag": "\\"970804ecb24eabf64f5e8ad3931da5a2\\"", "size": 4540, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:28:19.000Z", "contentLength": 4540, "httpStatusCode": 200}	39637de5-04ee-498f-98c2-1b185f8cfea0	\N	{}	1
15ff694b-7608-47d5-84ba-a0e6e9997362	gshop-public	THE NORTH FACE Men's Freedom Pant _image_0_preview	\N	2025-10-24 17:53:18.37095+00	2025-10-24 17:55:52.616487+00	2025-10-24 17:53:18.37095+00	{"eTag": "\\"d79b23f039b1589ca31589a96f566fe1\\"", "size": 11260, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:55:53.000Z", "contentLength": 11260, "httpStatusCode": 200}	cfcbdcfc-fe90-436e-900e-831ff51aff0d	\N	{}	1
74a30cb7-9ac8-41e0-a05b-8087b7068538	gshop-public	THE NORTH FACE Men's Freedom Pant _image_0_thumbnail	\N	2025-10-24 17:53:19.487392+00	2025-10-24 17:55:53.931503+00	2025-10-24 17:53:19.487392+00	{"eTag": "\\"facd48d281fa89a373f148aac05092c9\\"", "size": 2616, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:55:54.000Z", "contentLength": 2616, "httpStatusCode": 200}	3ccc9486-5a83-40f5-909f-a0d20a39cc08	\N	{}	1
e78393ff-22cf-4016-90c6-e41b380d68ad	gshop-public	THE NORTH FACE Men's Freedom Pant _image_1_main	\N	2025-10-24 17:53:20.332019+00	2025-10-24 17:55:54.560886+00	2025-10-24 17:53:20.332019+00	{"eTag": "\\"2a73579c33b3ecbb03b1cb85ed57aa28\\"", "size": 42320, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:55:55.000Z", "contentLength": 42320, "httpStatusCode": 200}	e931b775-4a28-4c0a-9231-46764f9fc771	\N	{}	1
b9e7ecdc-3a7a-45b8-8033-ddfd60d48879	gshop-public	THE NORTH FACE Men's Freedom Pant _image_1_preview	\N	2025-10-24 17:53:21.299175+00	2025-10-24 17:55:55.905176+00	2025-10-24 17:53:21.299175+00	{"eTag": "\\"80842f4ae13030a97a3154acd20630bc\\"", "size": 13454, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:55:56.000Z", "contentLength": 13454, "httpStatusCode": 200}	f812c8b1-be6e-4c08-9332-2ac0ed289caf	\N	{}	1
dadbafc3-8836-4195-92f2-87ccce4fa977	gshop-public	THE NORTH FACE Men's Freedom Pant _image_1_thumbnail	\N	2025-10-24 17:53:21.985523+00	2025-10-24 17:55:56.689686+00	2025-10-24 17:53:21.985523+00	{"eTag": "\\"840052aef3dddbc3b49f694c94c3c718\\"", "size": 2530, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:55:57.000Z", "contentLength": 2530, "httpStatusCode": 200}	366f7831-4bd6-48c9-81a0-c4e22e329a40	\N	{}	1
800fc91f-e9ba-4b69-a4a5-c6db03c35392	gshop-public	sda_image_2_thumbnail	\N	2025-10-25 20:05:22.172274+00	2025-10-25 20:05:22.172274+00	2025-10-25 20:05:22.172274+00	{"eTag": "\\"611f59177b22f8cfbf77c0b83a5f82a4\\"", "size": 4508, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:23.000Z", "contentLength": 4508, "httpStatusCode": 200}	5a021dcc-5aaa-4520-aa64-c96ee679a901	\N	{}	1
1258c9e1-3ee2-4677-b397-123a2ba4648f	gshop-public	THE NORTH FACE Men's Freedom Pant _image_2_main	\N	2025-10-24 17:53:22.952662+00	2025-10-24 17:55:57.795589+00	2025-10-24 17:53:22.952662+00	{"eTag": "\\"0998e0b72fb06cc5fa4d652594dc3b9b\\"", "size": 71916, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:55:58.000Z", "contentLength": 71916, "httpStatusCode": 200}	34d74f32-ac6a-467b-a432-061cdeec52ff	\N	{}	1
86ad0f1c-cb48-4b12-bd4b-343d134bdf3a	gshop-public	SITKA Men's Hunting Pants_image_0_preview	\N	2025-10-24 17:57:19.36275+00	2025-10-24 17:57:19.36275+00	2025-10-24 17:57:19.36275+00	{"eTag": "\\"d547f20688a154be3ce3a921222bf9c3\\"", "size": 5670, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:20.000Z", "contentLength": 5670, "httpStatusCode": 200}	49b27199-caba-4ca1-8eee-eb9075e13239	\N	{}	1
435f1287-d9a3-47a8-8426-2d4b16370f58	gshop-public	Camping Tents_preview	\N	2025-10-24 17:33:41.834082+00	2025-10-24 20:15:46.621257+00	2025-10-24 17:33:41.834082+00	{"eTag": "\\"5b194106cf2957a32305d7d7be47b1aa\\"", "size": 13822, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:15:47.000Z", "contentLength": 13822, "httpStatusCode": 200}	a0cc3471-431b-4c65-8108-b4eef064ae58	\N	{}	1
404285ca-5845-41c2-8169-e3041dfe4a98	gshop-public	SITKA Men's Hunting Pants_image_0_thumbnail	\N	2025-10-24 17:57:20.324202+00	2025-10-24 17:57:20.324202+00	2025-10-24 17:57:20.324202+00	{"eTag": "\\"bf988e7388b7d68bd3aa94b8f93da7bc\\"", "size": 1566, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:21.000Z", "contentLength": 1566, "httpStatusCode": 200}	fa3e7532-b22f-4b37-b6c9-a4320950a82a	\N	{}	1
1fe81197-b1bc-43df-a2e1-467e46c562d3	gshop-public	Hiking Boots_preview	\N	2025-10-24 17:28:49.510764+00	2025-10-24 20:14:54.72931+00	2025-10-24 17:28:49.510764+00	{"eTag": "\\"926f79e0cb6aa483eba96c341eee6096\\"", "size": 32216, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:14:55.000Z", "contentLength": 32216, "httpStatusCode": 200}	fb4f6749-d796-4299-9a61-d11939490724	\N	{}	1
e79a9d64-4b29-493c-b437-c9eb1c3ef062	gshop-public	SITKA Men's Hunting Pants_image_1_main	\N	2025-10-24 17:57:20.910314+00	2025-10-24 17:57:20.910314+00	2025-10-24 17:57:20.910314+00	{"eTag": "\\"971f4eccfb22399d8331b34fab599fee\\"", "size": 31008, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:21.000Z", "contentLength": 31008, "httpStatusCode": 200}	b9ebd122-0d8c-43e2-90eb-397a51362472	\N	{}	1
d3fbe8db-5e9d-4dc1-b08d-608ae6f639b4	gshop-public	SITKA Men's Hunting Pants_image_1_preview	\N	2025-10-24 17:57:21.90482+00	2025-10-24 17:57:21.90482+00	2025-10-24 17:57:21.90482+00	{"eTag": "\\"8876c7b6c8795d3349ebd727970ccdee\\"", "size": 16978, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:22.000Z", "contentLength": 16978, "httpStatusCode": 200}	de246710-dfa5-4612-aca3-7836ccfb5bce	\N	{}	1
e1629173-06ae-4b37-b456-040f2421f393	gshop-public	sda_image_3_main	\N	2025-10-25 20:05:23.374407+00	2025-10-25 20:05:23.374407+00	2025-10-25 20:05:23.374407+00	{"eTag": "\\"da9c8be856d60ebf3816613c659b3eb8\\"", "size": 55106, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:24.000Z", "contentLength": 55106, "httpStatusCode": 200}	c7759c45-1a1a-4e83-83f9-22b0e99e25bb	\N	{}	1
341e3306-19c0-4bbc-9d6b-3a41f45ec210	gshop-public	SITKA Men's Hunting Pants_image_1_thumbnail	\N	2025-10-24 17:57:22.494622+00	2025-10-24 17:57:22.494622+00	2025-10-24 17:57:22.494622+00	{"eTag": "\\"43a3381e112921e12ab24d0b50c5337d\\"", "size": 3842, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:23.000Z", "contentLength": 3842, "httpStatusCode": 200}	0fccab03-7e20-470b-81c0-92fe2216b740	\N	{}	1
bbfbb670-b798-4f31-95df-b41f326639e2	gshop-public	SITKA Men's Hunting Pants_image_2_main	\N	2025-10-24 17:57:23.605304+00	2025-10-24 17:57:23.605304+00	2025-10-24 17:57:23.605304+00	{"eTag": "\\"b452a1c772290caf384aab6f01c2d4dd\\"", "size": 35652, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:24.000Z", "contentLength": 35652, "httpStatusCode": 200}	01c2f90c-b1ea-46f2-9f1c-292989391663	\N	{}	1
3eb5a32c-a323-4a03-9183-b62d09258eec	gshop-public	SITKA Men's Hunting Pants_image_2_preview	\N	2025-10-24 17:57:24.853784+00	2025-10-24 17:57:24.853784+00	2025-10-24 17:57:24.853784+00	{"eTag": "\\"313289a19fc38a7cd0a1aaf7911da8b6\\"", "size": 18380, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:25.000Z", "contentLength": 18380, "httpStatusCode": 200}	aa33de63-454c-433a-9e6d-23aa30580f2e	\N	{}	1
2f421b1a-bf6f-453e-9c2c-b39cee017432	gshop-public	SITKA Men's Hunting Pants_image_2_thumbnail	\N	2025-10-24 17:57:25.598778+00	2025-10-24 17:57:25.598778+00	2025-10-24 17:57:25.598778+00	{"eTag": "\\"c340c261511f439bb6e08f7e585e6a5b\\"", "size": 3672, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:26.000Z", "contentLength": 3672, "httpStatusCode": 200}	f05b3a05-9110-446e-a0ca-71751e7c5d76	\N	{}	1
af548f49-6cc9-4231-a1ab-9a584dc2ab3b	gshop-public	SITKA Men's Hunting Pants_image_3_main	\N	2025-10-24 17:57:26.968561+00	2025-10-24 17:57:26.968561+00	2025-10-24 17:57:26.968561+00	{"eTag": "\\"6f1b0b975f6c3aae23e2c62d13087130\\"", "size": 66276, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:27.000Z", "contentLength": 66276, "httpStatusCode": 200}	3ea8dcfe-199e-4a12-86c6-f3c4ab801761	\N	{}	1
a909a167-2698-4635-8ef5-77307b3cffd0	gshop-public	SITKA Men's Hunting Pants_image_3_preview	\N	2025-10-24 17:57:27.620354+00	2025-10-24 17:57:27.620354+00	2025-10-24 17:57:27.620354+00	{"eTag": "\\"17f26a4b8b2a4eef40588fdca666e487\\"", "size": 13232, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:28.000Z", "contentLength": 13232, "httpStatusCode": 200}	04e7bb00-2824-4df9-83a9-7846c61d1cd0	\N	{}	1
de6a463e-15a3-4d3d-86a9-96eec213d551	gshop-public	SITKA Men's Hunting Pants_image_3_thumbnail	\N	2025-10-24 17:57:28.70643+00	2025-10-24 17:57:28.70643+00	2025-10-24 17:57:28.70643+00	{"eTag": "\\"82b9c7c6098c23342e0b3d5662761f75\\"", "size": 2816, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:29.000Z", "contentLength": 2816, "httpStatusCode": 200}	7d03856e-64ac-46d3-8416-7fdd294dae79	\N	{}	1
d18c1f9e-4f98-4e79-a2e5-99f9fce46a96	gshop-public	Hiking Pants_preview	\N	2025-10-24 17:45:45.677808+00	2025-10-24 20:16:13.198137+00	2025-10-24 17:45:45.677808+00	{"eTag": "\\"b3f579dd2c7543f82765692859fc5269\\"", "size": 25596, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:16:14.000Z", "contentLength": 25596, "httpStatusCode": 200}	57a2b4c9-f59c-42cb-afbb-5f835b140b48	\N	{}	1
48e38cd2-9a68-440c-81d3-0ccf8ea6ecbd	gshop-public	Flashlights_preview	\N	2025-10-24 17:44:42.062916+00	2025-10-24 20:15:57.368869+00	2025-10-24 17:44:42.062916+00	{"eTag": "\\"536dced9309b353bcaf9a39d06306fda\\"", "size": 15834, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:15:58.000Z", "contentLength": 15834, "httpStatusCode": 200}	40a2e213-eb56-49a3-a0b5-588510603e55	\N	{}	1
53bcafed-c634-43a9-94c3-d8578e0d0592	gshop-public	FORLOH Men's BTM Pro Pant _image_0_main	\N	2025-10-24 17:47:40.777769+00	2025-10-24 17:47:40.777769+00	2025-10-24 17:47:40.777769+00	{"eTag": "\\"7e1f99b00f84701bd2e10603ee08b6b1\\"", "size": 21580, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:41.000Z", "contentLength": 21580, "httpStatusCode": 200}	85817421-941f-4d2b-b270-41feb355de48	\N	{}	1
0be8c7d6-9bf8-43e6-be40-ef54c0d9d4f7	gshop-public	sda_image_3_preview	\N	2025-10-25 20:05:24.278903+00	2025-10-25 20:05:24.278903+00	2025-10-25 20:05:24.278903+00	{"eTag": "\\"9a58a5ce30b6513b5d98330f1eb43a2f\\"", "size": 32226, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:25.000Z", "contentLength": 32226, "httpStatusCode": 200}	7c64accd-f7be-462b-ad82-af953e248162	\N	{}	1
297174cb-525d-47c5-8257-e2d47956c7e2	gshop-public	FORLOH Men's BTM Pro Pant _image_0_preview	\N	2025-10-24 17:47:42.070514+00	2025-10-24 17:47:42.070514+00	2025-10-24 17:47:42.070514+00	{"eTag": "\\"88a9e67d0aad7eb15cfb6b2ace08562f\\"", "size": 7466, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:42.000Z", "contentLength": 7466, "httpStatusCode": 200}	7aac441a-0098-4dd7-bc3b-39ec7b8b61fe	\N	{}	1
eb94bdd1-3434-4b95-be4c-c399f27c10ff	gshop-public	THE NORTH FACE Men's Freedom Pant _image_2_preview	\N	2025-10-24 17:55:58.51283+00	2025-10-24 17:55:58.51283+00	2025-10-24 17:55:58.51283+00	{"eTag": "\\"ea4c83fbb03fe0602113d981546ca1ec\\"", "size": 9866, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:55:59.000Z", "contentLength": 9866, "httpStatusCode": 200}	42863865-0a63-4592-9b89-11b87469cc4a	\N	{}	1
a9e0784d-c79c-42cf-9809-3b11d317c674	gshop-public	FORLOH Men's BTM Pro Pant _image_0_thumbnail	\N	2025-10-24 17:47:42.995952+00	2025-10-24 17:47:42.995952+00	2025-10-24 17:47:42.995952+00	{"eTag": "\\"abecb5c79a34e847ba9516c49883c6e1\\"", "size": 1678, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:43.000Z", "contentLength": 1678, "httpStatusCode": 200}	50dca93a-7a4c-48a0-9111-04c1473f1f42	\N	{}	1
a985df4c-e950-4ee8-8f6a-d80e873cd8f0	gshop-public	FORLOH Men's BTM Pro Pant _image_1_main	\N	2025-10-24 17:47:43.70469+00	2025-10-24 17:47:43.70469+00	2025-10-24 17:47:43.70469+00	{"eTag": "\\"cc1cafc53b732723b37d254aed0ac754\\"", "size": 71030, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:44.000Z", "contentLength": 71030, "httpStatusCode": 200}	493524c4-fe17-4241-9e00-0fdd56771b64	\N	{}	1
0e6e5716-9bfb-439d-92d4-51cebe82a8d3	gshop-public	sda_image_3_thumbnail	\N	2025-10-25 20:05:24.980888+00	2025-10-25 20:05:24.980888+00	2025-10-25 20:05:24.980888+00	{"eTag": "\\"a2fbdbe4df7bc718f0cd0b51045ec5c3\\"", "size": 5996, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-25T20:05:25.000Z", "contentLength": 5996, "httpStatusCode": 200}	f7c829bd-444d-42db-ae78-af55f15c6106	\N	{}	1
f305032b-0190-4263-93d2-48150d7dc2ea	gshop-public	FORLOH Men's BTM Pro Pant _image_1_preview	\N	2025-10-24 17:47:44.745668+00	2025-10-24 17:47:44.745668+00	2025-10-24 17:47:44.745668+00	{"eTag": "\\"337b31b05bdc1f1043a72aadc04fd75d\\"", "size": 34620, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:45.000Z", "contentLength": 34620, "httpStatusCode": 200}	30e63849-4373-4e42-ba4f-1f843f7224b0	\N	{}	1
9e332a8f-e7ce-44b7-b78d-b030053520cf	gshop-public	FORLOH Men's BTM Pro Pant _image_1_thumbnail	\N	2025-10-24 17:47:45.341616+00	2025-10-24 17:47:45.341616+00	2025-10-24 17:47:45.341616+00	{"eTag": "\\"8681efc89b531a52acc4da6002601826\\"", "size": 3152, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:46.000Z", "contentLength": 3152, "httpStatusCode": 200}	d40765d1-a957-45cd-aaad-05876d3e2a52	\N	{}	1
6a728de5-f340-48d3-b471-1425337b2590	gshop-public	FORLOH Men's BTM Pro Pant _image_2_main	\N	2025-10-24 17:47:46.553654+00	2025-10-24 17:47:46.553654+00	2025-10-24 17:47:46.553654+00	{"eTag": "\\"9a4343a2c3b96dc1cb25d0e9d15d8606\\"", "size": 16392, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:47.000Z", "contentLength": 16392, "httpStatusCode": 200}	38c92640-7390-4fd4-8069-340bf964e480	\N	{}	1
e5d8afde-3110-44be-87da-ac268bbd2c09	gshop-public	FORLOH Men's BTM Pro Pant _image_2_preview	\N	2025-10-24 17:47:47.827833+00	2025-10-24 17:47:47.827833+00	2025-10-24 17:47:47.827833+00	{"eTag": "\\"9b972de9c0ae10ffc7f3a60f638a70db\\"", "size": 5652, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:48.000Z", "contentLength": 5652, "httpStatusCode": 200}	abf513b2-b6b7-43bc-82f0-b4668bea9f9b	\N	{}	1
2f8f1990-1780-4669-8e95-dc176fdd4f82	gshop-public	FORLOH Men's BTM Pro Pant _image_2_thumbnail	\N	2025-10-24 17:47:49.185971+00	2025-10-24 17:47:49.185971+00	2025-10-24 17:47:49.185971+00	{"eTag": "\\"c20ba8f394dee166ce770996776cea64\\"", "size": 1488, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:50.000Z", "contentLength": 1488, "httpStatusCode": 200}	252b247b-607f-4d29-8490-403ff259313b	\N	{}	1
f59efb84-6db9-4a2a-bb54-5b61dcfa15c2	gshop-public	FORLOH Men's BTM Pro Pant _image_3_main	\N	2025-10-24 17:47:49.879503+00	2025-10-24 17:47:49.879503+00	2025-10-24 17:47:49.879503+00	{"eTag": "\\"daaff05e8fded2d35593c9d970a7abed\\"", "size": 23898, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:50.000Z", "contentLength": 23898, "httpStatusCode": 200}	6ad67539-3a1d-41b2-8606-afa901bb9dca	\N	{}	1
d082a31d-af5e-4c9c-b24b-95704f237ea7	gshop-public	THE NORTH FACE Men's Freedom Pant _image_2_thumbnail	\N	2025-10-24 17:56:00.227109+00	2025-10-24 17:56:00.227109+00	2025-10-24 17:56:00.227109+00	{"eTag": "\\"ce6cf70d73e068cae1a27d8bf274553c\\"", "size": 2186, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:56:01.000Z", "contentLength": 2186, "httpStatusCode": 200}	66c6609b-8bf2-4204-bab2-083593f58eb6	\N	{}	1
0ed50d0e-1f3c-4312-9055-0c33ed40c485	gshop-public	FORLOH Men's BTM Pro Pant _image_3_preview	\N	2025-10-24 17:47:50.88946+00	2025-10-24 17:47:50.88946+00	2025-10-24 17:47:50.88946+00	{"eTag": "\\"f7f928af8235e705513c9619362b4cd4\\"", "size": 7710, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:51.000Z", "contentLength": 7710, "httpStatusCode": 200}	ffa2b3d9-7851-479a-9f0e-16850079990c	\N	{}	1
58229b35-b010-4957-b4ca-4e72f82fec04	gshop-public	FORLOH Men's BTM Pro Pant _image_3_thumbnail	\N	2025-10-24 17:47:51.552059+00	2025-10-24 17:47:51.552059+00	2025-10-24 17:47:51.552059+00	{"eTag": "\\"9ac07d531f55ad72894904e502e272ea\\"", "size": 1720, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:52.000Z", "contentLength": 1720, "httpStatusCode": 200}	9c4390b8-a20b-48ce-bff4-62bfee964803	\N	{}	1
86797fe2-7892-4998-b468-6c42ca3c2538	gshop-public	THE NORTH FACE Men's Freedom Pant _image_3_main	\N	2025-10-24 17:56:00.975425+00	2025-10-24 17:56:00.975425+00	2025-10-24 17:56:00.975425+00	{"eTag": "\\"00ce343fd840b1869c3cc15f113f1087\\"", "size": 31450, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:56:01.000Z", "contentLength": 31450, "httpStatusCode": 200}	675e2e16-7903-4c96-a6fe-18dbab57f1f0	\N	{}	1
b934a850-e5cb-48a6-beab-1a4474f694c9	gshop-public	FORLOH Men's BTM Pro Pant _image_4_main	\N	2025-10-24 17:47:52.818847+00	2025-10-24 17:47:52.818847+00	2025-10-24 17:47:52.818847+00	{"eTag": "\\"107a705362e8aacc14f478d6296c8f6f\\"", "size": 96866, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:53.000Z", "contentLength": 96866, "httpStatusCode": 200}	119da637-5381-4042-b898-e0373beb56cf	\N	{}	1
5c90f3a3-71e0-4ebe-8be9-5bc8fc489c6b	gshop-public	FORLOH Men's BTM Pro Pant _image_4_preview	\N	2025-10-24 17:47:53.353855+00	2025-10-24 17:47:53.353855+00	2025-10-24 17:47:53.353855+00	{"eTag": "\\"95acb0a9d548f0b7629b4714ca6095ca\\"", "size": 27114, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:54.000Z", "contentLength": 27114, "httpStatusCode": 200}	bdae7571-3353-44aa-91d6-3d24d9946424	\N	{}	1
8e18ed82-e12e-4c55-9e7e-3acf5939181d	gshop-public	THE NORTH FACE Men's Freedom Pant _image_3_preview	\N	2025-10-24 17:56:03.40544+00	2025-10-24 17:56:03.40544+00	2025-10-24 17:56:03.40544+00	{"eTag": "\\"7e05a7605f8883c6bc96727af6997c85\\"", "size": 8378, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:56:04.000Z", "contentLength": 8378, "httpStatusCode": 200}	53fc032a-25ce-4680-9d8c-adbf4420b611	\N	{}	1
81307f55-eac7-463e-b544-0429f4b1b3cc	gshop-public	FORLOH Men's BTM Pro Pant _image_4_thumbnail	\N	2025-10-24 17:47:54.270395+00	2025-10-24 17:47:54.270395+00	2025-10-24 17:47:54.270395+00	{"eTag": "\\"9792638c58132c3d6cda73629fa022d2\\"", "size": 2652, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:47:55.000Z", "contentLength": 2652, "httpStatusCode": 200}	104d7ae6-0ec9-4523-8e58-357ead0d0e7f	\N	{}	1
ad452252-d087-4bb1-a859-1ab71136c192	gshop-public	THE NORTH FACE Men's Freedom Pant _image_3_thumbnail	\N	2025-10-24 17:56:04.645845+00	2025-10-24 17:56:04.645845+00	2025-10-24 17:56:04.645845+00	{"eTag": "\\"19325d2b837e69a7716931cf92cf96c8\\"", "size": 1966, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:56:05.000Z", "contentLength": 1966, "httpStatusCode": 200}	11ea156b-9ad6-49c7-952b-9ca43b2c0aea	\N	{}	1
27f9accd-dbdc-4e44-b0c6-f13af96b1cdc	gshop-public	THE NORTH FACE Men's Freedom Pant _image_4_main	\N	2025-10-24 17:56:05.678918+00	2025-10-24 17:56:05.678918+00	2025-10-24 17:56:05.678918+00	{"eTag": "\\"90860259d32546edd1f5332cfe389335\\"", "size": 30588, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:56:06.000Z", "contentLength": 30588, "httpStatusCode": 200}	e2d96bf8-d59e-47b2-adb2-426a1af2e7eb	\N	{}	1
4b6bbda6-371a-4015-a898-9d9ac8377509	gshop-public	THE NORTH FACE Men's Freedom Pant _image_4_preview	\N	2025-10-24 17:56:06.508212+00	2025-10-24 17:56:06.508212+00	2025-10-24 17:56:06.508212+00	{"eTag": "\\"a1a07f22b857328d0100dab48d56ff17\\"", "size": 8190, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:56:07.000Z", "contentLength": 8190, "httpStatusCode": 200}	475587ba-eac1-4a04-8c84-4aab4622bb38	\N	{}	1
92f5d7fe-cbe8-424a-ae15-90942d0fabd9	gshop-public	THE NORTH FACE Men's Freedom Pant _image_4_thumbnail	\N	2025-10-24 17:56:07.663806+00	2025-10-24 17:56:07.663806+00	2025-10-24 17:56:07.663806+00	{"eTag": "\\"8bba6d30bbe0a7408d0c6253a29c408b\\"", "size": 2118, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:56:08.000Z", "contentLength": 2118, "httpStatusCode": 200}	c742155b-1b05-4af4-9b82-ef330aac67a4	\N	{}	1
f265dc18-2a5c-406e-b5a7-f6e4621d9b43	gshop-public	SITKA Men's Hunting Pants_image_0_main	\N	2025-10-24 17:57:18.807003+00	2025-10-24 17:57:18.807003+00	2025-10-24 17:57:18.807003+00	{"eTag": "\\"3bef07afce9d7f15bde347a96eac4845\\"", "size": 14244, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:57:19.000Z", "contentLength": 14244, "httpStatusCode": 200}	cbbac299-d701-4e23-a50c-1b1015610bc9	\N	{}	1
bea5207e-b573-40d7-a073-072191b98319	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_0_main	\N	2025-10-24 17:59:04.178293+00	2025-10-24 17:59:04.178293+00	2025-10-24 17:59:04.178293+00	{"eTag": "\\"d853ba537e064d58e9e5227a482aacdb\\"", "size": 14760, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:05.000Z", "contentLength": 14760, "httpStatusCode": 200}	4a91d578-2c2f-4655-b383-4f04849d9ade	\N	{}	1
83f1d866-ed08-40fe-9ab2-8dfa0cc3a791	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_0_preview	\N	2025-10-24 17:59:04.759979+00	2025-10-24 17:59:04.759979+00	2025-10-24 17:59:04.759979+00	{"eTag": "\\"5c72c1ab02cbe91822a418dd152287be\\"", "size": 14896, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:05.000Z", "contentLength": 14896, "httpStatusCode": 200}	45d1139f-9d47-4498-ae72-e75188ab2479	\N	{}	1
2a4a3a6b-b7ab-4075-af43-0590a23bc781	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_0_thumbnail	\N	2025-10-24 17:59:05.607613+00	2025-10-24 17:59:05.607613+00	2025-10-24 17:59:05.607613+00	{"eTag": "\\"ef484d0610eb8f6e511164f411a33f9d\\"", "size": 5964, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:06.000Z", "contentLength": 5964, "httpStatusCode": 200}	556fb966-7100-45bf-964f-dae19a17bf64	\N	{}	1
39498be7-78d8-4d7d-a316-9be2c5cd1e58	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_1_main	\N	2025-10-24 17:59:06.435072+00	2025-10-24 17:59:06.435072+00	2025-10-24 17:59:06.435072+00	{"eTag": "\\"bb90b34049a0e0292704ceb23cb63544\\"", "size": 30532, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:07.000Z", "contentLength": 30532, "httpStatusCode": 200}	dc1f5bc1-3b3d-4439-878e-484c1e9491b0	\N	{}	1
b6ef0452-f640-4f8f-a1b6-e89b132be871	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_1_preview	\N	2025-10-24 17:59:08.112234+00	2025-10-24 17:59:08.112234+00	2025-10-24 17:59:08.112234+00	{"eTag": "\\"8f44d08572d9a3e9fb552fea38ff409e\\"", "size": 24280, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:09.000Z", "contentLength": 24280, "httpStatusCode": 200}	a67cf01f-5d96-40d6-87bc-4e7f6b969c22	\N	{}	1
5a947353-0e05-412e-9f6d-7b32e6c72ebb	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_1_thumbnail	\N	2025-10-24 17:59:09.57008+00	2025-10-24 17:59:09.57008+00	2025-10-24 17:59:09.57008+00	{"eTag": "\\"675f6adb288f9b0b1d430c43d6f1ceaa\\"", "size": 3614, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:10.000Z", "contentLength": 3614, "httpStatusCode": 200}	465c9a9d-2d34-4787-be86-5839a6b7417b	\N	{}	1
4fdbbc5d-ba1e-4883-9e4f-ba7fc2c9f8f7	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_2_main	\N	2025-10-24 17:59:11.010048+00	2025-10-24 17:59:11.010048+00	2025-10-24 17:59:11.010048+00	{"eTag": "\\"32870ce20856992c0a366ea957859660\\"", "size": 32910, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:11.000Z", "contentLength": 32910, "httpStatusCode": 200}	0c61c425-bf92-430f-8854-ffee6b4c3b61	\N	{}	1
f98c43e2-ffd3-4c44-9a9b-09b0f19ba9d0	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_2_preview	\N	2025-10-24 17:59:12.529969+00	2025-10-24 17:59:12.529969+00	2025-10-24 17:59:12.529969+00	{"eTag": "\\"8fdd5da133ca252b08f51cb0bcfdaf02\\"", "size": 26362, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:13.000Z", "contentLength": 26362, "httpStatusCode": 200}	a8c33dd7-4c69-4ffd-8229-f8598d315871	\N	{}	1
d76c38ed-d586-4053-a4b7-b7f3f39ad752	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_2_thumbnail	\N	2025-10-24 17:59:13.530157+00	2025-10-24 17:59:13.530157+00	2025-10-24 17:59:13.530157+00	{"eTag": "\\"bced4d0b26ff80f4313afb4e18aaca3a\\"", "size": 4342, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:14.000Z", "contentLength": 4342, "httpStatusCode": 200}	f0537913-ba3b-4b0b-9026-462dd192ff59	\N	{}	1
6b12ffbd-0915-4c66-bac4-19102034ac2e	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_3_main	\N	2025-10-24 17:59:14.321583+00	2025-10-24 17:59:14.321583+00	2025-10-24 17:59:14.321583+00	{"eTag": "\\"eb5e732f83c05834ad00831b2eaa011a\\"", "size": 79540, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:15.000Z", "contentLength": 79540, "httpStatusCode": 200}	5176ac59-b677-4115-b3a3-d21ed564047f	\N	{}	1
5023b34a-db62-4a2b-b025-2921919a25cd	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_3_preview	\N	2025-10-24 17:59:15.553268+00	2025-10-24 17:59:15.553268+00	2025-10-24 17:59:15.553268+00	{"eTag": "\\"5f76809736067c32b945720b6edf46c5\\"", "size": 76390, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:16.000Z", "contentLength": 76390, "httpStatusCode": 200}	2ca34f7c-4768-479c-a8df-3f6d61c24595	\N	{}	1
973c770d-a11b-454a-9b7f-5f78f2497d25	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_3_thumbnail	\N	2025-10-24 17:59:16.393616+00	2025-10-24 17:59:16.393616+00	2025-10-24 17:59:16.393616+00	{"eTag": "\\"fa1a685af5e2b2253f8c95715d183d61\\"", "size": 11496, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:17.000Z", "contentLength": 11496, "httpStatusCode": 200}	4108945a-6000-40d1-9cb2-c41899d7284f	\N	{}	1
2b845439-6dc5-417c-b36d-536d3bf6e0c6	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_4_main	\N	2025-10-24 17:59:17.685082+00	2025-10-24 17:59:17.685082+00	2025-10-24 17:59:17.685082+00	{"eTag": "\\"ea1c20803af7bc89f14ed7784bdd138c\\"", "size": 34178, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:18.000Z", "contentLength": 34178, "httpStatusCode": 200}	3545a8c3-9eef-47cf-8d98-5f3361d1d3ca	\N	{}	1
74982d65-7e8b-4aa4-8dd0-2b4dfe199127	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_4_preview	\N	2025-10-24 17:59:18.881396+00	2025-10-24 17:59:18.881396+00	2025-10-24 17:59:18.881396+00	{"eTag": "\\"3137bd3cfbf36250b97f78f28078f218\\"", "size": 25460, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:19.000Z", "contentLength": 25460, "httpStatusCode": 200}	67843912-4741-4560-9452-a09ca8c96b67	\N	{}	1
139f3494-b744-4bd5-b8a1-249c7c693903	gshop-public	mazfit T-Rex 3 Pro Outdoor Smart Watch_image_4_thumbnail	\N	2025-10-24 17:59:20.188428+00	2025-10-24 17:59:20.188428+00	2025-10-24 17:59:20.188428+00	{"eTag": "\\"f9651a5f05f747385ada95a337db8373\\"", "size": 4688, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T17:59:21.000Z", "contentLength": 4688, "httpStatusCode": 200}	c22156f6-2743-45f9-b697-ec2d461de029	\N	{}	1
91518c7a-9284-4bfa-97e6-32ef9d01149a	gshop-public	COROS PACE 3 GPS Sport Watch_image_0_main	\N	2025-10-24 18:00:25.670256+00	2025-10-24 18:00:25.670256+00	2025-10-24 18:00:25.670256+00	{"eTag": "\\"25ae749d582dffd3943b36f8fbf0f39f\\"", "size": 54484, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:26.000Z", "contentLength": 54484, "httpStatusCode": 200}	aa755a9d-ee41-4af6-abb2-c13cdd9e0b3e	\N	{}	1
a83abc2e-b4c5-4925-ab87-c2669e0f9be1	gshop-public	COROS PACE 3 GPS Sport Watch_image_0_preview	\N	2025-10-24 18:00:27.001758+00	2025-10-24 18:00:27.001758+00	2025-10-24 18:00:27.001758+00	{"eTag": "\\"34c5e19cc34d62d2bb01d666b81faf64\\"", "size": 21960, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:27.000Z", "contentLength": 21960, "httpStatusCode": 200}	d3309493-b901-407b-912c-36c127a15a15	\N	{}	1
6734ed21-6c8d-4d87-a39d-42753d62d4d5	gshop-public	COROS PACE 3 GPS Sport Watch_image_0_thumbnail	\N	2025-10-24 18:00:27.64248+00	2025-10-24 18:00:27.64248+00	2025-10-24 18:00:27.64248+00	{"eTag": "\\"6b6eac6b95fba60356d59aed5cb46a6a\\"", "size": 4726, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:28.000Z", "contentLength": 4726, "httpStatusCode": 200}	0c8ff504-7530-4206-8506-e2bece2322c4	\N	{}	1
14e6f90d-4a3c-45eb-a060-906e26046978	gshop-public	COROS PACE 3 GPS Sport Watch_image_1_main	\N	2025-10-24 18:00:28.715154+00	2025-10-24 18:00:28.715154+00	2025-10-24 18:00:28.715154+00	{"eTag": "\\"07539ba8f8ebe99dd395afa364b116cd\\"", "size": 83752, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:29.000Z", "contentLength": 83752, "httpStatusCode": 200}	b185493a-7f8b-423e-b705-54d1f719ffcf	\N	{}	1
e93928ef-8b92-4471-934b-b3ab5d719a86	gshop-public	COROS PACE 3 GPS Sport Watch_image_1_preview	\N	2025-10-24 18:00:30.696789+00	2025-10-24 18:00:30.696789+00	2025-10-24 18:00:30.696789+00	{"eTag": "\\"2cc3619a36ef3a9c984f918f7eba1b86\\"", "size": 51626, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:31.000Z", "contentLength": 51626, "httpStatusCode": 200}	2bc44982-28b8-4ee3-a6d2-8375699c0781	\N	{}	1
39ef80b5-bb1d-4cd0-89a3-ef433d76367b	gshop-public	COROS PACE 3 GPS Sport Watch_image_1_thumbnail	\N	2025-10-24 18:00:31.692242+00	2025-10-24 18:00:31.692242+00	2025-10-24 18:00:31.692242+00	{"eTag": "\\"87ca6d84fbf27a51f373f2e962ec0aca\\"", "size": 8368, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:32.000Z", "contentLength": 8368, "httpStatusCode": 200}	1aa35d13-6a21-46d5-81c1-d7ae23c31a70	\N	{}	1
158675e9-1982-46a7-a380-f662b7325ffe	gshop-public	COROS PACE 3 GPS Sport Watch_image_2_main	\N	2025-10-24 18:00:32.27251+00	2025-10-24 18:00:32.27251+00	2025-10-24 18:00:32.27251+00	{"eTag": "\\"4750d5a50e250376392ffe250165ac96\\"", "size": 33900, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:33.000Z", "contentLength": 33900, "httpStatusCode": 200}	050077a7-4835-4350-9377-0dc3df15bf61	\N	{}	1
baeabc21-bf0f-4e4d-a095-c9e5242a10e0	gshop-public	COROS PACE 3 GPS Sport Watch_image_2_preview	\N	2025-10-24 18:00:33.528604+00	2025-10-24 18:00:33.528604+00	2025-10-24 18:00:33.528604+00	{"eTag": "\\"3f0eddae5a3e35d5b7fd98f6417cac61\\"", "size": 19188, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:34.000Z", "contentLength": 19188, "httpStatusCode": 200}	76ff31ea-e1df-4890-8585-b92cc8a1a172	\N	{}	1
fe463fa1-0758-4a43-beee-e452b856d04f	gshop-public	COROS PACE 3 GPS Sport Watch_image_2_thumbnail	\N	2025-10-24 18:00:34.108641+00	2025-10-24 18:00:34.108641+00	2025-10-24 18:00:34.108641+00	{"eTag": "\\"6f08c553dbe556027cd6e0d395df374e\\"", "size": 4678, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:35.000Z", "contentLength": 4678, "httpStatusCode": 200}	5f87283a-e7d5-4786-a909-c024266fa270	\N	{}	1
a9d6b9d1-1f97-4f14-8c50-b4a31087050d	gshop-public	COROS PACE 3 GPS Sport Watch_image_3_main	\N	2025-10-24 18:00:35.131611+00	2025-10-24 18:00:35.131611+00	2025-10-24 18:00:35.131611+00	{"eTag": "\\"84c573c464eb4312686fac43ce9a471b\\"", "size": 60052, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:36.000Z", "contentLength": 60052, "httpStatusCode": 200}	739213b7-876e-4ebf-8dae-6035b481fa60	\N	{}	1
29f2da5f-0131-4d83-a377-122222f915e1	gshop-public	COROS PACE 3 GPS Sport Watch_image_3_preview	\N	2025-10-24 18:00:35.805309+00	2025-10-24 18:00:35.805309+00	2025-10-24 18:00:35.805309+00	{"eTag": "\\"157cf65cfe8abc2ba815cf36224c608f\\"", "size": 32466, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:36.000Z", "contentLength": 32466, "httpStatusCode": 200}	6119696a-f0e0-4363-af12-544a049276cc	\N	{}	1
19dc199c-83a3-4d54-a549-c5bf6522b2d7	gshop-public	COROS PACE 3 GPS Sport Watch_image_3_thumbnail	\N	2025-10-24 18:00:37.349594+00	2025-10-24 18:00:37.349594+00	2025-10-24 18:00:37.349594+00	{"eTag": "\\"eca3c79bb313bf47c1bbd1158ba3ae03\\"", "size": 7116, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:38.000Z", "contentLength": 7116, "httpStatusCode": 200}	d673c9de-458b-4777-b819-08de250e8cc3	\N	{}	1
dce383e4-02bd-4a2b-9157-1d68bae7dc6f	gshop-public	COROS PACE 3 GPS Sport Watch_image_4_main	\N	2025-10-24 18:00:38.134511+00	2025-10-24 18:00:38.134511+00	2025-10-24 18:00:38.134511+00	{"eTag": "\\"3935ab9b426f3bffc611516077d97564\\"", "size": 23704, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:39.000Z", "contentLength": 23704, "httpStatusCode": 200}	0eb90f3f-e801-44ea-b81a-f85ed2f68e53	\N	{}	1
1be348c2-2d61-4eba-ae84-91dd8d877d22	gshop-public	COROS PACE 3 GPS Sport Watch_image_4_preview	\N	2025-10-24 18:00:39.177625+00	2025-10-24 18:00:39.177625+00	2025-10-24 18:00:39.177625+00	{"eTag": "\\"a32e5af45eec1ad8c97d76cbb10a17b4\\"", "size": 13354, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:40.000Z", "contentLength": 13354, "httpStatusCode": 200}	de4aab50-bd9f-4d92-b8e4-f64a6aebafb1	\N	{}	1
152bc17c-2d01-4558-8c39-8a6de141e4c2	gshop-public	COROS PACE 3 GPS Sport Watch_image_4_thumbnail	\N	2025-10-24 18:00:39.792131+00	2025-10-24 18:00:39.792131+00	2025-10-24 18:00:39.792131+00	{"eTag": "\\"564a9f2a52671e3c75cf11c722c01301\\"", "size": 3550, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:00:40.000Z", "contentLength": 3550, "httpStatusCode": 200}	19e5894f-5c16-4f3c-8f27-67a00331e1a7	\N	{}	1
e5e1ab2a-52f3-430b-b2cd-d8f337658fe8	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_0_main	\N	2025-10-24 18:01:39.781943+00	2025-10-24 18:01:39.781943+00	2025-10-24 18:01:39.781943+00	{"eTag": "\\"75743c9f35c98c5d0aaeb4249c24d4a3\\"", "size": 64452, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:40.000Z", "contentLength": 64452, "httpStatusCode": 200}	95fe9dff-9551-4b5a-9f5d-c5b30c0bc820	\N	{}	1
a779e536-bc1c-4b85-9435-2398e8c074f2	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_0_preview	\N	2025-10-24 18:01:40.654688+00	2025-10-24 18:01:40.654688+00	2025-10-24 18:01:40.654688+00	{"eTag": "\\"d1f5b9b22a9a62dbc39b06304318c2a0\\"", "size": 32428, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:41.000Z", "contentLength": 32428, "httpStatusCode": 200}	50c36295-87b4-4c03-9335-705ea1c269ae	\N	{}	1
6c21c6a2-fb11-4d75-97cb-d0b761e6916d	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_0_thumbnail	\N	2025-10-24 18:01:41.672776+00	2025-10-24 18:01:41.672776+00	2025-10-24 18:01:41.672776+00	{"eTag": "\\"e813ec1c29965c6837a5206c1296f449\\"", "size": 6044, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:42.000Z", "contentLength": 6044, "httpStatusCode": 200}	275e2e23-e5b9-475c-a1a2-c454df0976a6	\N	{}	1
0a5c0a22-fa0a-4619-9223-eb9777b4c418	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_1_main	\N	2025-10-24 18:01:42.553784+00	2025-10-24 18:01:42.553784+00	2025-10-24 18:01:42.553784+00	{"eTag": "\\"01f28deab43ac30ab35edbef11624a36\\"", "size": 62618, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:43.000Z", "contentLength": 62618, "httpStatusCode": 200}	579d2ead-a2f1-42f8-aa35-970439f89e8b	\N	{}	1
b9550459-bcf7-4c2e-b9fe-fd892a3a8132	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_1_preview	\N	2025-10-24 18:01:44.054881+00	2025-10-24 18:01:44.054881+00	2025-10-24 18:01:44.054881+00	{"eTag": "\\"3ce8869044fc305b63b398661f4383a1\\"", "size": 25120, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:45.000Z", "contentLength": 25120, "httpStatusCode": 200}	4fc13118-e2cc-4bf2-a2de-a2c0ced2cc2f	\N	{}	1
b7e968a7-a1be-4a7f-a251-0c1ba6a848cc	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_1_thumbnail	\N	2025-10-24 18:01:45.277186+00	2025-10-24 18:01:45.277186+00	2025-10-24 18:01:45.277186+00	{"eTag": "\\"96e5a1850bc84ce743827646c233e883\\"", "size": 4990, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:46.000Z", "contentLength": 4990, "httpStatusCode": 200}	58125970-e6d7-4c91-bb77-de99d837cb56	\N	{}	1
92ca70b6-bcda-4ebd-bfd4-efd335e27fa1	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_2_main	\N	2025-10-24 18:01:46.59439+00	2025-10-24 18:01:46.59439+00	2025-10-24 18:01:46.59439+00	{"eTag": "\\"d434929ca1d5bd7704b35d994f571af0\\"", "size": 66932, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:47.000Z", "contentLength": 66932, "httpStatusCode": 200}	f5c3d2c6-701a-4667-a22f-fbbb88aa13ba	\N	{}	1
2039b2bc-89c0-4910-8704-14927c39b44a	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_2_preview	\N	2025-10-24 18:01:47.68195+00	2025-10-24 18:01:47.68195+00	2025-10-24 18:01:47.68195+00	{"eTag": "\\"ca10785396f230a20f04b3f35ceaa11f\\"", "size": 27126, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:48.000Z", "contentLength": 27126, "httpStatusCode": 200}	6923559c-51d2-41a1-8f11-2e83498503a2	\N	{}	1
4c164511-16bf-4a98-a7d4-6748e77566c3	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_2_thumbnail	\N	2025-10-24 18:01:48.66823+00	2025-10-24 18:01:48.66823+00	2025-10-24 18:01:48.66823+00	{"eTag": "\\"fd7b300c06f7b644b4d33ad14c57b901\\"", "size": 4964, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:49.000Z", "contentLength": 4964, "httpStatusCode": 200}	23161f2a-01a0-48d3-b61e-852d3ae9e328	\N	{}	1
da6f4818-e812-4cba-8565-477994503768	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_3_main	\N	2025-10-24 18:01:49.23973+00	2025-10-24 18:01:49.23973+00	2025-10-24 18:01:49.23973+00	{"eTag": "\\"bf205407cdc169dcd41990a88af8336d\\"", "size": 69868, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:50.000Z", "contentLength": 69868, "httpStatusCode": 200}	f7b32c52-c281-4bd0-8fb5-1afb95159582	\N	{}	1
2814b0e1-b09a-46a1-a08f-48af1dcabe0d	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_3_preview	\N	2025-10-24 18:01:50.270437+00	2025-10-24 18:01:50.270437+00	2025-10-24 18:01:50.270437+00	{"eTag": "\\"d87f12835707282e173340955ef2a844\\"", "size": 29740, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:51.000Z", "contentLength": 29740, "httpStatusCode": 200}	3aa6b7f4-7721-4fe7-8fc5-b75a65776199	\N	{}	1
c247d109-fa2a-42fa-8db8-b37b7e7fe837	gshop-public	Garmin Instinct 2X Solar - Tactical Edition_image_3_thumbnail	\N	2025-10-24 18:01:51.030167+00	2025-10-24 18:01:51.030167+00	2025-10-24 18:01:51.030167+00	{"eTag": "\\"8d2015b3b581c94d16c22b406bfe39a5\\"", "size": 5752, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:01:51.000Z", "contentLength": 5752, "httpStatusCode": 200}	6ad35b1c-0309-4ef2-867f-a4f1e3d04138	\N	{}	1
7517e2eb-7495-43fc-ad68-c29867b5da94	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_4_thumbnail	\N	2025-10-24 18:04:19.56344+00	2025-10-24 18:04:19.56344+00	2025-10-24 18:04:19.56344+00	{"eTag": "\\"ef5c935f3237c27bb9c98795a942258c\\"", "size": 6810, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:20.000Z", "contentLength": 6810, "httpStatusCode": 200}	419ee0cd-68d1-4fd6-b41b-74c29201e3c3	\N	{}	1
5e1c8363-3c3a-4095-9ec6-51be4d3dbf08	gshop-public	Casio Men's Pro Trek PRG-270-1_image_0_main	\N	2025-10-24 18:02:58.875831+00	2025-10-24 18:02:58.875831+00	2025-10-24 18:02:58.875831+00	{"eTag": "\\"7c8058a5b79aefc491e44c6bc91ae73d\\"", "size": 49974, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:02:59.000Z", "contentLength": 49974, "httpStatusCode": 200}	8049962e-6f00-479a-badd-be769bd0f485	\N	{}	1
20898f13-cbb2-4dc3-a950-41813768c9a5	gshop-public	Casio Men's Pro Trek PRG-270-1_image_0_preview	\N	2025-10-24 18:02:59.540628+00	2025-10-24 18:02:59.540628+00	2025-10-24 18:02:59.540628+00	{"eTag": "\\"b16fe8cf5467b09838f06346f8ac2414\\"", "size": 33800, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:00.000Z", "contentLength": 33800, "httpStatusCode": 200}	2cc1d0ec-22d1-4bff-95c0-ed88510cd016	\N	{}	1
8040c962-f078-4661-aa58-e582c7335b1c	gshop-public	Casio Men's Pro Trek PRG-270-1_image_0_thumbnail	\N	2025-10-24 18:03:00.839239+00	2025-10-24 18:03:00.839239+00	2025-10-24 18:03:00.839239+00	{"eTag": "\\"f670aabfc3e02bad704a72c81b90d759\\"", "size": 5896, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:01.000Z", "contentLength": 5896, "httpStatusCode": 200}	bc88e821-b5dd-4282-b11b-20572c01a694	\N	{}	1
4fb5e664-bc6c-451c-89e1-896f31a22d72	gshop-public	Casio Men's Pro Trek PRG-270-1_image_1_main	\N	2025-10-24 18:03:01.920691+00	2025-10-24 18:03:01.920691+00	2025-10-24 18:03:01.920691+00	{"eTag": "\\"4b8783060d397fe68d3534251430bcae\\"", "size": 26206, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:02.000Z", "contentLength": 26206, "httpStatusCode": 200}	7cc1b9fa-b30e-436b-aa53-48f79037e968	\N	{}	1
718d59fb-eedb-433d-9f1c-b4ed1ef0840a	gshop-public	Casio Men's Pro Trek PRG-270-1_image_1_preview	\N	2025-10-24 18:03:03.510685+00	2025-10-24 18:03:03.510685+00	2025-10-24 18:03:03.510685+00	{"eTag": "\\"1f2825d1773f63d9795111f3981832ac\\"", "size": 13548, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:04.000Z", "contentLength": 13548, "httpStatusCode": 200}	62821266-e1dd-4047-80c8-2d3d4aab6b2d	\N	{}	1
e1dbb730-e1b3-42c7-b50b-e8379f9c2c80	gshop-public	Casio Men's Pro Trek PRG-270-1_image_1_thumbnail	\N	2025-10-24 18:03:04.393351+00	2025-10-24 18:03:04.393351+00	2025-10-24 18:03:04.393351+00	{"eTag": "\\"1af0c09752a151b75372f184b57c22b2\\"", "size": 2702, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:05.000Z", "contentLength": 2702, "httpStatusCode": 200}	839ad000-3e3a-42d3-9b31-37496624839e	\N	{}	1
209d504f-c3ec-4606-9523-342663281360	gshop-public	Casio Men's Pro Trek PRG-270-1_image_2_main	\N	2025-10-24 18:03:05.430443+00	2025-10-24 18:03:05.430443+00	2025-10-24 18:03:05.430443+00	{"eTag": "\\"68660f8d41fdf6cf5287545ed6fd3214\\"", "size": 19206, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:06.000Z", "contentLength": 19206, "httpStatusCode": 200}	251e1d46-9a6c-4366-bffb-1606f41cfc57	\N	{}	1
2e99cdf5-7766-4996-9e26-ea2a44a9856f	gshop-public	Casio Men's Pro Trek PRG-270-1_image_2_preview	\N	2025-10-24 18:03:06.211883+00	2025-10-24 18:03:06.211883+00	2025-10-24 18:03:06.211883+00	{"eTag": "\\"d9a54844da201c15cd291049bcf9de69\\"", "size": 10766, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:07.000Z", "contentLength": 10766, "httpStatusCode": 200}	411e9d39-f37b-4512-ba4a-1c015dce70b0	\N	{}	1
71ea6e52-649d-44c9-858d-48f25a1b5634	gshop-public	Casio Men's Pro Trek PRG-270-1_image_2_thumbnail	\N	2025-10-24 18:03:07.290633+00	2025-10-24 18:03:07.290633+00	2025-10-24 18:03:07.290633+00	{"eTag": "\\"b001b5a2001dbda1b7ad140220953cd7\\"", "size": 2440, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:08.000Z", "contentLength": 2440, "httpStatusCode": 200}	796b4a43-960d-4670-959c-197933307237	\N	{}	1
1f8e4408-b538-4b06-b990-ef95b9ce9bcf	gshop-public	Casio Men's Pro Trek PRG-270-1_image_3_main	\N	2025-10-24 18:03:08.004816+00	2025-10-24 18:03:08.004816+00	2025-10-24 18:03:08.004816+00	{"eTag": "\\"854f4516d1c21836df5443db3c4c9d9d\\"", "size": 32674, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:08.000Z", "contentLength": 32674, "httpStatusCode": 200}	a9457550-12e7-4760-8f0d-38f388eb2c66	\N	{}	1
07211daa-fadd-4b52-87df-13639cc44204	gshop-public	Casio Men's Pro Trek PRG-270-1_image_3_preview	\N	2025-10-24 18:03:09.142499+00	2025-10-24 18:03:09.142499+00	2025-10-24 18:03:09.142499+00	{"eTag": "\\"26a4506370db629bcfd64d78bb9b9f3b\\"", "size": 16552, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:10.000Z", "contentLength": 16552, "httpStatusCode": 200}	8a287978-c747-45dc-91e1-59b41d9ca203	\N	{}	1
57bdba2b-cca3-40b9-9aef-ea51c940fc6e	gshop-public	Casio Men's Pro Trek PRG-270-1_image_3_thumbnail	\N	2025-10-24 18:03:09.753924+00	2025-10-24 18:03:09.753924+00	2025-10-24 18:03:09.753924+00	{"eTag": "\\"c488c9523befb9fe06b51d44807a351c\\"", "size": 3292, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:03:10.000Z", "contentLength": 3292, "httpStatusCode": 200}	e8c7dacf-4284-4476-81bf-2c13bfa70d25	\N	{}	1
3d9f5c01-4ff1-4cc4-8bb3-8c3dab313308	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_0_main	\N	2025-10-24 18:04:07.571344+00	2025-10-24 18:04:07.571344+00	2025-10-24 18:04:07.571344+00	{"eTag": "\\"0f40f7794cb327dc45d01f0b30633fc9\\"", "size": 54798, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:08.000Z", "contentLength": 54798, "httpStatusCode": 200}	dfb8d0e8-e7ef-4567-b999-f9866eef7825	\N	{}	1
4d0c3401-f871-47ea-9e5e-5657d4dd6f88	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_0_preview	\N	2025-10-24 18:04:08.280637+00	2025-10-24 18:04:08.280637+00	2025-10-24 18:04:08.280637+00	{"eTag": "\\"2486c246971be22cf05f71b92c2a8f37\\"", "size": 32768, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:09.000Z", "contentLength": 32768, "httpStatusCode": 200}	0a734ffa-b049-4eec-add8-c707024505f2	\N	{}	1
dbc7e26a-5dc8-45c1-b5a7-76439d764c41	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_0_thumbnail	\N	2025-10-24 18:04:09.233551+00	2025-10-24 18:04:09.233551+00	2025-10-24 18:04:09.233551+00	{"eTag": "\\"6f2bae2fabd47bc6e0aa5bda654cd616\\"", "size": 6650, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:10.000Z", "contentLength": 6650, "httpStatusCode": 200}	ef5f3805-682a-4e7f-833d-7b42c37cc1cd	\N	{}	1
f1fbbaa7-f92b-47cf-b46b-1708d73dfc55	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_1_main	\N	2025-10-24 18:04:09.979087+00	2025-10-24 18:04:09.979087+00	2025-10-24 18:04:09.979087+00	{"eTag": "\\"85fb080e1bc9b3856f3f436c1cb759ae\\"", "size": 63550, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:10.000Z", "contentLength": 63550, "httpStatusCode": 200}	5c5b5e29-f6fd-4872-9401-f7486a5b19f6	\N	{}	1
8e0b6799-dfd3-46d7-94e0-2406435dbb0b	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_1_preview	\N	2025-10-24 18:04:11.056388+00	2025-10-24 18:04:11.056388+00	2025-10-24 18:04:11.056388+00	{"eTag": "\\"af19b09e4840e7e8040cda7eaf0a7aeb\\"", "size": 53668, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:11.000Z", "contentLength": 53668, "httpStatusCode": 200}	6c0cb0c2-9e4f-41e2-a8e9-d5784a329ae9	\N	{}	1
925f8748-8b4a-4cf4-91f2-6df8bd483cc2	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_1_thumbnail	\N	2025-10-24 18:04:11.59105+00	2025-10-24 18:04:11.59105+00	2025-10-24 18:04:11.59105+00	{"eTag": "\\"b23b1ee46b17d1ba61280206cdc6ce07\\"", "size": 8790, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:12.000Z", "contentLength": 8790, "httpStatusCode": 200}	d555e6b1-8f30-46ff-9063-11ff5b7bf895	\N	{}	1
d08bb2f7-23d5-4f2d-81a8-a299b38b621e	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_2_main	\N	2025-10-24 18:04:12.686488+00	2025-10-24 18:04:12.686488+00	2025-10-24 18:04:12.686488+00	{"eTag": "\\"a5416f5ca608c4f492bcf26e2f110e70\\"", "size": 58150, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:13.000Z", "contentLength": 58150, "httpStatusCode": 200}	e4c9a7ff-e9ce-44c9-99f7-9d05d400d038	\N	{}	1
b8732b13-cd6f-43f3-8884-37b07de84637	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_2_preview	\N	2025-10-24 18:04:13.431231+00	2025-10-24 18:04:13.431231+00	2025-10-24 18:04:13.431231+00	{"eTag": "\\"0574b3085456536e059d3aa1bf7176f0\\"", "size": 48026, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:14.000Z", "contentLength": 48026, "httpStatusCode": 200}	9ab2f06a-7b65-4bc8-8a9f-f6b693310bd0	\N	{}	1
dd806568-2a4f-4734-b7d9-052bd50e82dd	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_2_thumbnail	\N	2025-10-24 18:04:14.398303+00	2025-10-24 18:04:14.398303+00	2025-10-24 18:04:14.398303+00	{"eTag": "\\"0b3ca1c79f29e5259521f01e59b8f22e\\"", "size": 6554, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:15.000Z", "contentLength": 6554, "httpStatusCode": 200}	8856a92a-875a-4d35-8566-b339adab7446	\N	{}	1
b5d48caf-7fe7-40ab-a315-d8ac51e939c4	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_3_main	\N	2025-10-24 18:04:15.080687+00	2025-10-24 18:04:15.080687+00	2025-10-24 18:04:15.080687+00	{"eTag": "\\"f5f813b5ef7e9b162cc069831ce48e99\\"", "size": 56032, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:16.000Z", "contentLength": 56032, "httpStatusCode": 200}	804ae984-747c-4541-8145-900de808f181	\N	{}	1
159f530b-3ca3-4798-bd04-59ccf11b8a49	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_3_preview	\N	2025-10-24 18:04:16.159455+00	2025-10-24 18:04:16.159455+00	2025-10-24 18:04:16.159455+00	{"eTag": "\\"1a6c6811ded071c0dc1f0601fcf6d89e\\"", "size": 48724, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:17.000Z", "contentLength": 48724, "httpStatusCode": 200}	23289ff9-57e8-4aa4-8a06-9ce03d2998ac	\N	{}	1
9f1a75b4-ecc6-47b7-bd17-27c32c1504fa	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_3_thumbnail	\N	2025-10-24 18:04:16.869197+00	2025-10-24 18:04:16.869197+00	2025-10-24 18:04:16.869197+00	{"eTag": "\\"c5a839eb8cb8241388b877146bf5a9e9\\"", "size": 7560, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:17.000Z", "contentLength": 7560, "httpStatusCode": 200}	c3fa9d51-59ef-4e26-a882-82774405e10d	\N	{}	1
8f6399be-e7ad-417d-a79a-e5e68afb8c09	gshop-public	Watches_preview	\N	2025-10-24 18:04:46.832666+00	2025-10-24 20:16:31.456682+00	2025-10-24 18:04:46.832666+00	{"eTag": "\\"5c72c1ab02cbe91822a418dd152287be\\"", "size": 14896, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:16:32.000Z", "contentLength": 14896, "httpStatusCode": 200}	47ccee2a-c567-4cd3-a88f-516c04e687ef	\N	{}	1
64fb7511-9f71-4fab-948a-76b246f4feca	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_4_main	\N	2025-10-24 18:04:17.891022+00	2025-10-24 18:04:17.891022+00	2025-10-24 18:04:17.891022+00	{"eTag": "\\"3bb6a9660df80896ae1b27a662cd47b9\\"", "size": 60058, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:18.000Z", "contentLength": 60058, "httpStatusCode": 200}	7f4112ec-e01e-423c-b01c-72a30bde3059	\N	{}	1
9164d443-277c-4d53-8cee-34b1fca15882	gshop-public	Amazfit T-Rex 3 Outdoor Smart Watch _image_4_preview	\N	2025-10-24 18:04:18.672907+00	2025-10-24 18:04:18.672907+00	2025-10-24 18:04:18.672907+00	{"eTag": "\\"a7ec8f81324b6ff4e7049b7bb3d5bfd5\\"", "size": 51216, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:04:19.000Z", "contentLength": 51216, "httpStatusCode": 200}	cbc7453e-599f-4ac8-a89f-4ed26d4068fa	\N	{}	1
fee13573-5bc1-4e6d-ae86-4e3e8401f665	gshop-public	site-logo.png	\N	2025-10-23 00:01:23.008521+00	2025-10-24 23:58:28.98758+00	2025-10-23 00:01:23.008521+00	{"eTag": "\\"578b297ad3f0700e40939b1c4f8fed3d\\"", "size": 3980, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T23:58:29.000Z", "contentLength": 3980, "httpStatusCode": 200}	7f9071e0-6a0e-4946-8d8d-7c925c428de7	\N	{}	1
96176f54-f7d1-4ff3-b177-b403dd98b858	gshop-public	site-banner.png	\N	2025-10-23 00:05:04.74361+00	2025-10-24 23:58:30.693715+00	2025-10-23 00:05:04.74361+00	{"eTag": "\\"42dcbebfacf00a7cfbb19f0f10087f13\\"", "size": 534633, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T23:58:31.000Z", "contentLength": 534633, "httpStatusCode": 200}	73e2c20b-7bab-4613-9d66-28175e0331da	\N	{}	1
64f24888-34d3-4975-afa1-224977595474	gshop-public	Watches_banner	\N	2025-10-24 20:08:08.990761+00	2025-10-24 20:08:08.990761+00	2025-10-24 20:08:08.990761+00	{"eTag": "\\"d5696b285c9791041e56aa74d88a8716\\"", "size": 44556, "mimetype": "image/*", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:08:09.000Z", "contentLength": 44556, "httpStatusCode": 200}	f4770167-93fa-47e5-911e-21cd33082b7b	\N	{}	1
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
\.


--
-- Data for Name: seed_files; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.seed_files (path, hash) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: CartItem CartItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: CollectionImageSet CollectionImageSet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CollectionImageSet"
    ADD CONSTRAINT "CollectionImageSet_pkey" PRIMARY KEY (id);


--
-- Name: Collection Collection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Collection"
    ADD CONSTRAINT "Collection_pkey" PRIMARY KEY (id);


--
-- Name: Coupon Coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Coupon"
    ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY (id);


--
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: OrderStatusHistory OrderStatusHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderStatusHistory"
    ADD CONSTRAINT "OrderStatusHistory_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: ParcelDimensions ParcelDimensions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParcelDimensions"
    ADD CONSTRAINT "ParcelDimensions_pkey" PRIMARY KEY (id);


--
-- Name: ProductDimensions ProductDimensions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductDimensions"
    ADD CONSTRAINT "ProductDimensions_pkey" PRIMARY KEY (id);


--
-- Name: ProductImageSet ProductImageSet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductImageSet"
    ADD CONSTRAINT "ProductImageSet_pkey" PRIMARY KEY (id);


--
-- Name: ProductOption ProductOption_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductOption"
    ADD CONSTRAINT "ProductOption_pkey" PRIMARY KEY (id);


--
-- Name: ProductOptionsPreset ProductOptionsPreset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductOptionsPreset"
    ADD CONSTRAINT "ProductOptionsPreset_pkey" PRIMARY KEY (id);


--
-- Name: ProductReview ProductReview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductReview"
    ADD CONSTRAINT "ProductReview_pkey" PRIMARY KEY (id);


--
-- Name: ProductTagPreset ProductTagPreset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTagPreset"
    ADD CONSTRAINT "ProductTagPreset_pkey" PRIMARY KEY (id);


--
-- Name: ProductTag ProductTag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTag"
    ADD CONSTRAINT "ProductTag_pkey" PRIMARY KEY (id);


--
-- Name: ProductVariant ProductVariant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: ShippingInfo ShippingInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ShippingInfo"
    ADD CONSTRAINT "ShippingInfo_pkey" PRIMARY KEY (id);


--
-- Name: ShippingStatusHistory ShippingStatusHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ShippingStatusHistory"
    ADD CONSTRAINT "ShippingStatusHistory_pkey" PRIMARY KEY (id);


--
-- Name: StockMovement StockMovement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StockMovement"
    ADD CONSTRAINT "StockMovement_pkey" PRIMARY KEY (id);


--
-- Name: SystemSettings SystemSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SystemSettings"
    ADD CONSTRAINT "SystemSettings_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: UserPaymentMethod UserPaymentMethod_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPaymentMethod"
    ADD CONSTRAINT "UserPaymentMethod_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _ProductCategories _ProductCategories_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductCategories"
    ADD CONSTRAINT "_ProductCategories_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _ProductCollections _ProductCollections_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductCollections"
    ADD CONSTRAINT "_ProductCollections_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: seed_files seed_files_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.seed_files
    ADD CONSTRAINT seed_files_pkey PRIMARY KEY (path);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: Address_TransactionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Address_TransactionId_key" ON public."Address" USING btree ("TransactionId");


--
-- Name: CartItem_productId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CartItem_productId_key" ON public."CartItem" USING btree ("productId");


--
-- Name: Cart_sessionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cart_sessionId_key" ON public."Cart" USING btree ("sessionId");


--
-- Name: Cart_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cart_userId_key" ON public."Cart" USING btree ("userId");


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: CollectionImageSet_categoryId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CollectionImageSet_categoryId_key" ON public."CollectionImageSet" USING btree ("categoryId");


--
-- Name: CollectionImageSet_collectionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CollectionImageSet_collectionId_key" ON public."CollectionImageSet" USING btree ("collectionId");


--
-- Name: Collection_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Collection_slug_key" ON public."Collection" USING btree (slug);


--
-- Name: Coupon_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Coupon_code_key" ON public."Coupon" USING btree (code);


--
-- Name: ParcelDimensions_ShippingInfoId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ParcelDimensions_ShippingInfoId_key" ON public."ParcelDimensions" USING btree ("ShippingInfoId");


--
-- Name: ProductDimensions_productId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProductDimensions_productId_key" ON public."ProductDimensions" USING btree ("productId");


--
-- Name: Product_sku_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_sku_key" ON public."Product" USING btree (sku);


--
-- Name: Session_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_token_key" ON public."Session" USING btree (token);


--
-- Name: ShippingInfo_orderId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ShippingInfo_orderId_key" ON public."ShippingInfo" USING btree ("orderId");


--
-- Name: ShippingStatusHistory_shippingInfoId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ShippingStatusHistory_shippingInfoId_key" ON public."ShippingStatusHistory" USING btree ("shippingInfoId");


--
-- Name: SystemSettings_scope_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SystemSettings_scope_key" ON public."SystemSettings" USING btree (scope);


--
-- Name: Transaction_orderId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Transaction_orderId_key" ON public."Transaction" USING btree ("orderId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: _ProductCategories_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ProductCategories_B_index" ON public."_ProductCategories" USING btree ("B");


--
-- Name: _ProductCollections_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ProductCollections_B_index" ON public."_ProductCollections" USING btree ("B");


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: Address Address_TransactionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_TransactionId_fkey" FOREIGN KEY ("TransactionId") REFERENCES public."Transaction"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CartItem CartItem_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CartItem CartItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CartItem CartItem_variantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES public."ProductVariant"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Cart Cart_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public."Session"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Cart Cart_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CollectionImageSet CollectionImageSet_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CollectionImageSet"
    ADD CONSTRAINT "CollectionImageSet_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CollectionImageSet CollectionImageSet_collectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CollectionImageSet"
    ADD CONSTRAINT "CollectionImageSet_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES public."Collection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Invoice Invoice_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderStatusHistory OrderStatusHistory_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderStatusHistory"
    ADD CONSTRAINT "OrderStatusHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ParcelDimensions ParcelDimensions_ShippingInfoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParcelDimensions"
    ADD CONSTRAINT "ParcelDimensions_ShippingInfoId_fkey" FOREIGN KEY ("ShippingInfoId") REFERENCES public."ShippingInfo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductDimensions ProductDimensions_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductDimensions"
    ADD CONSTRAINT "ProductDimensions_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductImageSet ProductImageSet_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductImageSet"
    ADD CONSTRAINT "ProductImageSet_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductOption ProductOption_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductOption"
    ADD CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductReview ProductReview_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductReview"
    ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductReview ProductReview_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductReview"
    ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductTag ProductTag_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTag"
    ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductVariant ProductVariant_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ShippingInfo ShippingInfo_addressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ShippingInfo"
    ADD CONSTRAINT "ShippingInfo_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES public."Address"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ShippingInfo ShippingInfo_fromAddressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ShippingInfo"
    ADD CONSTRAINT "ShippingInfo_fromAddressId_fkey" FOREIGN KEY ("fromAddressId") REFERENCES public."Address"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ShippingInfo ShippingInfo_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ShippingInfo"
    ADD CONSTRAINT "ShippingInfo_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ShippingStatusHistory ShippingStatusHistory_shippingInfoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ShippingStatusHistory"
    ADD CONSTRAINT "ShippingStatusHistory_shippingInfoId_fkey" FOREIGN KEY ("shippingInfoId") REFERENCES public."ShippingInfo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StockMovement StockMovement_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StockMovement"
    ADD CONSTRAINT "StockMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Transaction Transaction_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserPaymentMethod UserPaymentMethod_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPaymentMethod"
    ADD CONSTRAINT "UserPaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProductCategories _ProductCategories_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductCategories"
    ADD CONSTRAINT "_ProductCategories_A_fkey" FOREIGN KEY ("A") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProductCategories _ProductCategories_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductCategories"
    ADD CONSTRAINT "_ProductCategories_B_fkey" FOREIGN KEY ("B") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProductCollections _ProductCollections_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductCollections"
    ADD CONSTRAINT "_ProductCollections_A_fkey" FOREIGN KEY ("A") REFERENCES public."Collection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProductCollections _ProductCollections_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductCollections"
    ADD CONSTRAINT "_ProductCollections_B_fkey" FOREIGN KEY ("B") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.prefixes TO service_role;
GRANT ALL ON TABLE storage.prefixes TO authenticated;
GRANT ALL ON TABLE storage.prefixes TO anon;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

\unrestrict sK58XY1TIBvPiJdcsfadrnI2JnmWe0CqHk1y9ssBavEks6l7cYikYd2LefMPFy5


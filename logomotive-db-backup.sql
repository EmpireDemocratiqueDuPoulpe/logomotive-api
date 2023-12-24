--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2023-12-24 13:22:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 220 (class 1255 OID 32800)
-- Name: update_scripts_update_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_scripts_update_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_scripts_update_at() OWNER TO postgres;

--
-- TOC entry 221 (class 1255 OID 32801)
-- Name: update_scripts_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_scripts_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_scripts_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 32788)
-- Name: script_sharing_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.script_sharing_links (
    link_id uuid DEFAULT gen_random_uuid() NOT NULL,
    script_id integer NOT NULL
);


ALTER TABLE public.script_sharing_links OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24577)
-- Name: scripts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scripts (
    script_id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(50) NOT NULL,
    content text NOT NULL,
    tags text[],
    is_public boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.scripts OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24576)
-- Name: scripts_script_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.scripts ALTER COLUMN script_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.scripts_script_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(32) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16407)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4860 (class 0 OID 32788)
-- Dependencies: 219
-- Data for Name: script_sharing_links; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4859 (class 0 OID 24577)
-- Dependencies: 218
-- Data for Name: scripts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.scripts (script_id, user_id, name, content, tags, is_public, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (12, 16, 'test', 'AV 50', '{""}', false, '2023-12-04 22:08:44.696263+01', '2023-12-04 22:08:44.696263+01');
INSERT INTO public.scripts (script_id, user_id, name, content, tags, is_public, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (9, 16, 'Carré et étoile', 'POUR STAR :taille
  REPETER 8 [AV :taille TD 135]
FIN


FCB 0 0 0
FCC 0 255 0

AV 100
TD 90
AV 100
TD 90
AV 100
TD 90
AV 100
TD 90

LC
AV 150
BC
STAR 150
CT', '{géométrie,magnifique}', true, '2023-11-18 20:57:22.68854+01', '2023-12-24 13:15:44.467669+01');
INSERT INTO public.scripts (script_id, user_id, name, content, tags, is_public, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (11, 16, 'Premier script', 'AV 90
RE 90
AV 120
RE 10
AV 1', '{"pas ouf","j''ai essayé","c''est rigolo"}', true, '2023-11-18 20:57:22.68854+01', '2023-12-24 13:16:48.681731+01');


--
-- TOC entry 4856 (class 0 OID 16399)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, username, email, password) OVERRIDING SYSTEM VALUE VALUES (16, 'Johmnny McNumgget', 'johmnny.mcnumgget@cheems.mail', '$2b$10$tVVunmI5nq3JnT.JAgHddeTExuHFPDBwXZZwC41L28w6IEdrcII/i');
INSERT INTO public.users (user_id, username, email, password) OVERRIDING SYSTEM VALUE VALUES (15, 'mlamine', 'mo.lamine@sup.info', '"$2b$10$tVVunmI5nq3JnT.JAgHddeTExuHFPDBwXZZwC41L28w6IEdrcII/i"');


--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 217
-- Name: scripts_script_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scripts_script_id_seq', 12, true);


--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 17, true);


--
-- TOC entry 4709 (class 2606 OID 32792)
-- Name: script_sharing_links script_sharing_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.script_sharing_links
    ADD CONSTRAINT script_sharing_links_pkey PRIMARY KEY (link_id);


--
-- TOC entry 4707 (class 2606 OID 24583)
-- Name: scripts scripts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scripts
    ADD CONSTRAINT scripts_pkey PRIMARY KEY (script_id);


--
-- TOC entry 4705 (class 2606 OID 16405)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4712 (class 2620 OID 32802)
-- Name: scripts update_scripts_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_scripts_updated_at BEFORE UPDATE ON public.scripts FOR EACH ROW EXECUTE FUNCTION public.update_scripts_updated_at();


--
-- TOC entry 4711 (class 2606 OID 32793)
-- Name: script_sharing_links SCRIPTS_SHARING_LINKS__SCRIPTS; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.script_sharing_links
    ADD CONSTRAINT "SCRIPTS_SHARING_LINKS__SCRIPTS" FOREIGN KEY (script_id) REFERENCES public.scripts(script_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4710 (class 2606 OID 24584)
-- Name: scripts SCRIPT_USERS; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scripts
    ADD CONSTRAINT "SCRIPT_USERS" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4866 (class 0 OID 0)
-- Dependencies: 219
-- Name: TABLE script_sharing_links; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.script_sharing_links TO logo_user;


--
-- TOC entry 4867 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE scripts; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.scripts TO logo_user;


--
-- TOC entry 4868 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.users TO logo_user;


--
-- TOC entry 2049 (class 826 OID 24589)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO logo_user;


-- Completed on 2023-12-24 13:22:31

--
-- PostgreSQL database dump complete
--


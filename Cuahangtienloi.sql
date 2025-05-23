PGDMP                         }            Cuahangtienloi    14.17    14.17 -    .           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            /           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            0           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            1           1262    16607    Cuahangtienloi    DATABASE     _   CREATE DATABASE "Cuahangtienloi" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en-US';
     DROP DATABASE "Cuahangtienloi";
                postgres    false            �            1259    24700    chitiethoadon    TABLE     �   CREATE TABLE public.chitiethoadon (
    id integer NOT NULL,
    hoadon_id integer NOT NULL,
    sanpham_id integer NOT NULL,
    so_luong integer NOT NULL,
    gia double precision NOT NULL,
    thanh_tien double precision
);
 !   DROP TABLE public.chitiethoadon;
       public         heap    postgres    false            �            1259    24699    chitiethoadon_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chitiethoadon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.chitiethoadon_id_seq;
       public          postgres    false    218            2           0    0    chitiethoadon_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.chitiethoadon_id_seq OWNED BY public.chitiethoadon.id;
          public          postgres    false    217            �            1259    24680    hoadon    TABLE     \  CREATE TABLE public.hoadon (
    id integer NOT NULL,
    khachhang_id integer,
    nhanvien_id integer,
    ngay_tao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    tong_tien double precision DEFAULT 0,
    trang_thai character varying(50) DEFAULT 'dang_xu_ly'::character varying,
    khach_hang_id integer,
    nhan_vien_id integer
);
    DROP TABLE public.hoadon;
       public         heap    postgres    false            �            1259    24679    hoadon_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hoadon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.hoadon_id_seq;
       public          postgres    false    216            3           0    0    hoadon_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.hoadon_id_seq OWNED BY public.hoadon.id;
          public          postgres    false    215            �            1259    16679 	   khachhang    TABLE     �   CREATE TABLE public.khachhang (
    id integer NOT NULL,
    ho_ten character varying(255),
    so_dien_thoai character varying(255),
    email character varying(255),
    dia_chi character varying(255),
    user_id integer
);
    DROP TABLE public.khachhang;
       public         heap    postgres    false            �            1259    16631    nhanvien    TABLE     .  CREATE TABLE public.nhanvien (
    id integer NOT NULL,
    ho_ten character varying(255),
    ngay_sinh character varying(255),
    gioi_tinh character varying(255),
    so_dien_thoai character varying(255),
    email character varying(255),
    dia_chi character varying(255),
    user_id integer
);
    DROP TABLE public.nhanvien;
       public         heap    postgres    false            �            1259    16616 
   nhasanxuat    TABLE     �   CREATE TABLE public.nhasanxuat (
    id integer NOT NULL,
    ten character varying(255),
    dia_chi character varying(255),
    so_dien_thoai character varying(255)
);
    DROP TABLE public.nhasanxuat;
       public         heap    postgres    false            �            1259    16621    sanpham    TABLE       CREATE TABLE public.sanpham (
    id integer NOT NULL,
    ten_san_pham character varying(255),
    so_luong integer,
    gia double precision,
    don_vi character varying(255),
    loai character varying(255),
    hinh_anh character varying(255),
    nhasanxuat_id integer
);
    DROP TABLE public.sanpham;
       public         heap    postgres    false            �            1259    16608    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    trang_thai boolean DEFAULT true
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16730 	   users_seq    SEQUENCE     s   CREATE SEQUENCE public.users_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     DROP SEQUENCE public.users_seq;
       public          postgres    false            {           2604    24703    chitiethoadon id    DEFAULT     t   ALTER TABLE ONLY public.chitiethoadon ALTER COLUMN id SET DEFAULT nextval('public.chitiethoadon_id_seq'::regclass);
 ?   ALTER TABLE public.chitiethoadon ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            w           2604    24683 	   hoadon id    DEFAULT     f   ALTER TABLE ONLY public.hoadon ALTER COLUMN id SET DEFAULT nextval('public.hoadon_id_seq'::regclass);
 8   ALTER TABLE public.hoadon ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            +          0    24700    chitiethoadon 
   TABLE DATA           ]   COPY public.chitiethoadon (id, hoadon_id, sanpham_id, so_luong, gia, thanh_tien) FROM stdin;
    public          postgres    false    218   �5       )          0    24680    hoadon 
   TABLE DATA           }   COPY public.hoadon (id, khachhang_id, nhanvien_id, ngay_tao, tong_tien, trang_thai, khach_hang_id, nhan_vien_id) FROM stdin;
    public          postgres    false    216   6       &          0    16679 	   khachhang 
   TABLE DATA           W   COPY public.khachhang (id, ho_ten, so_dien_thoai, email, dia_chi, user_id) FROM stdin;
    public          postgres    false    213   u6       %          0    16631    nhanvien 
   TABLE DATA           l   COPY public.nhanvien (id, ho_ten, ngay_sinh, gioi_tinh, so_dien_thoai, email, dia_chi, user_id) FROM stdin;
    public          postgres    false    212   p7       #          0    16616 
   nhasanxuat 
   TABLE DATA           E   COPY public.nhasanxuat (id, ten, dia_chi, so_dien_thoai) FROM stdin;
    public          postgres    false    210   �8       $          0    16621    sanpham 
   TABLE DATA           i   COPY public.sanpham (id, ten_san_pham, so_luong, gia, don_vi, loai, hinh_anh, nhasanxuat_id) FROM stdin;
    public          postgres    false    211   �9       "          0    16608    users 
   TABLE DATA           I   COPY public.users (id, username, password, role, trang_thai) FROM stdin;
    public          postgres    false    209   �:       4           0    0    chitiethoadon_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.chitiethoadon_id_seq', 3, true);
          public          postgres    false    217            5           0    0    hoadon_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.hoadon_id_seq', 3, true);
          public          postgres    false    215            6           0    0 	   users_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.users_seq', 1, false);
          public          postgres    false    214            �           2606    24705     chitiethoadon chitiethoadon_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.chitiethoadon
    ADD CONSTRAINT chitiethoadon_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.chitiethoadon DROP CONSTRAINT chitiethoadon_pkey;
       public            postgres    false    218            �           2606    24688    hoadon hoadon_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.hoadon
    ADD CONSTRAINT hoadon_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.hoadon DROP CONSTRAINT hoadon_pkey;
       public            postgres    false    216            �           2606    16683    khachhang khachhang_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.khachhang
    ADD CONSTRAINT khachhang_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.khachhang DROP CONSTRAINT khachhang_pkey;
       public            postgres    false    213            �           2606    16685    khachhang khachhang_user_id_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.khachhang
    ADD CONSTRAINT khachhang_user_id_key UNIQUE (user_id);
 I   ALTER TABLE ONLY public.khachhang DROP CONSTRAINT khachhang_user_id_key;
       public            postgres    false    213            �           2606    16635    nhanvien nhanvien_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.nhanvien
    ADD CONSTRAINT nhanvien_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.nhanvien DROP CONSTRAINT nhanvien_pkey;
       public            postgres    false    212            �           2606    16637    nhanvien nhanvien_user_id_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.nhanvien
    ADD CONSTRAINT nhanvien_user_id_key UNIQUE (user_id);
 G   ALTER TABLE ONLY public.nhanvien DROP CONSTRAINT nhanvien_user_id_key;
       public            postgres    false    212            �           2606    16620    nhasanxuat nhasanxuat_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.nhasanxuat
    ADD CONSTRAINT nhasanxuat_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.nhasanxuat DROP CONSTRAINT nhasanxuat_pkey;
       public            postgres    false    210            �           2606    16625    sanpham sanpham_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.sanpham
    ADD CONSTRAINT sanpham_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.sanpham DROP CONSTRAINT sanpham_pkey;
       public            postgres    false    211            }           2606    16613    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    209                       2606    16729    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    209            �           2606    24706    chitiethoadon fk_hoadon    FK CONSTRAINT     �   ALTER TABLE ONLY public.chitiethoadon
    ADD CONSTRAINT fk_hoadon FOREIGN KEY (hoadon_id) REFERENCES public.hoadon(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.chitiethoadon DROP CONSTRAINT fk_hoadon;
       public          postgres    false    3213    218    216            �           2606    24689    hoadon fk_khachhang    FK CONSTRAINT     {   ALTER TABLE ONLY public.hoadon
    ADD CONSTRAINT fk_khachhang FOREIGN KEY (khachhang_id) REFERENCES public.khachhang(id);
 =   ALTER TABLE ONLY public.hoadon DROP CONSTRAINT fk_khachhang;
       public          postgres    false    216    3209    213            �           2606    24694    hoadon fk_nhanvien    FK CONSTRAINT     x   ALTER TABLE ONLY public.hoadon
    ADD CONSTRAINT fk_nhanvien FOREIGN KEY (nhanvien_id) REFERENCES public.nhanvien(id);
 <   ALTER TABLE ONLY public.hoadon DROP CONSTRAINT fk_nhanvien;
       public          postgres    false    216    3205    212            �           2606    24711    chitiethoadon fk_sanpham    FK CONSTRAINT     |   ALTER TABLE ONLY public.chitiethoadon
    ADD CONSTRAINT fk_sanpham FOREIGN KEY (sanpham_id) REFERENCES public.sanpham(id);
 B   ALTER TABLE ONLY public.chitiethoadon DROP CONSTRAINT fk_sanpham;
       public          postgres    false    3203    218    211            �           2606    16686     khachhang khachhang_user_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.khachhang
    ADD CONSTRAINT khachhang_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.khachhang DROP CONSTRAINT khachhang_user_id_fkey;
       public          postgres    false    3197    213    209            �           2606    16638    nhanvien nhanvien_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.nhanvien
    ADD CONSTRAINT nhanvien_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 H   ALTER TABLE ONLY public.nhanvien DROP CONSTRAINT nhanvien_user_id_fkey;
       public          postgres    false    212    3197    209            �           2606    16626 "   sanpham sanpham_nhasanxuat_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sanpham
    ADD CONSTRAINT sanpham_nhasanxuat_id_fkey FOREIGN KEY (nhasanxuat_id) REFERENCES public.nhasanxuat(id);
 L   ALTER TABLE ONLY public.sanpham DROP CONSTRAINT sanpham_nhasanxuat_id_fkey;
       public          postgres    false    211    210    3201            +   &   x�3�4�4�4�44 NS�e�	��`������� ��      )   X   x�3��!##S] �T04�21�25�360�42�45 Δļ������JNCN#.#,�̭L����L-�,��������qqq ��]      &   �   x�U�=j1��S�f���q��f�ĸ��(!H��6�l`k.�r����42!�|�$c�b�u�y�B.���\�p��UH&i/t�O���A���ό��%�p�?���"����E ��u����MR�Ƙ���M�'�w=����r}}�	˩��Y}>viy�B�/D�
�,�}U�^�4^���j�SM-ִB�Vw���I��4ˋ��0W��7��FM����ݍc;onj      %     x�e�1j�0F�_���H���[����d�"L��Bu�ұK�H�Pڥ�С6��MD�)���?z�O\v/x���v���$���2UM�h Rk��V�jR�kH]�X�����	ȷ�y28׮���ʵ�6�a�P	�k_�N����#]���8s͇�	$a�����k�����Ƅ������Ÿ˺�$���/_�����h��R������?�A�#��x|;���SF�^#�㑐�V���*��V���M�}0e�8l���	B��{f      #   �   x�5�;N�@��S�y��2�"�&�e���8�QqZ$*:\!$�hh�r���d	���7��üֵs(�S�����n���(�B�8A��������w�J3tPJJ!8�Vd�-5��ְ��{����$�aw�b+��+�-�8�fs�H�$��<䡄�޵�;�}�o��?g�Y�Ϡ�B�����|�_	.e�Y(�B��*��I!�4��At2|�"�	)�Q�      $     x�E��J�@��٧�'8�M�gaq��X	���x�&���rO`)V�B���r��Ǿ�es&3L��3�Õ��K�|��� ��&͞�N��7�B��+��VcJ�}�@��Iy��R���챐�3��ζo1.Ć�MY
<�<�����l���J?X8�&)J� pi����"�SZR�/�J�z=:
��ֶ?�ݮ�	�I�����|�l�m�ŉe%��?r�D,��|V({�p�&�	��C��\��fclj�ʼO�]`P��a�;�8�       "   �   x�3�t�����Q��F�&�f朎.��~�%\Ɯ>�a�y�y�p9W� �HWW��	gHQbP�wfj)6���y@\J��ɛq���V��T� "����Tc��#?��č!��$-A�j�(Ū�Ѐhn^:�G��r� P�����U�"o��S	v}RZ����Ǉ�[�4�)8b*����� ��i�     
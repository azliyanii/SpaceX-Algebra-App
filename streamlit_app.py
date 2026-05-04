import streamlit as st
import random
from sympy import symbols, Eq, solve, simplify, expand, factor

# Konfigurasi Laman
st.set_page_config(page_title="SpaceX Algebra Master", page_icon="🚀")

# CSS Khas untuk gaya SpaceX
st.markdown("""
    <style>
    .main {
        background-color: #0e1117;
        color: #ffffff;
    }
    .stButton>button {
        background-color: #005da7;
        color: white;
        border-radius: 10px;
        font-weight: bold;
        width: 100%;
    }
    .stTextInput>div>div>input {
        background-color: #1a1c24;
        color: white;
    }
    </style>
    """, unsafe_allow_html=True)

def main():
    st.title("🚀 SpaceX Algebra Master Toolkit")
    st.write("Selamat datang, Pilot! Gunakan alat ini untuk menguasai hukum algebra di angkasa lepas.")

    # Sidebar untuk navigasi
    menu = ["Penyelesai Persamaan", "Permudahkan Ungkapan", "Kembangkan & Faktorkan", "Misi Latihan"]
    pilihan = st.sidebar.selectbox("Pilih Mod Perkakas", menu)

    x = symbols('x')

    if pilihan == "Penyelesai Persamaan":
        st.header("🔢 Penyelesai Persamaan Linear")
        st.write("Selesaikan format: **ax + b = c**")
        
        col1, col2, col3 = st.columns(3)
        with col1: a = st.number_input("Nilai a", value=1.0)
        with col2: b = st.number_input("Nilai b", value=0.0)
        with col3: c = st.number_input("Nilai c", value=0.0)

        if st.button("Selesaikan x"):
            hasil = solve(Eq(a*x + b, c), x)
            st.success(f"✅ Nilai x ialah: **{hasil[0] if hasil else 'Tiada penyelesaian'}**")

    elif pilihan == "Permudahkan Ungkapan":
        st.header("🧬 Permudahkan Ungkapan")
        teks = st.text_input("Masukkan ungkapan (Gunakan * untuk darab, cth: 2*x + 3*x)", "2*x + 5*x - 3")
        if st.button("Permudahkan"):
            st.code(simplify(teks))

    elif pilihan == "Kembangkan & Faktorkan":
        st.header("Expand & Factor")
        mod = st.radio("Pilih Operasi", ["Kembangkan (Expand)", "Faktorkan (Factor)"])
        teks = st.text_input("Masukkan ungkapan (cth: (x+2)*(x-3) atau x**2 + 5*x + 6)")
        
        if st.button("Proses"):
            if mod == "Kembangkan (Expand)":
                st.code(expand(teks))
            else:
                st.code(factor(teks))

    elif pilihan == "Misi Latihan":
        st.header("🎯 Misi Latihan Rawak")
        
        if 'misi_soalan' not in st.session_state:
            st.session_state.misi_soalan = None
            st.session_state.misi_jawapan = None

        if st.button("Jana Misi Baru") or st.session_state.misi_soalan is None:
            a = random.randint(2, 6)
            jawapan = random.randint(1, 10)
            b = random.randint(1, 15)
            c = a * jawapan + b
            st.session_state.misi_soalan = f"{a}x + {b} = {c}"
            st.session_state.misi_jawapan = jawapan

        st.info(f"Cari nilai x bagi: **{st.session_state.misi_soalan}**")
        user_ans = st.number_input("Masukkan jawapan anda", step=1)
        
        if st.button("Semak Jawapan"):
            if int(user_ans) == st.session_state.misi_jawapan:
                st.balloons()
                st.success("🚀 SYABAS PILOT! Jawapan anda tepat.")
            else:
                st.error(f"💥 Kerosakan dikesan! Jawapan betul ialah {st.session_state.misi_jawapan}.")

if __name__ == "__main__":
    main()

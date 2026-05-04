import random
from sympy import symbols, Eq, solve, simplify, expand, factor

def tajuk():
    print("="*40)
    print("   SPACEX ALGEBRA MASTER TOOLKIT   ")
    print("="*40)

class AlgebraEngine:
    def __init__(self):
        self.x, self.y = symbols('x y')

    def selesaikan_persamaan(self, kiri, kanan):
        """Menyelesaikan persamaan seperti 2x + 5 = 15"""
        persamaan = Eq(kiri, kanan)
        hasil = solve(persamaan, self.x)
        return hasil

    def permudahkan(self, ungkapan):
        """Memudahkan ungkapan seperti (2x + 3x) * 2"""
        return simplify(ungkapan)

    def kembangkan(self, ungkapan):
        """Mengembangkan ungkapan seperti (x + 2)(x - 3)"""
        return expand(ungkapan)

    def faktorkan(self, ungkapan):
        """Memfaktorkan ungkapan seperti x**2 - 5*x + 6"""
        return factor(ungkapan)

def jana_misi_rawak():
    """Menjana soalan rawak untuk latihan"""
    x = symbols('x')
    tahap = random.choice(['mudah', 'sederhana', 'pakar'])
    
    if tahap == 'mudah':
        # ax + b = c
        a = random.randint(2, 5)
        jawapan = random.randint(1, 10)
        b = random.randint(1, 10)
        c = a * jawapan + b
        return f"{a}x + {b} = {c}", jawapan
    
    elif tahap == 'sederhana':
        # a(x + b) = c
        a = random.randint(2, 4)
        jawapan = random.randint(1, 8)
        b = random.randint(1, 5)
        c = a * (jawapan + b)
        return f"{a}(x + {b}) = {c}", jawapan
    
    else:
        # ax + b = cx + d
        a = random.randint(5, 8)
        c = random.randint(2, 4)
        jawapan = random.randint(1, 5)
        b = random.randint(1, 10)
        d = (a * jawapan + b) - (c * jawapan)
        return f"{a}x + {b} = {c}x + {d}", jawapan

def main():
    engine = AlgebraEngine()
    tajuk()
    
    while True:
        print("\nMenu Utama:")
        print("1. Selesaikan Persamaan Linear")
        print("2. Permudahkan Ungkapan")
        print("3. Kembangkan (Expansion)")
        print("4. Jana Soalan Latihan (Misi)")
        print("5. Keluar")
        
        pilihan = input("\nMasukkan pilihan (1-5): ")
        
        if pilihan == '1':
            print("\nFormat: ax + b = c")
            try:
                a = float(input("Nilai a: "))
                b = float(input("Nilai b: "))
                c = float(input("Nilai c: "))
                hasil = engine.selesaikan_persamaan(a*engine.x + b, c)
                print(f"✅ Nilai x ialah: {hasil}")
            except:
                print("Input tidak sah!")

        elif pilihan == '2':
            teks = input("Masukkan ungkapan (cth: 2*x + 3*x): ")
            print(f"Hasil: {engine.permudahkan(teks)}")

        elif pilihan == '3':
            teks = input("Masukkan ungkapan (cth: (x+2)*(x-3)): ")
            print(f"Hasil: {engine.kembangkan(teks)}")

        elif pilihan == '4':
            soalan, jawapan = jana_misi_rawak()
            print(f"\nMISI: Cari nilai x bagi: {soalan}")
            user_input = input("Jawapan anda: ")
            if str(user_input) == str(jawapan):
                print("🚀 SYABAS PILOT! Jawapan tepat.")
            else:
                print(f"💥 Kerosakan dikesan! Jawapan betul ialah {jawapan}.")

        elif pilihan == '5':
            print("Selamat tinggal, Pilot!")
            break

if __name__ == "__main__":
    main()

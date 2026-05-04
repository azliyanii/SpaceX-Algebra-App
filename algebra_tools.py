import random
from sympy import symbols, Eq, solve

def jana_soalan_algebra():
    """Menjana soalan linear mudah: ax + b = c"""
    x = symbols('x')
    
    # Pilih nombor rawak
    a = random.randint(2, 10)
    x_asli = random.randint(1, 15)  # Jawapan yang kita mahu
    b = random.randint(1, 20)
    
    # Kira hasil c (c = a*x + b)
    c = a * x_asli + b
    
    # Bina persamaan
    persamaan = Eq(a * x + b, c)
    
    return {
        "soalan": f"{a}x + {b} = {c}",
        "persamaan_sympy": persamaan,
        "jawapan": x_asli
    }

def main():
    print("=== SpaceX Algebra Python Tool ===\n")
    
    # Jana 5 soalan latihan
    for i in range(1, 6):
        data = jana_soalan_algebra()
        print(f"Soalan {i}: Berapakah nilai x bagi {data['soalan']}?")
        
        # Pengguna boleh cuba jawab (simulasi)
        input_user = input("Jawapan anda: ")
        
        try:
            if int(input_user) == data['jawapan']:
                print("✅ Betul! Anda seorang Pilot yang hebat.\n")
            else:
                print(f"❌ Salah. Jawapan sebenar ialah {data['jawapan']}.\n")
        except ValueError:
            print("Sila masukkan nombor sahaja.\n")

if __name__ == "__main__":
    main()

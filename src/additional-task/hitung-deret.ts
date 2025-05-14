//Buatlah sebuah program yang menghasilkan deret angka sederhana yang susunan angkanya merupakan penjumlahan dari dua angka sebelumnya (0,1,1,2,3,5,8,13,21)

export function hitungDeret(n: number) {
  const deret = [];
  let a = 0,
    b = 1;

  for (let i = 0; i < n; i++) {
    deret.push(a);
    [a, b] = [b, a + b];
  }

  return deret;
}

//Buatkan fungsi untuk mengambil nilai saham dari dengan keuntungan terbaik
//Contoh :
//Input : [10,9,6,5,15]
//Output : 5
//Soal :
//1. [7,8,3,10,8]
//2. [5,12,11,12,10]
//3. [7,18,27,10,29]
//4. [20,17,15,14,10]

export function hargaBeliTerbaik(harga: number[]) {
  let hargaBeli = harga[0];
  let maxProfit = 0;
  let hargaTerbaik = harga[0];

  for (let i = 1; i < harga.length; i++) {
    const profit = harga[i] - hargaBeli;

    if (profit > maxProfit) {
      maxProfit = profit;
      hargaTerbaik = hargaBeli;
    }

    if (harga[i] < hargaBeli) {
      hargaBeli = harga[i];
    }
  }

  return maxProfit > 0 ? hargaTerbaik : -1;
}

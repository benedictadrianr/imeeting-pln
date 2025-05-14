//Buatkan fungsi untuk mengetahui ada berapa banyak angka yang terdapat pada list string array berikut
//Contoh :
//Input : [2,h,6,u,y,t,7,j,y,h,8]
//Output : 4
//Soal :
//1. [b,7,h,6,h,k,i,5,g,7,8]
//2. [7,b,8,5,6,9,n,f,y,6,9]
//3. [u,h,b,n,7,6,5,1,g,7,9]

export function hitungAngka(arr: string[]) {
  let count = 0;

  for (const item of arr) {
    if (!isNaN(Number(item)) && item.trim() !== "") {
      count++;
    }
  }

  return count;
}

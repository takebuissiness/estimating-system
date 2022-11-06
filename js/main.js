const button = document.getElementById("calculate-button"); // 計算ボタン
const numbers = document.getElementsByName("number"); // 人数
const distances = document.getElementsByName("distance"); // 走行距離
const result = document.querySelector(".result"); // 見積もり額

const input_parts = [numbers,distances];

let numberPrice = 0;
let distancePrice = 0;
let equipmentPrice = 0;
let getNumber = 0;
let getDistance = 0;

console.log(numbers);
console.log(distances);
let sum =0;

const b = [];

function getPrice(number, distance, equipment) {
    
    jQuery.ajax({
        url:"http://127.0.0.1:5500/js/price.json",
        type: "GET",
    }).done(function(data){

        const price = data;

        switch(number) {
            case 1:
                numberPrice = price["number"][0]["price"];
                break;
            case 2:
                numberPrice = price["number"][1]["price"];
                break;
            case 3:
                numberPrice = price["number"][2]["price"];
                break;
            default:
                break;
        }

        console.log("人数：" + numberPrice);

        switch(distance) {
            case 5:
                distancePrice = price["distance"][0]["price"];
                break;
            case 10:
                distancePrice = price["distance"][1]["price"];
                break;
            case 15:
                distancePrice = price["distance"][2]["price"];
                break;
            default:
                break;
        }

        console.log("距離：" + distancePrice);

        // switch(equipment) {
        //     case "wheel-car":
        //         numberEquipment = price["equipment"][0]["price"];
        //         break;
        //     case "stretcher":
        //         numberEquipment = price["equipment"][1]["price"];
        //         break;
        //     default:
        //         break;
        // }

        sum = numberPrice + distancePrice;
        const new_elem = document.createElement("span");
        new_elem.textContent = sum + "円";
        new_elem.className = "result-price";

        console.log("合計金額："+sum+"円");
        result.appendChild(new_elem);

    }).fail(function(data) {
        console.log("ajax失敗");
    });

}

// 要素の順番を取得する関数
function pre_calculate(){
    const result_price = document.querySelector(".result-price");

            if(result_price !== null) {
                document.querySelector(".result-price").remove();
            }

            numbers.forEach(element => {
                if(element.checked) {
                    getNumber = parseInt(element.value);
                }
            });

            distances.forEach(element => {
                if(element.checked) {
                    getDistance = parseInt(element.value);
                }
            });


            
            // const getEquipment = equipment.selected.value;

            let get_order = [getNumber,getDistance]
            let [setNumber,setDistance] = get_order;
            return [setNumber,setDistance];
}



// 人数、距離
input_parts.forEach(element => {

    // 人数、距離の各要素
    element.forEach(el => {        

        // ページ読み込み時
        window.onload = function(){

            let [num, dis] = pre_calculate();

            getPrice(num,dis);


        }

        // 選択を切り替えた時
        el.addEventListener("change",function(){

            let [num, dis] = pre_calculate();

            getPrice(num,dis);

    
        });

    });

});

var table = document.getElementById('tableId');
let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

btn.onclick = function () {
    table.innerHTML = "";
    let min = document.getElementById('minId').value;
    let max = document.getElementById('maxId').value;
    try  {
        if((min > max) || (min < 0) || (max < 0) || (max == arr_en) || (min == arr_en)) {
            throw new Error("Данные введены некорректно");
        }
        if (min == '' || max == '' || min > 18100){
            throw new Error("Нет данных, попадающих под условие фильтра");
        }
       parseJSON(min, max);
    }
    catch (e) {
        message.style.visibility = "visible";
        message.innerHTML = e.message;
        table.style.visibility = "hidden";
    }
}

async function parseJSON(min,max) {
        message.style.visibility = "hidden";
        let url = 'https://exercise.develop.maximaster.ru/service/products/';
        let response = await fetch(url);
        let json = await response.json();
        createTHeader();
            for (var i = 0; i <= json.length - 1; i++) {
                let index = i + 1;
               if (json[i].price >= min && json[i].price <= max) {
                    createTable(json[i], index);
                }
               else if (min == 0 && max == 0){
                   createTable(json[i], index);
               }
        }
}

function createTHeader() {
        var rowHead = table.insertRow(0);
        rowHead.style.backgroundColor = "#cccccc";
        var headId = rowHead.insertCell(0);
        headId.innerHTML = "ID";
        var headName = rowHead.insertCell(1);
        headName.innerHTML = "Название";
        var headQuan = rowHead.insertCell(2);
        headQuan.innerHTML = "Количество";
        var headPrice = rowHead.insertCell(3);
        headPrice.innerHTML = "Цена за единицу";
        var headSum = rowHead.insertCell(4);
        headSum.innerHTML = "Сумма";
}

function createTable(json, index) {
        table.style.visibility = "visible";
        var countRow = table.rows.length;
        var row = table.insertRow(countRow);
        var cellId = row.insertCell(0);
        var cellName = row.insertCell(1);
        var cellQuan = row.insertCell(2);
        var cellPrice = row.insertCell(3);
        var cellSum = row.insertCell(4);
        cellId.innerHTML = index;
        cellName.innerHTML = json.name;
        cellQuan.innerHTML = json.quantity;
        cellPrice.innerHTML = json.price;
        cellSum.innerHTML = json.quantity * json.price;
}
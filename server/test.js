
// function(arr){
//     n = arr.length;
//     for(let i=n-1; i>=0 ;i--){
//         if(arr[i] === n){
//             n -= 1
//         }
//     }
//     return expectedItem 
// }

function moves(arr){
    let prev, next;
    prev=arr[0];
    let move = 0;
    for(var i=1; i<arr.length; i++){
        next=arr[i];
        // if(prev-next > 1){
        //     arr.unshift(arr.splice(i, 1)[0]);
        //     move += 1
        // }else 
        console.log(prev, ' ', next)
        if(prev-next<1){
            arr.push(arr.splice(i, 1)[0]);
            move +=1
        }
    }
    console.log(move,"  ", arr)
}

function selectionSort(arr){
    var m = 0;
    for(let i = 0; i < arr.length; i++){
        let min = i;
        for(let j = i+1; j < arr.length; j++){
            if(arr[min] > arr[j] && arr[min] !== arr[j]){
                min = j
            }
        }
        if(min > i) {
            m +=1
            console.log(arr);
            swap(arr, i, min);
        }
    }
    console.log(m)
}

function swap(arr, idx1, idx2){
    //arr.unshift(arr.splice(idx2, 1)[0]);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

var arr = [3,1,3,2]
selectionSort(arr);
console.log(arr);
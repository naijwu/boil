
const OFFSET = 1288834974657;

function display(id, value) {
    document.getElementById(id).innerText = value;
}

function u64_strToBinary(str) {
    // str must be
    const number = BigInt(str);

    // Check if the number is negative (not allowed for unsigned 64-bit integers)
    if (number < 0n) {
        throw new Error("Invalid input: Only non-negative numbers are allowed for unsigned 64-bit binary.");
    }

    const binaryString = number.toString(2).padStart(64, "0");
    return binaryString
}

// receives 64 length string represented binary
function boil(bin) {
    // last 12 bits: sequence
    // next 5 bits: server id
    // next 5 bits: datacentre id
    // next 22 bits: time after offset

    const seq_b = bin.substring(bin.length - 12);
    const serverId_b = bin.substring(bin.length - 12 - 5, bin.length - 12);
    const centerId_b = bin.substring(bin.length - 12 - 5 - 5, bin.length - 12 - 5);
    const epoch_b = bin.substring(0, bin.length - 12 - 5 - 5);

    const epoch = parseInt(epoch_b, 2) + OFFSET;
    const date = (new Date(epoch)).toUTCString();

    const seq = parseInt(seq_b, 2);
    const serverId = parseInt(serverId_b, 2);
    const centerId = parseInt(centerId_b, 2);
    
    return {
        seq,
        serverId,
        centerId,
        date
    }
}

function handleClick() {
    const id = document.getElementById('snowflake').value

    const bin = u64_strToBinary(id);
    const data = boil(bin);

    Object.keys(data).forEach((k) => {
        display(k, data[k])
    })
}
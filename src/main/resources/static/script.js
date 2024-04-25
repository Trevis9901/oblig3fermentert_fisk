function validerFornavn(Fornavn){
    let regexp = /^[a-zA-ZæøåÆØÅ .\-]{2,20}$/;
    let ok = regexp.test(Fornavn);
    if(!ok) {
        $("#feilNavn").html("Fornavn må bestå av 2 til 20 bokstaver");
        return false;
    }
    else {
        $("#feilNavn").html("");
        return true;
    }
}



function validerAlternativer(){
    var selectElement=document.getElementById("Alternativer");


    if (selectElement.selectedIndex === 0) {
        $("#feilAlternativ").html("Velg en av filmene");
        return false;
    }
    $("#feilAlternativ").html("");
    return true;

}
function validerAntall(Antall){
    let regexp = /^[0-9]{1,2}$/;
    let ok = regexp.test(Antall);
    if(!ok) {
        $("#feilAntall").html("Velg antall billetter mellom 1 og 99");
        return false;
    }
    else {
        $("#feilAntall").html("");
        return true;
    }
}
function validerEtternavn(Etternavn){
    let regexp = /^[a-zA-ZæøåÆØÅ .\-]{2,20}$/;
    let ok = regexp.test(Etternavn);
    if(!ok) {
        $("#feilEtternavn").html("Etternavn må bestå av 2 til 20 bokstaver");
        return false;
    }
    else {
        $("#feilEtternavn").html("");
        return true;
    }
}

function validerTelefonnr(Telefonnr){
    let regexp = /^[0-9. \-]{8}$/;
    let ok = regexp.test(Telefonnr);
    if(!ok) {
        $("#feilTelefonnr").html("Telefonnr må bestå av åtte siffer");
        return false;
    }
    else {
        $("#feilTelefonnr").html("");
        return true;
    }
}

function validerEpost(Epost){
    let regexp = /^[a-zA-ZæøåÆØÅ0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let ok = regexp.test(Epost)
    if(!ok) {
        $("#feilEpost").html("Ugyldig epostadresse");
        return false;
    }
    else {
        $("#feilEpost").html("");
        return true;
    }
}
function ValiderOgKjopbillett() {
    let alt = $("#Alternativer").val()
    let ant = $("#Antall").val()
    let fn = $("#Fornavn").val()
    let en = $("#Etternavn").val()
    let tlf = $("#Telefonnr").val()
    let ep = $("#Epost").val()


    let allTrue=true;
    if (!validerAlternativer(alt)){
        console.log("validering av alternativer feilet");
        allTrue=false;
    }
    if (!validerAntall(ant)){
        console.log("validering av antall feilet");
        allTrue=false;
    }
    if (!validerFornavn(fn)){
        console.log("validering av fornavn feilet");
        allTrue=false;
    }
    if (!validerEtternavn(en)){
        console.log("validering av etternavn feilet");
        allTrue=false;
    }
    if (!validerTelefonnr(tlf)){
        console.log("validering av telefonnummer feilet");
        allTrue=false;
    }
    if (!validerEpost(ep)){
        console.log("validering av epost feilet");
        allTrue=false;
    }

    if (allTrue) {
        const bestillingArray = {alternativer:alt, antall: ant, fornavn: fn, etternavn: en, tlfnummer: tlf, mail: ep};
        console.log(bestillingArray)
        $.post("http://localhost:8080/kinobillett",bestillingArray, function () {
            drawTable()
        });
    } else (
        console.log("Validering feilet og ingen kjøp utført")
    )
}

function drawTable(){
    $('#Vis-Billett').empty()
    let table = document.getElementById('Vis-Billett');
    table.innerHTML = "<thead><tr><th>Film: </th><th>Antall Billetter: </th><th>Fornavn: </th><th>Etternavn: </th><th>Telefonnr: </th><th>Epost: </th></tr></thead>"

    let billetter = $.get("http://localhost:8080/kinobillett", function (data) {
        console.log(billetter)

        data.forEach(function (billett) {
            let row = table.insertRow(-1);
            let alternativ = row.insertCell(0);
            let antall = row.insertCell(1);
            let fornavn = row.insertCell(2);
            let etternavn = row.insertCell(3);
            let tlf = row.insertCell(4);
            let epost = row.insertCell(5);
            let deleteBtn = row.insertCell(6)

            alternativ.innerHTML = billett.alternativer
            antall.innerHTML = billett.antall
            fornavn.innerHTML = billett.fornavn
            etternavn.innerHTML = billett.etternavn
            tlf.innerHTML = billett.tlfnummer
            epost.innerHTML = billett.mail
            deleteBtn.innerHTML = "<button class='btn btn-danger' onclick='slettEn(" + billett.id + ")'>Slett</button>"
        })
    })
}

function slettEn(id) {
    $.ajax({
        url: 'http://localhost:8080/kinobillett/' + id, // Concatenating the id to the URL
        type: 'DELETE', // Setting the method to DELETE
        success: function(response) {
            console.log('Deleted successfully', response);
            drawTable()
        },
        error: function(xhr) {
            console.log('Error in deletion', xhr.statusText);
        }
    });
}
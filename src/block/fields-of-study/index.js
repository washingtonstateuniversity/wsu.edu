{
const find_fos = document.querySelector( ".find-fos" );
const fos_select = find_fos.querySelector( "#fos--select" );

fos_select.addEventListener( "click", function( event ) {
	let value = parseInt( find_fos.querySelector( "select" ).value, 10 );
	window.location.href = "https://admission.wsu.edu/academics/fos/Public/area.castle?id=" + value;
} );
}

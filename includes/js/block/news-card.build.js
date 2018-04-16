!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=2)}([function(e,t){wp.element.Fragment;var a=wp.blocks,n=a.registerBlockType,r=a.RichText,l=a.ImagePlaceholder,c=a.BlockControls,o=a.MediaUpload,i=wp.components,m=(i.TextControl,i.TextareaControl,i.withState),s=i.Toolbar,u=i.IconButton;n("wsu/news-card",{title:"News Card",description:"Configure a set of featured news items",category:"layout",icon:"list-view",attributes:{content:{type:"array",source:"children",selector:".card-excerpt"},category:{type:"array",source:"children",selector:".card-category"},title:{type:"array",source:"children",selector:"header"},image_url:{type:"string"},image_alt:{type:"string"},image_id:{type:"number"}},edit:m({editable:"content"})(function(e){var t=e.attributes,a=e.isSelected,n=e.setAttributes,i=e.editable,m=e.setState,d=t.content,p=t.category,g=t.title,w=t.image_id,f=t.image_url,y=t.image_alt,v=function(e){return function(){m({editable:e})}};var E=f?"editor-card card--news card--has-image":"editor-card card--news",b=function(e){return n({image_id:e.id,image_url:e.url,image_alt:e.alt})},_=function(){return n({image_id:null,image_url:"",image_alt:""})};return wp.element.createElement("article",{className:E},wp.element.createElement(r,{tagname:"p",className:"card-category",placeholder:"Article category descriptor",onFocus:v("category"),value:p,onChange:function(e){return n({category:e})}}),wp.element.createElement(r,{tagname:"header",className:"card-title",placeholder:"News article title",formattingControls:["link"],isSelected:a&&"title"===i,onFocus:v("title"),value:g,onChange:function(e){return n({title:e})}}),wp.element.createElement(r,{tagName:"p",className:"card-excerpt",placeholder:"News article excerpt",onFocus:v("excerpt"),value:d,onChange:function(e){return n({content:e})}}),f?wp.element.createElement("div",null,wp.element.createElement(c,{key:"controls"},wp.element.createElement(s,null,wp.element.createElement(o,{onSelect:b,type:"image",value:w,render:function(e){var t=e.open;return wp.element.createElement("div",null,wp.element.createElement(u,{className:"components-toolbar__control",label:"Edit image",icon:"edit",onClick:t}),wp.element.createElement(u,{icon:"no-alt",onClick:_,className:"blocks-gallery-image__remove",label:"Remove image"}))}}))),wp.element.createElement("img",{src:f,alt:y})):wp.element.createElement(l,{key:"card-image",icon:"format-image",label:"Image",onFocus:v("image"),onSelectImage:b}))}),save:function(e){var t=e.attributes,a=t.content,n=t.category,r=t.title,l=t.image_url,c=t.image_alt,o=l?"card card--news card--has-image":"card card--news",i=l?wp.element.createElement("img",{className:"card-image",src:l,alt:c}):"";return wp.element.createElement("article",{className:o},wp.element.createElement("header",{className:"card-title"},r),wp.element.createElement("p",{className:"card-excerpt"},a),wp.element.createElement("p",{className:"card-category"},n),i)}})},function(e,t){var a=wp.blocks,n=a.registerBlockType,r=a.InnerBlocks;n("wsu/news-deck",{title:"News Deck",description:"Display a group of news cards",category:"layout",icon:"list-view",edit:function(){return wp.element.createElement("div",{className:"deck deck--hp-news"},wp.element.createElement(r,null))},save:function(){return wp.element.createElement("div",{className:"feature-bar-news"},wp.element.createElement("section",{className:"row single hp-news-block news-feature--two"},wp.element.createElement("div",{className:"column one "},wp.element.createElement("div",{className:"deck deck--hp-news"},wp.element.createElement(r.Content,null)))))}})},function(e,t,a){a(1),e.exports=a(0)}]);
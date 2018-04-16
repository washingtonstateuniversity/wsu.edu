!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){},function(e,t){},function(e,t){var n=wp.element.Fragment,a=wp.blocks,r=a.registerBlockType,l=a.RichText,c=a.ImagePlaceholder,o=(a.BlockControls,a.InspectorControls),i=a.MediaUpload,s=wp.components,m=(s.TextControl,s.TextareaControl,s.withState),u=s.Toolbar,p=s.IconButton,d=s.PanelBody;r("wsu/news-card",{title:"News Card",description:"Configure a set of featured news items",category:"layout",icon:"list-view",attributes:{content:{type:"array",source:"children",selector:".card-excerpt"},category:{type:"array",source:"children",selector:".card-category"},title:{type:"array",source:"children",selector:"header"},image_url:{type:"string"},image_alt:{type:"string"},image_id:{type:"number"}},getEditWrapperProps:function(e){if(e.image_url)return{"data-imageurl":"yes"}},edit:m({editable:"content"})(function(e){var t=e.attributes,a=e.isSelected,r=e.setAttributes,s=e.editable,m=e.setState,w=t.content,g=t.category,f=t.title,E=t.image_id,y=t.image_url,h=t.image_alt,b=function(e){return function(){m({editable:e})}},k=y?"editor-card card--news card--has-image":"editor-card card--news",v=function(e){return r({image_id:e.id,image_url:e.url,image_alt:e.alt})},N=function(){return r({image_id:null,image_url:"",image_alt:""})};return[a&&wp.element.createElement(o,{key:"inspector"},wp.element.createElement(d,{title:"News card image",className:"blocks-font-size"},y?wp.element.createElement(n,null,wp.element.createElement(u,null,wp.element.createElement(i,{onSelect:v,type:"image",value:E,render:function(e){var t=e.open;return wp.element.createElement("div",null,wp.element.createElement(p,{className:"components-toolbar__control",label:"Edit image",icon:"edit",onClick:t}),wp.element.createElement(p,{icon:"no-alt",onClick:N,className:"blocks-gallery-image__remove",label:"Remove image"}))}})),wp.element.createElement("img",{src:y,alt:h}),wp.element.createElement("p",null,wp.element.createElement("strong",null,"Alt text:")," ",h)):"",wp.element.createElement(c,{key:"card-image",icon:"format-image",label:"Image",onFocus:b("image"),onSelectImage:v}))),wp.element.createElement("article",{className:k},wp.element.createElement(l,{tagname:"p",className:"card-category",placeholder:"Article category descriptor",onFocus:b("category"),value:g,onChange:function(e){return r({category:e})}}),y?wp.element.createElement("img",{src:y,alt:h}):"",wp.element.createElement(l,{tagname:"header",className:"card-title",placeholder:"News article title",formattingControls:["link"],isSelected:a&&"title"===s,onFocus:b("title"),value:f,onChange:function(e){return r({title:e})}}),wp.element.createElement(l,{tagName:"p",className:"card-excerpt",placeholder:"News article excerpt",onFocus:b("excerpt"),value:w,onChange:function(e){return r({content:e})}}))]}),save:function(e){var t=e.attributes,n=t.content,a=t.category,r=t.title,l=t.image_url,c=t.image_alt,o=l?"card card--news card--has-image":"card card--news",i=l?wp.element.createElement("img",{className:"card-image",src:l,alt:c}):"";return wp.element.createElement("article",{className:o},wp.element.createElement("header",{className:"card-title"},r),wp.element.createElement("p",{className:"card-excerpt"},n),wp.element.createElement("p",{className:"card-category"},a),i)}})},function(e,t){var n=wp.element.Fragment,a=wp.blocks,r=a.registerBlockType,l=a.InnerBlocks;r("wsu/news-deck",{title:"News Deck",description:"Display a group of news cards",category:"layout",icon:"list-view",edit:function(){return wp.element.createElement(n,null,wp.element.createElement("div",{className:"deck deck--hp-news"},wp.element.createElement(l,null)),wp.element.createElement("p",{class:"hp-news-link-wrap"},wp.element.createElement("a",{class:"hp-news-link",href:"https://news.wsu.edu"},"news.wsu.edu")))},save:function(){return wp.element.createElement("div",{className:"feature-bar-news"},wp.element.createElement("section",{className:"row single hp-news-block news-feature--two"},wp.element.createElement("div",{className:"column one "},wp.element.createElement("div",{className:"deck deck--hp-news"},wp.element.createElement(l.Content,null)),wp.element.createElement("p",{class:"hp-news-link-wrap"},wp.element.createElement("a",{class:"hp-news-link",href:"https://news.wsu.edu"},"news.wsu.edu")))))}})},function(e,t,n){n(3),n(2),n(1),e.exports=n(0)}]);
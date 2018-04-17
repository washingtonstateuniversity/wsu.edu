!function(e){var t={};function a(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=4)}([function(e,t){var a=wp.element.Fragment,n=wp.blocks,l=n.registerBlockType,r=n.RichText,c=n.PlainText,i=n.ImagePlaceholder,o=(n.BlockControls,n.InspectorControls),m=n.MediaUpload,s=wp.components,u=(s.TextControl,s.TextareaControl,s.withState),d=s.Toolbar,p=s.IconButton,w=s.PanelBody;l("wsu/feature-card",{title:"Home page feature card",description:"Add a featured card to the top of the home page",category:"layout",icon:"list-view",attributes:{headline:{source:"text",selector:".home-headline-head-wrapper h2"},subtitle:{source:"text",selector:".home-subtitle"},card_date:{type:"string"},card_action_text:{source:"text",selector:".home-cta a"},card_action_url:{source:"attribute",selector:".home-cta a",attribute:"href"},image_url:{type:"string"},image_id:{type:"number"}},getEditWrapperProps:function(e){if(e.image_url)return{"data-imageurl":"yes"}},edit:u({editable:"content"})(function(e){var t,n=e.attributes,l=e.isSelected,s=e.setAttributes,u=(e.editable,e.setState),g=n.headline,h=n.subtitle,f=n.card_date,E=n.card_action_text,y=n.card_action_url,_=n.image_url,b=n.image_id,v=function(e){return s({image_id:e.id,image_url:e.url})},k=function(){return s({image_id:null,image_url:""})};return[l&&wp.element.createElement(o,{key:"inspector"},wp.element.createElement(w,{title:"Feature card data"},_?wp.element.createElement(a,null,wp.element.createElement(d,null,wp.element.createElement(m,{onSelect:v,type:"image",value:b,render:function(e){var t=e.open;return wp.element.createElement("div",null,wp.element.createElement(p,{className:"components-toolbar__control",label:"Edit image",icon:"edit",onClick:t}),wp.element.createElement(p,{icon:"no-alt",onClick:k,className:"blocks-gallery-image__remove",label:"Remove image"}))}})),wp.element.createElement("img",{src:_})):"",wp.element.createElement(i,{key:"card-image",icon:"format-image",label:"Image",onFocus:(t="image",function(){u({editable:t})}),onSelectImage:v}),wp.element.createElement(c,{placeholder:"Enter URL",value:y,onChange:function(e){return s({card_action_url:e})}}),wp.element.createElement(c,{placeholder:"Enter card date: Feb. 12",value:f,onChange:function(e){return s({card_date:e})}}))),wp.element.createElement("div",{className:"card--feature home-headline headline-has-background impact-head dark position-right",style:{backgroundImage:"url( "+_+" )"},key:"edit"},wp.element.createElement("div",{className:"feature-content-wrapper"},wp.element.createElement("div",{className:"feature-title-wrapper"},wp.element.createElement(r,{tagName:"h2",className:"home-title",value:g,placeholder:"Headline",onChange:function(e){return s({headline:e})}}),wp.element.createElement(r,{tagName:"div",className:"home-subtitle",placeholder:"Subtitle",value:h,onChange:function(e){return s({subtitle:e})}})),wp.element.createElement("div",{className:"home-cta"},wp.element.createElement(r,{tagName:"span",className:"editor-card-action-text",placeholder:"Call to action",value:E,onChange:function(e){return s({card_action_text:e})}}))))]}),save:function(e){var t=e.attributes,a=t.headline,n=t.subtitle,l=t.card_date,r=t.card_action_text,c=t.card_action_url,i=t.image_url;return wp.element.createElement("div",{id:"5ad511988632d",className:"wsu-home-headline-wrapper impact-head dark position-right"},wp.element.createElement("div",{style:{backgroundImage:"url( "+i+" )"},className:"home-headline headline-has-background","data-id":"5ad511988632d","data-headline":a,"data-anchor":c,"data-date":l},wp.element.createElement("div",null,wp.element.createElement("div",{className:"home-headline-head-wrapper"},wp.element.createElement("h2",null,a),wp.element.createElement("div",{className:"home-subtitle"},n)),wp.element.createElement("div",{className:"home-cta"},wp.element.createElement("a",{href:c},r)))))}})},function(e,t){var a=wp.element.Fragment,n=wp.blocks,l=n.registerBlockType,r=n.InnerBlocks;l("wsu/feature-deck",{title:"Feature Deck",description:"Contains a list of features to display on the home page",category:"layout",icon:"list-view",edit:function(){return wp.element.createElement(a,{key:"edit"},wp.element.createElement("div",{className:"deck deck--feature"},wp.element.createElement(r,null)))},save:function(){return wp.element.createElement("section",{className:"row single gutter pad-top full features-container features-start"},wp.element.createElement("div",{className:"column one deck deck--feature"},wp.element.createElement(r.Content,null)))}})},function(e,t){var a=wp.element.Fragment,n=wp.blocks,l=n.registerBlockType,r=n.RichText,c=n.ImagePlaceholder,i=(n.BlockControls,n.InspectorControls),o=n.MediaUpload,m=wp.components,s=(m.TextControl,m.TextareaControl,m.withState),u=m.Toolbar,d=m.IconButton,p=m.PanelBody;l("wsu/news-card",{title:"News Card",description:"Configure a set of featured news items",category:"layout",icon:"list-view",attributes:{content:{type:"array",source:"children",selector:".card-excerpt"},category:{type:"array",source:"children",selector:".card-category"},title:{type:"array",source:"children",selector:"header"},image_url:{type:"string"},image_alt:{type:"string"},image_id:{type:"number"}},getEditWrapperProps:function(e){if(e.image_url)return{"data-imageurl":"yes"}},edit:s({editable:"content"})(function(e){var t=e.attributes,n=e.isSelected,l=e.setAttributes,m=e.editable,s=e.setState,w=t.content,g=t.category,h=t.title,f=t.image_id,E=t.image_url,y=t.image_alt,_=function(e){return function(){s({editable:e})}},b=E?"editor-card card--news card--has-image":"editor-card card--news",v=function(e){return l({image_id:e.id,image_url:e.url,image_alt:e.alt})},k=function(){return l({image_id:null,image_url:"",image_alt:""})};return[n&&wp.element.createElement(i,{key:"inspector"},wp.element.createElement(p,{title:"News card image",className:"blocks-font-size"},E?wp.element.createElement(a,null,wp.element.createElement(u,null,wp.element.createElement(o,{onSelect:v,type:"image",value:f,render:function(e){var t=e.open;return wp.element.createElement("div",null,wp.element.createElement(d,{className:"components-toolbar__control",label:"Edit image",icon:"edit",onClick:t}),wp.element.createElement(d,{icon:"no-alt",onClick:k,className:"blocks-gallery-image__remove",label:"Remove image"}))}})),wp.element.createElement("img",{src:E,alt:y}),wp.element.createElement("p",null,wp.element.createElement("strong",null,"Alt text:")," ",y)):"",wp.element.createElement(c,{key:"card-image",icon:"format-image",label:"Image",onFocus:_("image"),onSelectImage:v}))),wp.element.createElement("article",{className:b,key:"edit"},wp.element.createElement(r,{tagname:"p",className:"card-category",placeholder:"Article category descriptor",onFocus:_("category"),value:g,onChange:function(e){return l({category:e})}}),E?wp.element.createElement("img",{src:E,alt:y}):"",wp.element.createElement(r,{tagname:"header",className:"card-title",placeholder:"News article title",formattingControls:["link"],isSelected:n&&"title"===m,onFocus:_("title"),value:h,onChange:function(e){return l({title:e})}}),wp.element.createElement(r,{tagName:"p",className:"card-excerpt",placeholder:"News article excerpt",onFocus:_("excerpt"),value:w,onChange:function(e){return l({content:e})}}))]}),save:function(e){var t=e.attributes,a=t.content,n=t.category,l=t.title,r=t.image_url,c=t.image_alt,i=r?"card card--news card--has-image":"card card--news",o=r?wp.element.createElement("img",{className:"card-image",src:r,alt:c}):"";return wp.element.createElement("article",{className:i},wp.element.createElement("header",{className:"card-title"},l),wp.element.createElement("p",{className:"card-excerpt"},a),wp.element.createElement("p",{className:"card-category"},n),o)}})},function(e,t){var a=wp.element.Fragment,n=wp.blocks,l=n.registerBlockType,r=n.InnerBlocks;l("wsu/news-deck",{title:"News Deck",description:"Display a group of news cards",category:"layout",icon:"list-view",edit:function(){return wp.element.createElement(a,{key:"edit"},wp.element.createElement("div",{className:"deck deck--hp-news"},wp.element.createElement(r,null)),wp.element.createElement("p",{className:"hp-news-link-wrap"},wp.element.createElement("a",{className:"hp-news-link",href:"https://news.wsu.edu"},"news.wsu.edu")))},save:function(){return wp.element.createElement("div",{className:"feature-bar-news"},wp.element.createElement("section",{className:"row single hp-news-block news-feature--two"},wp.element.createElement("div",{className:"column one "},wp.element.createElement("div",{className:"deck deck--hp-news"},wp.element.createElement(r.Content,null)),wp.element.createElement("p",{className:"hp-news-link-wrap"},wp.element.createElement("a",{className:"hp-news-link",href:"https://news.wsu.edu"},"news.wsu.edu")))))}})},function(e,t,a){a(3),a(2),a(1),e.exports=a(0)}]);
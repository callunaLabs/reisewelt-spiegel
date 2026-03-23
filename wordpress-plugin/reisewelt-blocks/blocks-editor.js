(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var registerBlockType = blocks.registerBlockType;
  var InspectorControls = blockEditor.InspectorControls;
  var MediaUpload = blockEditor.MediaUpload;
  var MediaUploadCheck = blockEditor.MediaUploadCheck;
  var PanelBody = components.PanelBody;
  var TextControl = components.TextControl;
  var SelectControl = components.SelectControl;
  var Button = components.Button;
  var TextareaControl = components.TextareaControl;
  var cat = 'reisewelt';

  // ═══ 1. HERO ═══
  registerBlockType('reisewelt/hero', {
    title: 'Reise Hero', icon: 'format-image', category: cat,
    attributes: {
      image: { type: 'string', default: '' },
      imageId: { type: 'number', default: 0 },
      title: { type: 'string', default: '' },
      subtitle: { type: 'string', default: '' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      return el('div', { style: { border: '2px solid #E64415', borderRadius: '6px', overflow: 'hidden' } },
        el(MediaUploadCheck, {}, el(MediaUpload, {
          onSelect: function(m) { s({ image: m.url, imageId: m.id }); },
          allowedTypes: ['image'], value: a.imageId,
          render: function(r) {
            return el('div', { onClick: r.open, style: { cursor: 'pointer', minHeight: '180px', background: a.image ? 'url('+a.image+') center/cover' : '#f0f0f0', display: 'flex', alignItems: 'flex-end', padding: '20px' } },
              el('div', { style: { background: 'rgba(0,0,0,0.7)', padding: '16px', borderRadius: '4px', color: '#fff', maxWidth: '400px' } },
                el('strong', { style: { fontSize: '18px' } }, a.title || 'Titel eingeben'),
                a.subtitle ? el('p', { style: { margin: '6px 0 0', fontSize: '13px', opacity: 0.8 } }, a.subtitle) : null
              )
            );
          }
        })),
        el('div', { style: { padding: '12px' } },
          el(TextControl, { label: 'Titel', value: a.title, onChange: function(v) { s({ title: v }); } }),
          el(TextControl, { label: 'Untertitel', value: a.subtitle, onChange: function(v) { s({ subtitle: v }); } })
        )
      );
    },
    save: function() { return null; },
  });

  // ═══ 2. INFO-LEISTE ═══
  registerBlockType('reisewelt/info-bar', {
    title: 'Info-Leiste', icon: 'info-outline', category: cat,
    attributes: {
      preis: { type: 'string', default: '' },
      dauer: { type: 'string', default: '' },
      destination: { type: 'string', default: '' },
      kategorie: { type: 'string', default: '' },
      partner: { type: 'string', default: '' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      return el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '16px', background: '#f8f6f2', borderRadius: '4px', border: '1px solid #e5e5e5' } },
        el(TextControl, { label: 'Preis', value: a.preis, onChange: function(v) { s({ preis: v }); }, placeholder: 'ab 2.495 € p.P.' }),
        el(TextControl, { label: 'Dauer', value: a.dauer, onChange: function(v) { s({ dauer: v }); }, placeholder: '11 Tage' }),
        el(TextControl, { label: 'Zielregion', value: a.destination, onChange: function(v) { s({ destination: v }); } }),
        el(SelectControl, { label: 'Kategorie', value: a.kategorie, onChange: function(v) { s({ kategorie: v }); }, options: [
          { label: '– wählen –', value: '' }, { label: 'Gruppenreise', value: 'Gruppenreise' },
          { label: 'Kleingruppenreise', value: 'Kleingruppenreise' }, { label: 'Individualreise', value: 'Individualreise' },
        ]}),
        el(TextControl, { label: 'Partner', value: a.partner, onChange: function(v) { s({ partner: v }); } })
      );
    },
    save: function() { return null; },
  });

  // ═══ 3. HIGHLIGHTS ═══
  registerBlockType('reisewelt/highlights', {
    title: 'Highlights', icon: 'star-filled', category: cat,
    attributes: {
      title: { type: 'string', default: 'Highlights' },
      itemsText: { type: 'string', default: '' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      var count = (a.itemsText || '').split('\n').filter(Boolean).length;
      return el('div', { style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: a.title, onChange: function(v) { s({ title: v }); } }),
        el(TextareaControl, { label: 'Highlights (eins pro Zeile)', value: a.itemsText, onChange: function(v) { s({ itemsText: v }); }, rows: 6 }),
        el('p', { style: { color: '#666', fontSize: '12px' } }, count + ' Highlights')
      );
    },
    save: function() { return null; },
  });

  // ═══ 4. TAGESABLAUF ═══
  registerBlockType('reisewelt/itinerary', {
    title: 'Tagesablauf', icon: 'calendar-alt', category: cat,
    attributes: {
      title: { type: 'string', default: 'Reiseverlauf' },
      daysJson: { type: 'string', default: '[]' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      var days = []; try { days = JSON.parse(a.daysJson || '[]'); } catch(e) {}
      function save(d) { s({ daysJson: JSON.stringify(d) }); }
      return el('div', { style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: a.title, onChange: function(v) { s({ title: v }); } }),
        days.map(function(day, i) {
          return el('div', { key: i, style: { marginBottom: '12px', padding: '12px', background: '#f8f6f2', borderRadius: '4px', borderLeft: '3px solid #E64415' } },
            el(TextControl, { label: 'Tag '+(i+1), value: day.titel || '', onChange: function(v) { var d = [].concat(days); d[i] = Object.assign({}, d[i], { titel: v }); save(d); } }),
            el(TextareaControl, { label: 'Beschreibung', value: day.text || '', onChange: function(v) { var d = [].concat(days); d[i] = Object.assign({}, d[i], { text: v }); save(d); }, rows: 2 }),
            el(Button, { isDestructive: true, isSmall: true, onClick: function() { var d = [].concat(days); d.splice(i,1); save(d); } }, 'Entfernen')
          );
        }),
        el(Button, { isPrimary: true, onClick: function() { save(days.concat([{ titel: '', text: '' }])); } }, '+ Tag hinzufügen')
      );
    },
    save: function() { return null; },
  });

  // ═══ 5. GALERIE ═══
  registerBlockType('reisewelt/gallery', {
    title: 'Bildergalerie', icon: 'format-gallery', category: cat,
    attributes: {
      imagesJson: { type: 'string', default: '[]' },
      columns: { type: 'number', default: 3 },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      var images = []; try { images = JSON.parse(a.imagesJson || '[]'); } catch(e) {}
      return el('div', { style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(InspectorControls, {}, el(PanelBody, { title: 'Galerie' },
          el(SelectControl, { label: 'Spalten', value: a.columns, onChange: function(v) { s({ columns: parseInt(v) }); }, options: [
            { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 },
          ]})
        )),
        el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat('+a.columns+', 1fr)', gap: '8px' } },
          images.map(function(img, i) {
            return el('div', { key: i, style: { position: 'relative' } },
              el('img', { src: img.url, style: { width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' } }),
              el(Button, { isDestructive: true, isSmall: true, style: { position: 'absolute', top: 2, right: 2 },
                onClick: function() { var im = [].concat(images); im.splice(i,1); s({ imagesJson: JSON.stringify(im) }); }
              }, '×')
            );
          })
        ),
        el(MediaUploadCheck, {}, el(MediaUpload, {
          onSelect: function(media) { var im = images.concat(media.map(function(m) { return { id: m.id, url: m.url, alt: m.alt }; })); s({ imagesJson: JSON.stringify(im) }); },
          allowedTypes: ['image'], multiple: true,
          render: function(r) { return el(Button, { isPrimary: true, onClick: r.open }, '+ Bilder'); }
        }))
      );
    },
    save: function() { return null; },
  });

  // ═══ 6. INKLUSIVLEISTUNGEN ═══
  registerBlockType('reisewelt/inclusions', {
    title: 'Inklusivleistungen', icon: 'yes-alt', category: cat,
    attributes: {
      title: { type: 'string', default: 'Inklusivleistungen' },
      itemsText: { type: 'string', default: '' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      return el('div', { style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: a.title, onChange: function(v) { s({ title: v }); } }),
        el(TextareaControl, { label: 'Leistungen (eine pro Zeile)', value: a.itemsText, onChange: function(v) { s({ itemsText: v }); }, rows: 6 })
      );
    },
    save: function() { return null; },
  });

  // ═══ 7. BOOKING CTA ═══
  registerBlockType('reisewelt/booking-cta', {
    title: 'Buchungs-Button', icon: 'cart', category: cat,
    attributes: {
      preis: { type: 'string', default: '' },
      buttonText: { type: 'string', default: 'Jetzt buchen' },
      url: { type: 'string', default: '' },
      hinweis: { type: 'string', default: '' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      return el('div', { style: { padding: '20px', background: '#E64415', borderRadius: '4px' } },
        el(TextControl, { label: 'Preis', value: a.preis, onChange: function(v) { s({ preis: v }); }, style: { background: '#fff', borderRadius: '4px' } }),
        el(TextControl, { label: 'Button-Text', value: a.buttonText, onChange: function(v) { s({ buttonText: v }); }, style: { background: '#fff', borderRadius: '4px' } }),
        el(TextControl, { label: 'Buchungs-URL', value: a.url, onChange: function(v) { s({ url: v }); }, style: { background: '#fff', borderRadius: '4px' } }),
        el(TextControl, { label: 'Hinweis', value: a.hinweis, onChange: function(v) { s({ hinweis: v }); }, style: { background: '#fff', borderRadius: '4px' } })
      );
    },
    save: function() { return null; },
  });

  // ═══ 8. PARTNER INFO ═══
  registerBlockType('reisewelt/partner-info', {
    title: 'Partner-Info', icon: 'groups', category: cat,
    attributes: {
      name: { type: 'string', default: '' },
      logo: { type: 'string', default: '' },
      logoId: { type: 'number', default: 0 },
      telefon: { type: 'string', default: '' },
      email: { type: 'string', default: '' },
      website: { type: 'string', default: '' },
      uspsText: { type: 'string', default: '' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      return el('div', { style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Partner-Name', value: a.name, onChange: function(v) { s({ name: v }); } }),
        el(MediaUploadCheck, {}, el(MediaUpload, {
          onSelect: function(m) { s({ logo: m.url, logoId: m.id }); },
          allowedTypes: ['image'], value: a.logoId,
          render: function(r) { return el('div', { style: { marginBottom: '12px' } },
            a.logo ? el('img', { src: a.logo, style: { maxHeight: '40px', marginBottom: '8px' } }) : null,
            el(Button, { isSecondary: true, onClick: r.open }, a.logo ? 'Logo ändern' : 'Logo wählen')
          ); }
        })),
        el(TextControl, { label: 'Telefon', value: a.telefon, onChange: function(v) { s({ telefon: v }); } }),
        el(TextControl, { label: 'E-Mail', value: a.email, onChange: function(v) { s({ email: v }); } }),
        el(TextControl, { label: 'Website', value: a.website, onChange: function(v) { s({ website: v }); } }),
        el(TextareaControl, { label: 'USPs (eins pro Zeile)', value: a.uspsText, onChange: function(v) { s({ uspsText: v }); }, rows: 4 })
      );
    },
    save: function() { return null; },
  });

  // ═══ 9. PREISTABELLE ═══
  registerBlockType('reisewelt/price-table', {
    title: 'Preistabelle', icon: 'money-alt', category: cat,
    attributes: {
      title: { type: 'string', default: 'Termine & Preise' },
      rowsJson: { type: 'string', default: '[]' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      var rows = []; try { rows = JSON.parse(a.rowsJson || '[]'); } catch(e) {}
      function save(r) { s({ rowsJson: JSON.stringify(r) }); }
      return el('div', { style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: a.title, onChange: function(v) { s({ title: v }); } }),
        rows.map(function(row, i) {
          return el('div', { key: i, style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '8px', marginBottom: '8px' } },
            el(TextControl, { placeholder: 'Termin', value: row.termin || '', onChange: function(v) { var r = [].concat(rows); r[i] = Object.assign({}, r[i], { termin: v }); save(r); } }),
            el(TextControl, { placeholder: 'Preis', value: row.preis || '', onChange: function(v) { var r = [].concat(rows); r[i] = Object.assign({}, r[i], { preis: v }); save(r); } }),
            el(TextControl, { placeholder: 'Status', value: row.status || '', onChange: function(v) { var r = [].concat(rows); r[i] = Object.assign({}, r[i], { status: v }); save(r); } }),
            el(Button, { isDestructive: true, isSmall: true, onClick: function() { var r = [].concat(rows); r.splice(i,1); save(r); } }, '×')
          );
        }),
        el(Button, { isPrimary: true, onClick: function() { save(rows.concat([{ termin: '', preis: '', status: '' }])); } }, '+ Termin')
      );
    },
    save: function() { return null; },
  });

  // ═══ 10. FAQ ═══
  registerBlockType('reisewelt/faq', {
    title: 'FAQ', icon: 'editor-help', category: cat,
    attributes: {
      title: { type: 'string', default: 'Häufige Fragen' },
      itemsJson: { type: 'string', default: '[]' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      var items = []; try { items = JSON.parse(a.itemsJson || '[]'); } catch(e) {}
      function save(it) { s({ itemsJson: JSON.stringify(it) }); }
      return el('div', { style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: a.title, onChange: function(v) { s({ title: v }); } }),
        items.map(function(item, i) {
          return el('div', { key: i, style: { marginBottom: '12px', padding: '12px', background: '#f8f6f2', borderRadius: '4px' } },
            el(TextControl, { label: 'Frage', value: item.frage || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { frage: v }); save(it); } }),
            el(TextareaControl, { label: 'Antwort', value: item.antwort || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { antwort: v }); save(it); }, rows: 3 }),
            el(Button, { isDestructive: true, isSmall: true, onClick: function() { var it = [].concat(items); it.splice(i,1); save(it); } }, 'Entfernen')
          );
        }),
        el(Button, { isPrimary: true, onClick: function() { save(items.concat([{ frage: '', antwort: '' }])); } }, '+ Frage')
      );
    },
    save: function() { return null; },
  });

  // ═══ 11. BENTO GRID ═══
  registerBlockType('reisewelt/bento-grid', {
    title: 'Reise-Empfehlungen (Bento)', icon: 'grid-view', category: cat,
    attributes: {
      title: { type: 'string', default: 'Exklusive Reise-Empfehlungen' },
      subtitle: { type: 'string', default: '' },
      filtersText: { type: 'string', default: 'Europa\nAsien\nWeinreisen' },
      itemsJson: { type: 'string', default: '[]' },
    },
    edit: function (props) {
      var a = props.attributes, s = props.setAttributes;
      var items = []; try { items = JSON.parse(a.itemsJson || '[]'); } catch(e) {}
      function save(it) { s({ itemsJson: JSON.stringify(it) }); }
      return el('div', { style: { padding: '20px', border: '2px solid #E64415', borderRadius: '8px', background: '#fafafa' } },
        el(TextControl, { label: 'Titel', value: a.title, onChange: function(v) { s({ title: v }); } }),
        el(TextControl, { label: 'Untertitel', value: a.subtitle, onChange: function(v) { s({ subtitle: v }); } }),
        el(TextareaControl, { label: 'Filter-Tabs (eins pro Zeile)', value: a.filtersText, onChange: function(v) { s({ filtersText: v }); }, rows: 3 }),
        el('hr'),
        el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } },
          items.map(function(item, i) {
            return el('div', { key: i, style: { padding: '12px', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '6px', position: 'relative' } },
              el(SelectControl, { label: 'Größe', value: item.size || 'small', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { size: v }); save(it); }, options: [
                { label: 'Klein (1x1)', value: 'small' }, { label: 'Groß (2x2)', value: 'large' }, { label: 'Breit (2x1)', value: 'wide' },
              ]}),
              el(TextControl, { label: 'Titel', value: item.title || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { title: v }); save(it); } }),
              el(TextControl, { label: 'Ort', value: item.location || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { location: v }); save(it); } }),
              el(TextControl, { label: 'Preis', value: item.price || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { price: v }); save(it); } }),
              el(TextControl, { label: 'Link', value: item.href || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { href: v }); save(it); } }),
              el(MediaUploadCheck, {}, el(MediaUpload, {
                onSelect: function(m) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { image: m.url }); save(it); },
                allowedTypes: ['image'],
                render: function(r) { return el('div', {},
                  item.image ? el('img', { src: item.image, style: { width: '100%', height: '50px', objectFit: 'cover', borderRadius: '4px', marginTop: '4px' } }) : null,
                  el(Button, { isSecondary: true, isSmall: true, onClick: r.open, style: { marginTop: '4px' } }, item.image ? 'Bild ändern' : '+ Bild')
                ); }
              })),
              el(Button, { isDestructive: true, isSmall: true, style: { position: 'absolute', top: 4, right: 4 }, onClick: function() { var it = [].concat(items); it.splice(i,1); save(it); } }, '×')
            );
          })
        ),
        el(Button, { isPrimary: true, onClick: function() { save(items.concat([{ title: '', location: '', price: '', image: '', href: '', size: 'small' }])); }, style: { marginTop: '12px' } }, '+ Reise hinzufügen')
      );
    },
    save: function() { return null; },
  });

})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);

(function (blocks, element, blockEditor, components, i18n) {
  const el = element.createElement;
  const { registerBlockType } = blocks;
  const { InspectorControls, MediaUpload, MediaUploadCheck, RichText } = blockEditor;
  const { PanelBody, TextControl, SelectControl, Button, TextareaControl } = components;
  const category = 'reisewelt';

  // ═══════════════════════════════════════
  // 1. HERO BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/hero', {
    title: 'Reise Hero',
    icon: 'format-image',
    category,
    attributes: {
      image: { type: 'string', default: '' },
      imageId: { type: 'number', default: 0 },
      title: { type: 'string', default: '' },
      subtitle: { type: 'string', default: '' },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      return el('div', { className: 'reisewelt-block-hero' },
        el(InspectorControls, {},
          el(PanelBody, { title: 'Hero Einstellungen' },
            el(TextControl, { label: 'Titel', value: attributes.title, onChange: v => setAttributes({ title: v }) }),
            el(TextControl, { label: 'Untertitel', value: attributes.subtitle, onChange: v => setAttributes({ subtitle: v }) }),
          )
        ),
        el(MediaUploadCheck, {},
          el(MediaUpload, {
            onSelect: media => setAttributes({ image: media.url, imageId: media.id }),
            allowedTypes: ['image'],
            value: attributes.imageId,
            render: ({ open }) => el('div', { onClick: open, style: { cursor: 'pointer', minHeight: '200px', background: attributes.image ? 'url(' + attributes.image + ') center/cover' : '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', position: 'relative' } },
              !attributes.image && el('span', {}, '+ Hero-Bild auswählen'),
              attributes.image && el('div', { style: { position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '8px 16px', borderRadius: '4px' } },
                el('strong', {}, attributes.title || 'Titel eingeben'),
                attributes.subtitle && el('br'),
                attributes.subtitle && el('em', {}, attributes.subtitle)
              )
            )
          })
        )
      );
    },
    save: () => null, // Server-side rendered
  });

  // ═══════════════════════════════════════
  // 2. INFO-LEISTE BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/info-bar', {
    title: 'Info-Leiste',
    icon: 'info-outline',
    category,
    attributes: {
      preis: { type: 'string', default: '' },
      dauer: { type: 'string', default: '' },
      destination: { type: 'string', default: '' },
      kategorie: { type: 'string', default: '' },
      partner: { type: 'string', default: '' },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      return el('div', { className: 'reisewelt-block-info-bar' },
        el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '16px', background: '#f8f6f2', borderRadius: '4px', border: '1px solid #e5e5e5' } },
          el(TextControl, { label: 'Preis', value: attributes.preis, onChange: v => setAttributes({ preis: v }), placeholder: 'ab 2.495 € p.P.' }),
          el(TextControl, { label: 'Dauer', value: attributes.dauer, onChange: v => setAttributes({ dauer: v }), placeholder: '11 Tage' }),
          el(TextControl, { label: 'Zielregion', value: attributes.destination, onChange: v => setAttributes({ destination: v }) }),
          el(SelectControl, { label: 'Kategorie', value: attributes.kategorie, onChange: v => setAttributes({ kategorie: v }), options: [
            { label: '– wählen –', value: '' },
            { label: 'Gruppenreise', value: 'Gruppenreise' },
            { label: 'Kleingruppenreise', value: 'Kleingruppenreise' },
            { label: 'Individualreise', value: 'Individualreise' },
          ]}),
          el(TextControl, { label: 'Partner', value: attributes.partner, onChange: v => setAttributes({ partner: v }) }),
        )
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 3. HIGHLIGHTS BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/highlights', {
    title: 'Highlights',
    icon: 'star-filled',
    category,
    attributes: {
      title: { type: 'string', default: 'Highlights' },
      items: { type: 'array', default: [] },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      return el('div', { className: 'reisewelt-block-highlights', style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: attributes.title, onChange: v => setAttributes({ title: v }) }),
        el(TextareaControl, {
          label: 'Highlights (eins pro Zeile)',
          value: (attributes.items || []).join('\n'),
          onChange: v => setAttributes({ items: v.split('\n').filter(Boolean) }),
          rows: 6,
        }),
        el('p', { style: { color: '#666', fontSize: '12px' } }, (attributes.items || []).length + ' Highlights')
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 4. TAGESABLAUF BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/itinerary', {
    title: 'Tagesablauf',
    icon: 'calendar-alt',
    category,
    attributes: {
      title: { type: 'string', default: 'Reiseverlauf' },
      days: { type: 'array', default: [] },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      var days = attributes.days || [];
      return el('div', { className: 'reisewelt-block-itinerary', style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: attributes.title, onChange: v => setAttributes({ title: v }) }),
        days.map(function (day, i) {
          return el('div', { key: i, style: { marginBottom: '12px', padding: '12px', background: '#f8f6f2', borderRadius: '4px', borderLeft: '3px solid #E64415' } },
            el(TextControl, {
              label: 'Tag ' + (i + 1) + ' – Titel',
              value: day.titel || '',
              onChange: function (v) { var d = [].concat(days); d[i] = Object.assign({}, d[i], { titel: v }); setAttributes({ days: d }); }
            }),
            el(TextareaControl, {
              label: 'Beschreibung',
              value: day.beschreibung || '',
              onChange: function (v) { var d = [].concat(days); d[i] = Object.assign({}, d[i], { beschreibung: v }); setAttributes({ days: d }); },
              rows: 3,
            }),
            el(Button, {
              isDestructive: true, isSmall: true,
              onClick: function () { var d = [].concat(days); d.splice(i, 1); setAttributes({ days: d }); }
            }, 'Entfernen')
          );
        }),
        el(Button, {
          isPrimary: true,
          onClick: function () { setAttributes({ days: days.concat([{ titel: '', beschreibung: '' }]) }); }
        }, '+ Tag hinzufügen')
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 5. GALERIE BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/gallery', {
    title: 'Bildergalerie',
    icon: 'format-gallery',
    category,
    attributes: {
      images: { type: 'array', default: [] },
      columns: { type: 'number', default: 3 },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      return el('div', { className: 'reisewelt-block-gallery', style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(InspectorControls, {},
          el(PanelBody, { title: 'Galerie Einstellungen' },
            el(SelectControl, { label: 'Spalten', value: attributes.columns, onChange: v => setAttributes({ columns: parseInt(v) }), options: [
              { label: '2 Spalten', value: 2 },
              { label: '3 Spalten', value: 3 },
              { label: '4 Spalten', value: 4 },
            ]})
          )
        ),
        el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + attributes.columns + ', 1fr)', gap: '8px' } },
          (attributes.images || []).map(function (img, i) {
            return el('div', { key: i, style: { position: 'relative' } },
              el('img', { src: img.url, alt: img.alt || '', style: { width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' } }),
              el(Button, {
                isDestructive: true, isSmall: true,
                style: { position: 'absolute', top: '4px', right: '4px' },
                onClick: function () { var imgs = [].concat(attributes.images); imgs.splice(i, 1); setAttributes({ images: imgs }); }
              }, '×')
            );
          })
        ),
        el(MediaUploadCheck, {},
          el(MediaUpload, {
            onSelect: function (media) {
              var imgs = (attributes.images || []).concat(media.map(function (m) { return { id: m.id, url: m.url, alt: m.alt }; }));
              setAttributes({ images: imgs });
            },
            allowedTypes: ['image'],
            multiple: true,
            render: ({ open }) => el(Button, { isPrimary: true, onClick: open }, '+ Bilder hinzufügen')
          })
        )
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 6. INKLUSIVLEISTUNGEN BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/inclusions', {
    title: 'Inklusivleistungen',
    icon: 'yes-alt',
    category,
    attributes: {
      title: { type: 'string', default: 'Inklusivleistungen' },
      items: { type: 'array', default: [] },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      return el('div', { className: 'reisewelt-block-inclusions', style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: attributes.title, onChange: v => setAttributes({ title: v }) }),
        el(TextareaControl, {
          label: 'Leistungen (eine pro Zeile)',
          value: (attributes.items || []).join('\n'),
          onChange: v => setAttributes({ items: v.split('\n').filter(Boolean) }),
          rows: 6,
        })
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 7. BOOKING CTA BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/booking-cta', {
    title: 'Buchungs-Button',
    icon: 'cart',
    category,
    attributes: {
      preis: { type: 'string', default: '' },
      buttonText: { type: 'string', default: 'Jetzt buchen' },
      url: { type: 'string', default: '' },
      hinweis: { type: 'string', default: '' },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      return el('div', { className: 'reisewelt-block-booking', style: { padding: '20px', background: '#E64415', borderRadius: '4px', color: '#fff' } },
        el(TextControl, { label: 'Preis', value: attributes.preis, onChange: v => setAttributes({ preis: v }), style: { color: '#333' } }),
        el(TextControl, { label: 'Button-Text', value: attributes.buttonText, onChange: v => setAttributes({ buttonText: v }), style: { color: '#333' } }),
        el(TextControl, { label: 'Buchungs-URL', value: attributes.url, onChange: v => setAttributes({ url: v }), style: { color: '#333' } }),
        el(TextControl, { label: 'Hinweis (optional)', value: attributes.hinweis, onChange: v => setAttributes({ hinweis: v }), style: { color: '#333' } }),
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 8. PARTNER INFO BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/partner-info', {
    title: 'Partner-Info',
    icon: 'groups',
    category,
    attributes: {
      name: { type: 'string', default: '' },
      logo: { type: 'string', default: '' },
      logoId: { type: 'number', default: 0 },
      telefon: { type: 'string', default: '' },
      email: { type: 'string', default: '' },
      website: { type: 'string', default: '' },
      usps: { type: 'array', default: [] },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      return el('div', { className: 'reisewelt-block-partner', style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Partner-Name', value: attributes.name, onChange: v => setAttributes({ name: v }) }),
        el(MediaUploadCheck, {},
          el(MediaUpload, {
            onSelect: media => setAttributes({ logo: media.url, logoId: media.id }),
            allowedTypes: ['image'],
            value: attributes.logoId,
            render: ({ open }) => el('div', { style: { marginBottom: '12px' } },
              attributes.logo ? el('img', { src: attributes.logo, style: { maxHeight: '40px', marginBottom: '8px' } }) : null,
              el(Button, { isSecondary: true, onClick: open }, attributes.logo ? 'Logo ändern' : 'Logo auswählen')
            )
          })
        ),
        el(TextControl, { label: 'Telefon', value: attributes.telefon, onChange: v => setAttributes({ telefon: v }) }),
        el(TextControl, { label: 'E-Mail', value: attributes.email, onChange: v => setAttributes({ email: v }) }),
        el(TextControl, { label: 'Website', value: attributes.website, onChange: v => setAttributes({ website: v }) }),
        el(TextareaControl, {
          label: 'USPs (eins pro Zeile)',
          value: (attributes.usps || []).join('\n'),
          onChange: v => setAttributes({ usps: v.split('\n').filter(Boolean) }),
          rows: 4,
        })
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 9. PREISTABELLE BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/price-table', {
    title: 'Preistabelle',
    icon: 'money-alt',
    category,
    attributes: {
      title: { type: 'string', default: 'Termine & Preise' },
      rows: { type: 'array', default: [] },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      var rows = attributes.rows || [];
      return el('div', { className: 'reisewelt-block-prices', style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: attributes.title, onChange: v => setAttributes({ title: v }) }),
        rows.map(function (row, i) {
          return el('div', { key: i, style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '8px', marginBottom: '8px' } },
            el(TextControl, { placeholder: 'Termin', value: row.termin || '', onChange: function (v) { var r = [].concat(rows); r[i] = Object.assign({}, r[i], { termin: v }); setAttributes({ rows: r }); } }),
            el(TextControl, { placeholder: 'Preis', value: row.preis || '', onChange: function (v) { var r = [].concat(rows); r[i] = Object.assign({}, r[i], { preis: v }); setAttributes({ rows: r }); } }),
            el(TextControl, { placeholder: 'Status', value: row.status || '', onChange: function (v) { var r = [].concat(rows); r[i] = Object.assign({}, r[i], { status: v }); setAttributes({ rows: r }); } }),
            el(Button, { isDestructive: true, isSmall: true, onClick: function () { var r = [].concat(rows); r.splice(i, 1); setAttributes({ rows: r }); } }, '×')
          );
        }),
        el(Button, { isPrimary: true, onClick: function () { setAttributes({ rows: rows.concat([{ termin: '', preis: '', status: '' }]) }); } }, '+ Termin hinzufügen')
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 10. FAQ BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/faq', {
    title: 'FAQ',
    icon: 'editor-help',
    category,
    attributes: {
      title: { type: 'string', default: 'Häufige Fragen' },
      items: { type: 'array', default: [] },
    },
    edit: function (props) {
      const { attributes, setAttributes } = props;
      var items = attributes.items || [];
      return el('div', { className: 'reisewelt-block-faq', style: { padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' } },
        el(TextControl, { label: 'Überschrift', value: attributes.title, onChange: v => setAttributes({ title: v }) }),
        items.map(function (item, i) {
          return el('div', { key: i, style: { marginBottom: '12px', padding: '12px', background: '#f8f6f2', borderRadius: '4px' } },
            el(TextControl, { label: 'Frage', value: item.frage || '', onChange: function (v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { frage: v }); setAttributes({ itemsJson: JSON.stringify(it) }); } }),
            el(TextareaControl, { label: 'Antwort', value: item.antwort || '', onChange: function (v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { antwort: v }); setAttributes({ itemsJson: JSON.stringify(it) }); }, rows: 3 }),
            el(Button, { isDestructive: true, isSmall: true, onClick: function () { var it = [].concat(items); it.splice(i, 1); setAttributes({ itemsJson: JSON.stringify(it) }); } }, 'Entfernen')
          );
        }),
        el(Button, { isPrimary: true, onClick: function () { setAttributes({ items: items.concat([{ frage: '', antwort: '' }]) }); } }, '+ Frage hinzufügen')
      );
    },
    save: () => null,
  });

  // ═══════════════════════════════════════
  // 11. BENTO GRID BLOCK
  // ═══════════════════════════════════════
  registerBlockType('reisewelt/bento-grid', {
    title: 'Reise-Empfehlungen (Bento Grid)',
    icon: 'grid-view',
    category,
    attributes: {
      title: { type: 'string', default: 'Exklusive Reise-Empfehlungen' },
      subtitle: { type: 'string', default: 'Handverlesene Erlebnisse für anspruchsvolle Genießer.' },
      filtersJson: { type: 'string', default: '["Europa","Asien","Weinreisen"]' },
      itemsJson: { type: 'string', default: '[]' },
    },
    edit: function (props) {
      var attrs = props.attributes;
      var setAttributes = props.setAttributes;
      var items = [];
      var filters = [];
      try { items = JSON.parse(attrs.itemsJson || '[]'); } catch(e) { items = []; }
      try { filters = JSON.parse(attrs.filtersJson || '[]'); } catch(e) { filters = []; }

      return el('div', { style: { padding: '20px', border: '2px solid #E64415', borderRadius: '8px', background: '#fafafa' } },
        el('div', { style: { marginBottom: '16px' } },
          el(TextControl, { label: 'Titel', value: attrs.title, onChange: function(v) { setAttributes({ title: v }); } }),
          el(TextControl, { label: 'Untertitel', value: attrs.subtitle, onChange: function(v) { setAttributes({ subtitle: v }); } }),
          el(TextareaControl, {
            label: 'Filter-Tabs (eins pro Zeile)',
            value: filters.join('\n'),
            onChange: function(v) { setAttributes({ filtersJson: JSON.stringify(v.split('\n').filter(Boolean)) }); },
            rows: 3,
          })
        ),

        // Items
        el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } },
          items.map(function(item, i) {
            return el('div', { key: i, style: { padding: '12px', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '6px', position: 'relative' } },
              el('div', { style: { display: 'flex', gap: '8px', marginBottom: '8px' } },
                el(SelectControl, {
                  label: 'Größe',
                  value: item.size || 'small',
                  onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { size: v }); setAttributes({ itemsJson: JSON.stringify(it) }); },
                  options: [
                    { label: 'Klein (1x1)', value: 'small' },
                    { label: 'Groß (2x2)', value: 'large' },
                    { label: 'Breit (2x1)', value: 'wide' },
                  ],
                  __nextHasNoMarginBottom: true,
                })
              ),
              el(TextControl, { label: 'Titel', value: item.title || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { title: v }); setAttributes({ itemsJson: JSON.stringify(it) }); } }),
              el(TextControl, { label: 'Ort / Land', value: item.location || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { location: v }); setAttributes({ itemsJson: JSON.stringify(it) }); } }),
              el(TextControl, { label: 'Preis', value: item.price || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { price: v }); setAttributes({ itemsJson: JSON.stringify(it) }); } }),
              el(TextControl, { label: 'Beschreibung (optional)', value: item.description || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { description: v }); setAttributes({ itemsJson: JSON.stringify(it) }); } }),
              el(TextControl, { label: 'Link', value: item.href || '', onChange: function(v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { href: v }); setAttributes({ itemsJson: JSON.stringify(it) }); } }),
              el(MediaUploadCheck, {},
                el(MediaUpload, {
                  onSelect: function(media) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { image: media.url, imageId: media.id }); setAttributes({ itemsJson: JSON.stringify(it) }); },
                  allowedTypes: ['image'],
                  value: item.imageId,
                  render: function(obj) {
                    return el('div', {},
                      item.image ? el('img', { src: item.image, style: { width: '100%', height: '60px', objectFit: 'cover', borderRadius: '4px', marginTop: '8px' } }) : null,
                      el(Button, { isSecondary: true, onClick: obj.open, style: { marginTop: '4px' } }, item.image ? 'Bild ändern' : '+ Bild')
                    );
                  }
                })
              ),
              el(Button, {
                isDestructive: true, isSmall: true,
                style: { position: 'absolute', top: '8px', right: '8px' },
                onClick: function() { var it = [].concat(items); it.splice(i, 1); setAttributes({ itemsJson: JSON.stringify(it) }); }
              }, '×')
            );
          })
        ),

        el(Button, {
          isPrimary: true,
          onClick: function() { setAttributes({ itemsJson: JSON.stringify(items.concat([{ title: '', location: '', price: '', image: '', href: '', size: 'small' }])) }); },
          style: { marginTop: '12px' }
        }, '+ Reise hinzufügen')
      );
    },
    save: function() { return null; },
  });

})(
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components,
  window.wp.i18n
);

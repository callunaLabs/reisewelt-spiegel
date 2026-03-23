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
            el(TextControl, { label: 'Frage', value: item.frage || '', onChange: function (v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { frage: v }); setAttributes({ items: it }); } }),
            el(TextareaControl, { label: 'Antwort', value: item.antwort || '', onChange: function (v) { var it = [].concat(items); it[i] = Object.assign({}, it[i], { antwort: v }); setAttributes({ items: it }); }, rows: 3 }),
            el(Button, { isDestructive: true, isSmall: true, onClick: function () { var it = [].concat(items); it.splice(i, 1); setAttributes({ items: it }); } }, 'Entfernen')
          );
        }),
        el(Button, { isPrimary: true, onClick: function () { setAttributes({ items: items.concat([{ frage: '', antwort: '' }]) }); } }, '+ Frage hinzufügen')
      );
    },
    save: () => null,
  });

})(
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components,
  window.wp.i18n
);

<?php
/**
 * Plugin Name: SPIEGEL Reisewelt – Gutenberg Blocks
 * Description: Custom Gutenberg Blocks für Reise-Detailseiten
 * Version: 1.0.0
 * Author: CallunaLabs
 */

if (!defined('ABSPATH')) exit;

// ─── Block Category ───
add_filter('block_categories_all', function ($categories) {
    array_unshift($categories, [
        'slug'  => 'reisewelt',
        'title' => 'SPIEGEL Reisewelt',
        'icon'  => 'airplane',
    ]);
    return $categories;
});

// ─── Register Blocks (Server-Side Rendered) ───
add_action('init', function () {

    // 1. Hero Block
    register_block_type('reisewelt/hero', [
        'attributes' => [
            'image'    => ['type' => 'string', 'default' => ''],
            'imageId'  => ['type' => 'number', 'default' => 0],
            'title'    => ['type' => 'string', 'default' => ''],
            'subtitle' => ['type' => 'string', 'default' => ''],
        ],
        'render_callback' => function ($attrs) {
            $img = esc_url($attrs['image']);
            $title = esc_html($attrs['title']);
            $sub = esc_html($attrs['subtitle']);
            return "<div class=\"reisewelt-hero\" data-image=\"{$img}\" data-title=\"{$title}\" data-subtitle=\"{$sub}\"></div>";
        },
    ]);

    // 2. Info-Leiste Block
    register_block_type('reisewelt/info-bar', [
        'attributes' => [
            'preis'      => ['type' => 'string', 'default' => ''],
            'dauer'      => ['type' => 'string', 'default' => ''],
            'destination'=> ['type' => 'string', 'default' => ''],
            'kategorie'  => ['type' => 'string', 'default' => ''],
            'partner'    => ['type' => 'string', 'default' => ''],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-info-bar" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 3. Highlight-Liste Block
    register_block_type('reisewelt/highlights', [
        'attributes' => [
            'title'      => ['type' => 'string', 'default' => 'Highlights'],
            'items'      => ['type' => 'array', 'default' => [], 'items' => ['type' => 'string']],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-highlights" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 4. Tagesablauf Block
    register_block_type('reisewelt/itinerary', [
        'attributes' => [
            'title' => ['type' => 'string', 'default' => 'Reiseverlauf'],
            'days'  => ['type' => 'array', 'default' => [], 'items' => ['type' => 'object']],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-itinerary" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 5. Galerie Block
    register_block_type('reisewelt/gallery', [
        'attributes' => [
            'images' => ['type' => 'array', 'default' => [], 'items' => ['type' => 'object']],
            'columns' => ['type' => 'number', 'default' => 3],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-gallery" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 6. Inklusivleistungen Block
    register_block_type('reisewelt/inclusions', [
        'attributes' => [
            'title' => ['type' => 'string', 'default' => 'Inklusivleistungen'],
            'items' => ['type' => 'array', 'default' => [], 'items' => ['type' => 'string']],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-inclusions" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 7. Booking CTA Block
    register_block_type('reisewelt/booking-cta', [
        'attributes' => [
            'preis'      => ['type' => 'string', 'default' => ''],
            'buttonText' => ['type' => 'string', 'default' => 'Jetzt buchen'],
            'url'        => ['type' => 'string', 'default' => ''],
            'hinweis'    => ['type' => 'string', 'default' => ''],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-booking-cta" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 8. Partner Block
    register_block_type('reisewelt/partner-info', [
        'attributes' => [
            'name'    => ['type' => 'string', 'default' => ''],
            'logo'    => ['type' => 'string', 'default' => ''],
            'logoId'  => ['type' => 'number', 'default' => 0],
            'telefon' => ['type' => 'string', 'default' => ''],
            'email'   => ['type' => 'string', 'default' => ''],
            'website' => ['type' => 'string', 'default' => ''],
            'usps'    => ['type' => 'array', 'default' => [], 'items' => ['type' => 'string']],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-partner-info" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 9. Preistabelle Block
    register_block_type('reisewelt/price-table', [
        'attributes' => [
            'title' => ['type' => 'string', 'default' => 'Termine & Preise'],
            'rows'  => ['type' => 'array', 'default' => [], 'items' => ['type' => 'object']],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-price-table" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 10. FAQ Block
    register_block_type('reisewelt/faq', [
        'attributes' => [
            'title' => ['type' => 'string', 'default' => 'Häufige Fragen'],
            'items' => ['type' => 'array', 'default' => [], 'items' => ['type' => 'object']],
        ],
        'render_callback' => function ($attrs) {
            return '<div class="reisewelt-faq" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);

    // 11. Bento Grid Block (Featured Trips Grid)
    register_block_type('reisewelt/bento-grid', [
        'attributes' => [
            'title'    => ['type' => 'string', 'default' => 'Exklusive Reise-Empfehlungen'],
            'subtitle' => ['type' => 'string', 'default' => ''],
            'itemsJson' => ['type' => 'string', 'default' => '[]'],
            'filtersJson' => ['type' => 'string', 'default' => '[]'],
        ],
        'render_callback' => function ($attrs) {
            $attrs['items'] = json_decode($attrs['itemsJson'] ?? '[]', true) ?: [];
            $attrs['filters'] = json_decode($attrs['filtersJson'] ?? '[]', true) ?: [];
            unset($attrs['itemsJson'], $attrs['filtersJson']);
            return '<div class="reisewelt-bento-grid" data-attrs="' . esc_attr(json_encode($attrs)) . '"></div>';
        },
    ]);
});

// ─── Enqueue Block Editor Assets ───
add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_script(
        'reisewelt-blocks-editor',
        plugin_dir_url(__FILE__) . 'blocks-editor.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-data'],
        filemtime(plugin_dir_path(__FILE__) . 'blocks-editor.js'),
        true
    );
    wp_enqueue_style(
        'reisewelt-blocks-editor-style',
        plugin_dir_url(__FILE__) . 'blocks-editor.css',
        ['wp-edit-blocks'],
        filemtime(plugin_dir_path(__FILE__) . 'blocks-editor.css')
    );
});

// ─── Expose parsed blocks in REST API ───
add_action('rest_api_init', function () {
    $post_types = ['rundreise', 'genussreise', 'reisetrend', 'deal', 'page'];

    foreach ($post_types as $type) {
        register_rest_field($type, 'blocks', [
            'get_callback' => function ($post) {
                $blocks = parse_blocks($post['content']['raw'] ?? get_post_field('post_content', $post['id']));
                $parsed = [];
                foreach ($blocks as $block) {
                    if (empty($block['blockName'])) continue;
                    $parsed[] = [
                        'name' => $block['blockName'],
                        'attrs' => $block['attrs'] ?? [],
                        'innerHTML' => $block['innerHTML'] ?? '',
                    ];
                }
                return $parsed;
            },
            'schema' => null,
        ]);
    }
});

<?php
/**
 * Plugin Name: SPIEGEL Reisewelt – Custom Post Types
 * Description: Custom Post Types und REST API Endpoints für das Headless CMS
 * Version: 1.0.0
 * Author: CallunaLabs
 */

if (!defined('ABSPATH')) exit;

// ─── Custom Post Types ───

add_action('init', function () {

    // Rundreisen
    register_post_type('rundreise', [
        'labels' => [
            'name' => 'Rundreisen',
            'singular_name' => 'Rundreise',
            'add_new_item' => 'Neue Rundreise',
            'edit_item' => 'Rundreise bearbeiten',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'rundreise',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon' => 'dashicons-airplane',
        'rewrite' => ['slug' => 'rundreisen'],
    ]);

    // Genussreisen
    register_post_type('genussreise', [
        'labels' => [
            'name' => 'Genussreisen',
            'singular_name' => 'Genussreise',
            'add_new_item' => 'Neue Genussreise',
            'edit_item' => 'Genussreise bearbeiten',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'genussreise',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon' => 'dashicons-food',
        'rewrite' => ['slug' => 'genussreisen'],
    ]);

    // Reisetrends
    register_post_type('reisetrend', [
        'labels' => [
            'name' => 'Reisetrends',
            'singular_name' => 'Reisetrend',
            'add_new_item' => 'Neuer Reisetrend',
            'edit_item' => 'Reisetrend bearbeiten',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'reisetrend',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon' => 'dashicons-chart-line',
        'rewrite' => ['slug' => 'reisetrends'],
    ]);

    // Deals
    register_post_type('deal', [
        'labels' => [
            'name' => 'Deals',
            'singular_name' => 'Deal',
            'add_new_item' => 'Neuer Deal',
            'edit_item' => 'Deal bearbeiten',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'deal',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon' => 'dashicons-tag',
        'rewrite' => ['slug' => 'deals'],
    ]);

    // Partner
    register_post_type('partner', [
        'labels' => [
            'name' => 'Partner',
            'singular_name' => 'Partner',
            'add_new_item' => 'Neuer Partner',
            'edit_item' => 'Partner bearbeiten',
        ],
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rest_base' => 'partner',
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon' => 'dashicons-groups',
    ]);
});

// ─── Custom Meta Fields (REST API exposed) ───

add_action('init', function () {
    $trip_meta = [
        'preis'          => ['type' => 'string',  'description' => 'Preis ab (z.B. "ab 1.695 € p.P.")'],
        'dauer'          => ['type' => 'string',  'description' => 'Reisedauer (z.B. "10 Tage")'],
        'destination'    => ['type' => 'string',  'description' => 'Zielregion/Land'],
        'partner'        => ['type' => 'string',  'description' => 'Partner-Name'],
        'booking_url'    => ['type' => 'string',  'description' => 'Externe Buchungs-URL'],
        'highlights'     => ['type' => 'string',  'description' => 'Highlights (kommagetrennt)'],
        'kategorie'      => ['type' => 'string',  'description' => 'Kategorie (z.B. Gruppenreise, Kleingruppe)'],
    ];

    foreach (['rundreise', 'genussreise'] as $post_type) {
        foreach ($trip_meta as $key => $args) {
            register_post_meta($post_type, $key, [
                'show_in_rest' => true,
                'single' => true,
                'type' => $args['type'],
                'description' => $args['description'],
            ]);
        }
    }

    // Deal-spezifische Felder
    $deal_meta = [
        'preis'           => ['type' => 'string'],
        'original_preis'  => ['type' => 'string'],
        'rabatt'          => ['type' => 'string'],
        'sterne'          => ['type' => 'integer'],
        'booking_url'     => ['type' => 'string'],
        'gueltig_bis'     => ['type' => 'string'],
        'destination'     => ['type' => 'string'],
    ];

    foreach ($deal_meta as $key => $args) {
        register_post_meta('deal', $key, [
            'show_in_rest' => true,
            'single' => true,
            'type' => $args['type'],
        ]);
    }

    // Partner-Felder
    $partner_meta = [
        'website'     => ['type' => 'string'],
        'telefon'     => ['type' => 'string'],
        'email'       => ['type' => 'string'],
        'kategorie'   => ['type' => 'string', 'description' => 'Zugeordnete Kategorie (rundreisen/genussreisen/reisetrends)'],
        'usps'        => ['type' => 'string', 'description' => 'USPs (kommagetrennt)'],
    ];

    foreach ($partner_meta as $key => $args) {
        register_post_meta('partner', $key, [
            'show_in_rest' => true,
            'single' => true,
            'type' => $args['type'],
        ]);
    }
});

// ─── Custom REST Endpoint: Site Settings ───

add_action('rest_api_init', function () {
    register_rest_route('reisewelt/v1', '/settings', [
        'methods' => 'GET',
        'callback' => function () {
            $logo_id = get_theme_mod('custom_logo');
            $logo_url = $logo_id ? wp_get_attachment_image_url($logo_id, 'full') : '';

            return [
                'logo' => $logo_url,
                'siteTitle' => get_bloginfo('name'),
                'siteDescription' => get_bloginfo('description'),
                'siteUrl' => get_bloginfo('url'),
            ];
        },
        'permission_callback' => '__return_true',
    ]);
});

// ─── CORS Headers for Headless Frontend ───

add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        $allowed = [
            'http://localhost:4321',
            'http://localhost:3000',
            'https://reisewelt-spiegel.replit.app',
        ];

        if (in_array($origin, $allowed) || !$origin) {
            header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
        }

        return $value;
    });
});

// ─── Meta Boxes for easier editing in WP Admin ───

add_action('add_meta_boxes', function () {
    // Rundreisen & Genussreisen Meta Box
    foreach (['rundreise', 'genussreise'] as $pt) {
        add_meta_box('reise_details', 'Reise-Details', function ($post) {
            $fields = [
                'preis' => 'Preis (z.B. ab 1.695 € p.P.)',
                'dauer' => 'Dauer (z.B. 10 Tage)',
                'destination' => 'Zielregion/Land',
                'partner' => 'Partner-Name',
                'booking_url' => 'Buchungs-URL',
                'highlights' => 'Highlights (kommagetrennt)',
                'kategorie' => 'Kategorie',
            ];
            wp_nonce_field('reise_meta', 'reise_meta_nonce');
            echo '<table class="form-table">';
            foreach ($fields as $key => $label) {
                $value = get_post_meta($post->ID, $key, true);
                echo "<tr><th><label for='{$key}'>{$label}</label></th>";
                echo "<td><input type='text' id='{$key}' name='{$key}' value='" . esc_attr($value) . "' class='regular-text' /></td></tr>";
            }
            echo '</table>';
        }, $pt, 'normal', 'high');
    }

    // Deal Meta Box
    add_meta_box('deal_details', 'Deal-Details', function ($post) {
        $fields = [
            'preis' => 'Preis (€)',
            'original_preis' => 'Originalpreis (€)',
            'rabatt' => 'Rabatt-Label',
            'sterne' => 'Sterne (1-5)',
            'booking_url' => 'Buchungs-URL',
            'gueltig_bis' => 'Gültig bis (YYYY-MM-DD)',
            'destination' => 'Reiseziel',
        ];
        wp_nonce_field('deal_meta', 'deal_meta_nonce');
        echo '<table class="form-table">';
        foreach ($fields as $key => $label) {
            $value = get_post_meta($post->ID, $key, true);
            echo "<tr><th><label for='{$key}'>{$label}</label></th>";
            echo "<td><input type='text' id='{$key}' name='{$key}' value='" . esc_attr($value) . "' class='regular-text' /></td></tr>";
        }
        echo '</table>';
    }, 'deal', 'normal', 'high');

    // Partner Meta Box
    add_meta_box('partner_details', 'Partner-Details', function ($post) {
        $fields = [
            'website' => 'Website-URL',
            'telefon' => 'Telefon',
            'email' => 'E-Mail',
            'kategorie' => 'Kategorie (rundreisen/genussreisen/reisetrends)',
            'usps' => 'USPs (kommagetrennt)',
        ];
        wp_nonce_field('partner_meta', 'partner_meta_nonce');
        echo '<table class="form-table">';
        foreach ($fields as $key => $label) {
            $value = get_post_meta($post->ID, $key, true);
            echo "<tr><th><label for='{$key}'>{$label}</label></th>";
            echo "<td><input type='text' id='{$key}' name='{$key}' value='" . esc_attr($value) . "' class='regular-text' /></td></tr>";
        }
        echo '</table>';
    }, 'partner', 'normal', 'high');
});

// Save meta fields
add_action('save_post', function ($post_id) {
    $all_fields = [
        'preis', 'dauer', 'destination', 'partner', 'booking_url',
        'highlights', 'kategorie', 'original_preis', 'rabatt',
        'sterne', 'gueltig_bis', 'website', 'telefon', 'email', 'usps',
    ];

    foreach ($all_fields as $key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $key, sanitize_text_field($_POST[$key]));
        }
    }
});

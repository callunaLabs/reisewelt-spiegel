<?php
/**
 * Plugin Name: SPIEGEL Reisewelt – ACF Field Groups
 * Description: ACF Feldgruppen für Rundreisen, Genussreisen, Reisetrends, Deals, Partner
 * Version: 1.0.0
 * Requires Plugins: advanced-custom-fields
 */

if (!defined('ABSPATH')) exit;

add_action('acf/init', function() {
    if (!function_exists('acf_add_local_field_group')) return;

    // ─── Rundreisen & Genussreisen Fields ───
    acf_add_local_field_group([
        'key' => 'group_reise_details',
        'title' => 'Reise-Details',
        'fields' => [
            [
                'key' => 'field_reise_hero',
                'label' => 'Hero-Bild',
                'name' => 'hero_bild',
                'type' => 'image',
                'return_format' => 'array',
                'preview_size' => 'medium',
                'instructions' => 'Das große Hauptbild der Reise (mind. 1920px breit)',
            ],
            [
                'key' => 'field_reise_preis',
                'label' => 'Preis',
                'name' => 'reise_preis',
                'type' => 'text',
                'placeholder' => 'z.B. ab 2.495 € p.P.',
            ],
            [
                'key' => 'field_reise_dauer',
                'label' => 'Reisedauer',
                'name' => 'reise_dauer',
                'type' => 'text',
                'placeholder' => 'z.B. 11 Tage',
            ],
            [
                'key' => 'field_reise_destination',
                'label' => 'Zielregion / Land',
                'name' => 'reise_destination',
                'type' => 'text',
            ],
            [
                'key' => 'field_reise_kategorie',
                'label' => 'Kategorie',
                'name' => 'reise_kategorie',
                'type' => 'select',
                'choices' => [
                    'gruppenreise' => 'Gruppenreise',
                    'kleingruppenreise' => 'Kleingruppenreise',
                    'individualreise' => 'Individualreise',
                ],
            ],
            [
                'key' => 'field_reise_partner',
                'label' => 'Partner',
                'name' => 'reise_partner',
                'type' => 'text',
                'placeholder' => 'z.B. Marco Polo Reisen',
            ],
            [
                'key' => 'field_reise_booking_url',
                'label' => 'Buchungs-URL',
                'name' => 'reise_booking_url',
                'type' => 'url',
                'placeholder' => 'https://www.sgr-tours.de/...',
            ],
            [
                'key' => 'field_reise_highlights',
                'label' => 'Highlights',
                'name' => 'reise_highlights',
                'type' => 'textarea',
                'instructions' => 'Ein Highlight pro Zeile',
                'new_lines' => 'br',
                'rows' => 5,
            ],
            [
                'key' => 'field_reise_galerie_urls',
                'label' => 'Bildergalerie (URLs)',
                'name' => 'reise_galerie_urls',
                'type' => 'textarea',
                'instructions' => 'Eine Bild-URL pro Zeile. Alternativ Bilder im Editor einbetten.',
                'new_lines' => 'br',
                'rows' => 4,
            ],
            [
                'key' => 'field_reise_inklusivleistungen',
                'label' => 'Inklusivleistungen',
                'name' => 'reise_inklusivleistungen',
                'type' => 'textarea',
                'instructions' => 'Eine Leistung pro Zeile',
                'new_lines' => 'br',
                'rows' => 6,
            ],
            [
                'key' => 'field_reise_tagesablauf',
                'label' => 'Tagesablauf / Reiseverlauf',
                'name' => 'reise_tagesablauf',
                'type' => 'wysiwyg',
                'instructions' => 'Bitte Überschriften (H3/H4) für die einzelnen Tage verwenden, z.B. "Tag 1: Anreise nach Hanoi"',
                'toolbar' => 'full',
                'media_upload' => 1,
                'tabs' => 'all',
            ],
        ],
        'location' => [
            [
                ['param' => 'post_type', 'operator' => '==', 'value' => 'rundreise'],
            ],
            [
                ['param' => 'post_type', 'operator' => '==', 'value' => 'genussreise'],
            ],
        ],
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
    ]);

    // ─── Reisetrends Fields ───
    acf_add_local_field_group([
        'key' => 'group_reisetrend_details',
        'title' => 'Reisetrend-Details',
        'fields' => [
            [
                'key' => 'field_trend_hero',
                'label' => 'Hero-Bild',
                'name' => 'trend_hero_bild',
                'type' => 'image',
                'return_format' => 'array',
                'preview_size' => 'medium',
            ],
            [
                'key' => 'field_trend_partner',
                'label' => 'Partner',
                'name' => 'trend_partner',
                'type' => 'text',
                'default_value' => 'sparwelt.de',
            ],
            [
                'key' => 'field_trend_lesezeit',
                'label' => 'Lesezeit',
                'name' => 'trend_lesezeit',
                'type' => 'text',
                'placeholder' => 'z.B. 8 Min.',
            ],
        ],
        'location' => [
            [
                ['param' => 'post_type', 'operator' => '==', 'value' => 'reisetrend'],
            ],
        ],
    ]);

    // ─── Partner Fields ───
    acf_add_local_field_group([
        'key' => 'group_partner_details',
        'title' => 'Partner-Details',
        'fields' => [
            [
                'key' => 'field_partner_logo',
                'label' => 'Partner-Logo',
                'name' => 'partner_logo',
                'type' => 'image',
                'return_format' => 'array',
                'preview_size' => 'medium',
            ],
            [
                'key' => 'field_partner_website',
                'label' => 'Website',
                'name' => 'partner_website',
                'type' => 'url',
            ],
            [
                'key' => 'field_partner_telefon',
                'label' => 'Telefon',
                'name' => 'partner_telefon',
                'type' => 'text',
            ],
            [
                'key' => 'field_partner_email',
                'label' => 'E-Mail',
                'name' => 'partner_email',
                'type' => 'email',
            ],
            [
                'key' => 'field_partner_kategorie',
                'label' => 'Zugeordnete Kategorie',
                'name' => 'partner_kategorie',
                'type' => 'select',
                'choices' => [
                    'rundreisen' => 'Rundreisen',
                    'genussreisen' => 'Genussreisen',
                    'reisetrends' => 'Reisetrends',
                ],
            ],
            [
                'key' => 'field_partner_usps',
                'label' => 'USPs',
                'name' => 'partner_usps',
                'type' => 'textarea',
                'instructions' => 'Ein USP pro Zeile. Format: Titel | Beschreibung',
                'new_lines' => 'br',
                'rows' => 5,
            ],
        ],
        'location' => [
            [
                ['param' => 'post_type', 'operator' => '==', 'value' => 'partner'],
            ],
        ],
    ]);

    // ─── Deal Fields ───
    acf_add_local_field_group([
        'key' => 'group_deal_details',
        'title' => 'Deal-Details',
        'fields' => [
            [
                'key' => 'field_deal_bild',
                'label' => 'Deal-Bild',
                'name' => 'deal_bild',
                'type' => 'image',
                'return_format' => 'array',
            ],
            [
                'key' => 'field_deal_preis',
                'label' => 'Preis',
                'name' => 'deal_preis',
                'type' => 'text',
                'placeholder' => 'z.B. 899',
            ],
            [
                'key' => 'field_deal_originalpreis',
                'label' => 'Originalpreis',
                'name' => 'deal_originalpreis',
                'type' => 'text',
                'placeholder' => 'z.B. 1.399',
            ],
            [
                'key' => 'field_deal_rabatt',
                'label' => 'Rabatt-Label',
                'name' => 'deal_rabatt',
                'type' => 'text',
                'placeholder' => 'z.B. -35%',
            ],
            [
                'key' => 'field_deal_sterne',
                'label' => 'Sterne (1-5)',
                'name' => 'deal_sterne',
                'type' => 'number',
                'min' => 1,
                'max' => 5,
            ],
            [
                'key' => 'field_deal_booking_url',
                'label' => 'Buchungs-URL',
                'name' => 'deal_booking_url',
                'type' => 'url',
            ],
            [
                'key' => 'field_deal_destination',
                'label' => 'Reiseziel',
                'name' => 'deal_destination',
                'type' => 'text',
            ],
            [
                'key' => 'field_deal_gueltig_bis',
                'label' => 'Gueltig bis',
                'name' => 'deal_gueltig_bis',
                'type' => 'date_picker',
                'display_format' => 'd.m.Y',
                'return_format' => 'Y-m-d',
            ],
        ],
        'location' => [
            [
                ['param' => 'post_type', 'operator' => '==', 'value' => 'deal'],
            ],
        ],
    ]);
});

// ─── Expose ACF fields in REST API ───
add_action('rest_api_init', function() {
    $post_types = ['rundreise', 'genussreise', 'reisetrend', 'deal', 'partner'];

    foreach ($post_types as $type) {
        register_rest_field($type, 'acf', [
            'get_callback' => function($post) {
                if (function_exists('get_fields')) {
                    return get_fields($post['id']) ?: [];
                }
                return [];
            },
            'schema' => null,
        ]);
    }
});

<?php
/**
 * Plugin Name: SPIEGEL Reisewelt – Design Settings
 * Description: Design-Einstellungen für das Headless Frontend (Farben, Fonts, Größen)
 * Version: 1.0.0
 * Author: CallunaLabs
 */

if (!defined('ABSPATH')) exit;

// ─── Register Settings ───
add_action('admin_init', function () {
    // Colors (defaults from reisewelt.spiegel.de)
    register_setting('reisewelt_design', 'rw_color_primary', ['default' => '#2f2d2b']);
    register_setting('reisewelt_design', 'rw_color_secondary', ['default' => '#e64415']);
    register_setting('reisewelt_design', 'rw_color_surface', ['default' => '#ffffff']);
    register_setting('reisewelt_design', 'rw_color_surface_container', ['default' => '#f1efed']);
    register_setting('reisewelt_design', 'rw_color_text', ['default' => '#2f2d2b']);
    register_setting('reisewelt_design', 'rw_color_text_secondary', ['default' => '#807e7c']);

    // Fonts (defaults from reisewelt.spiegel.de — SPIEGEL-eigene Fonts)
    register_setting('reisewelt_design', 'rw_font_headline', ['default' => 'SpiegelSlab4UICd']);
    register_setting('reisewelt_design', 'rw_font_body', ['default' => 'SpiegelSerifTextUI']);
    register_setting('reisewelt_design', 'rw_font_label', ['default' => 'SpiegelSans4UI']);

    // Font Sizes
    register_setting('reisewelt_design', 'rw_size_hero_title', ['default' => 'clamp(1.75rem, 4vw, 3rem)']);
    register_setting('reisewelt_design', 'rw_size_section_title', ['default' => '1.75rem']);
    register_setting('reisewelt_design', 'rw_size_card_title', ['default' => '1.25rem']);
    register_setting('reisewelt_design', 'rw_size_body', ['default' => '1rem']);
    register_setting('reisewelt_design', 'rw_size_label', ['default' => '0.625rem']);

    // Spacing
    register_setting('reisewelt_design', 'rw_spacing_section', ['default' => '5rem']);
    register_setting('reisewelt_design', 'rw_spacing_card_gap', ['default' => '2rem']);

    // Border Radius
    register_setting('reisewelt_design', 'rw_border_radius', ['default' => '8px']);

    // Logo
    register_setting('reisewelt_design', 'rw_logo_url', ['default' => '']);
    register_setting('reisewelt_design', 'rw_logo_height', ['default' => '24px']);
});

// ─── Admin Menu ───
add_action('admin_menu', function () {
    add_menu_page(
        'Reisewelt Design',
        'Reisewelt Design',
        'manage_options',
        'reisewelt-design',
        'rw_design_settings_page',
        'dashicons-art',
        30
    );
});

// ─── Settings Page ───
function rw_design_settings_page() {
    if (!current_user_can('manage_options')) return;
    ?>
    <div class="wrap">
        <h1 style="display:flex;align-items:center;gap:12px;">
            <span class="dashicons dashicons-art" style="font-size:28px;color:#E64415;"></span>
            SPIEGEL Reisewelt – Design Settings
        </h1>
        <p style="font-size:14px;color:#666;max-width:600px;">
            Hier stellen Sie die Design-Parameter für das Frontend ein. Änderungen werden beim nächsten Build des Frontends wirksam.
        </p>

        <form method="post" action="options.php">
            <?php settings_fields('reisewelt_design'); ?>

            <style>
                .rw-settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px; margin-top: 24px; }
                .rw-settings-card { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 24px; }
                .rw-settings-card h2 { font-size: 16px; font-weight: 700; margin: 0 0 16px; padding: 0; border: none; display: flex; align-items: center; gap: 8px; }
                .rw-settings-card h2 .dashicons { color: #E64415; }
                .rw-field { margin-bottom: 16px; }
                .rw-field label { display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #666; margin-bottom: 4px; }
                .rw-field input[type="text"], .rw-field select { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
                .rw-field input[type="color"] { width: 60px; height: 36px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; padding: 2px; }
                .rw-color-row { display: flex; align-items: center; gap: 12px; }
                .rw-color-row input[type="text"] { flex: 1; }
                .rw-preview { margin-top: 8px; padding: 8px 12px; border-radius: 4px; font-size: 13px; }
                @media (max-width: 782px) { .rw-settings-grid { grid-template-columns: 1fr; } }
            </style>

            <div class="rw-settings-grid">

                <!-- COLORS -->
                <div class="rw-settings-card">
                    <h2><span class="dashicons dashicons-admin-appearance"></span> Farben</h2>

                    <?php
                    $colors = [
                        ['rw_color_primary', 'Primärfarbe (Navy)', 'Überschriften, dunkle Hintergründe'],
                        ['rw_color_secondary', 'Akzentfarbe (Rot)', 'Buttons, CTAs, aktive Navigation'],
                        ['rw_color_surface', 'Hintergrund', 'Haupthintergrund der Seite'],
                        ['rw_color_surface_container', 'Container-Hintergrund', 'Sektionen mit leichtem Hintergrund'],
                        ['rw_color_text', 'Textfarbe', 'Überschriften und primärer Text'],
                        ['rw_color_text_secondary', 'Text sekundär', 'Beschreibungen, Untertitel'],
                    ];
                    foreach ($colors as [$key, $label, $desc]) {
                        $val = get_option($key);
                        echo "<div class='rw-field'>";
                        echo "<label>{$label}</label>";
                        echo "<div class='rw-color-row'>";
                        echo "<input type='color' name='{$key}' value='" . esc_attr($val) . "' onchange=\"this.nextElementSibling.value=this.value\" />";
                        echo "<input type='text' value='" . esc_attr($val) . "' onchange=\"this.previousElementSibling.value=this.value;this.previousElementSibling.dispatchEvent(new Event('change'))\" oninput=\"this.previousElementSibling.value=this.value\" />";
                        echo "</div>";
                        echo "<p class='description'>{$desc}</p>";
                        echo "</div>";
                    }
                    ?>
                </div>

                <!-- FONTS -->
                <div class="rw-settings-card">
                    <h2><span class="dashicons dashicons-editor-textcolor"></span> Schriften</h2>

                    <?php
                    $fonts = [
                        ['rw_font_headline', 'Headline-Font', ['SpiegelSlab4UICd', 'SpiegelSerifDisplayUI', 'Inter', 'Space Grotesk', 'Montserrat', 'Poppins', 'Roboto']],
                        ['rw_font_body', 'Body-Font (Fließtext)', ['SpiegelSerifTextUI', 'SpiegelSerifDisplayUI', 'Newsreader', 'Noto Serif', 'Merriweather', 'Lora', 'Inter']],
                        ['rw_font_label', 'Label-Font', ['SpiegelSans4UI', 'Inter', 'Work Sans', 'DM Sans', 'Roboto', 'Open Sans']],
                    ];
                    foreach ($fonts as [$key, $label, $options]) {
                        $val = get_option($key);
                        echo "<div class='rw-field'>";
                        echo "<label>{$label}</label>";
                        echo "<select name='{$key}'>";
                        foreach ($options as $opt) {
                            $sel = ($val === $opt) ? 'selected' : '';
                            echo "<option value='{$opt}' {$sel} style='font-family:{$opt}'>{$opt}</option>";
                        }
                        echo "</select>";
                        echo "<div class='rw-preview' style='font-family:{$val};background:#f5f5f5;'>Vorschau: Die Welt entdecken – SPIEGEL Reisewelt</div>";
                        echo "</div>";
                    }
                    ?>
                </div>

                <!-- FONT SIZES -->
                <div class="rw-settings-card">
                    <h2><span class="dashicons dashicons-editor-expand"></span> Schriftgrößen</h2>

                    <?php
                    $sizes = [
                        ['rw_size_hero_title', 'Hero-Titel', 'z.B. clamp(1.75rem, 4vw, 3rem)'],
                        ['rw_size_section_title', 'Sektions-Überschrift', 'z.B. 1.75rem'],
                        ['rw_size_card_title', 'Card-Titel', 'z.B. 1.25rem'],
                        ['rw_size_body', 'Fließtext', 'z.B. 1rem'],
                        ['rw_size_label', 'Labels / Tags', 'z.B. 0.625rem'],
                    ];
                    foreach ($sizes as [$key, $label, $desc]) {
                        $val = get_option($key);
                        echo "<div class='rw-field'>";
                        echo "<label>{$label}</label>";
                        echo "<input type='text' name='{$key}' value='" . esc_attr($val) . "' />";
                        echo "<p class='description'>{$desc}</p>";
                        echo "</div>";
                    }
                    ?>
                </div>

                <!-- SPACING & LAYOUT -->
                <div class="rw-settings-card">
                    <h2><span class="dashicons dashicons-editor-kitchensink"></span> Abstände & Layout</h2>

                    <div class="rw-field">
                        <label>Sektions-Abstand</label>
                        <input type="text" name="rw_spacing_section" value="<?php echo esc_attr(get_option('rw_spacing_section')); ?>" />
                        <p class="description">Abstand zwischen Sektionen (z.B. 5rem)</p>
                    </div>

                    <div class="rw-field">
                        <label>Card-Abstand</label>
                        <input type="text" name="rw_spacing_card_gap" value="<?php echo esc_attr(get_option('rw_spacing_card_gap')); ?>" />
                        <p class="description">Abstand zwischen Teaser-Cards (z.B. 2rem)</p>
                    </div>

                    <div class="rw-field">
                        <label>Border-Radius</label>
                        <input type="text" name="rw_border_radius" value="<?php echo esc_attr(get_option('rw_border_radius')); ?>" />
                        <p class="description">Ecken-Rundung (z.B. 8px, 12px, 0)</p>
                    </div>

                    <div class="rw-field">
                        <label>Logo-URL</label>
                        <input type="text" name="rw_logo_url" value="<?php echo esc_attr(get_option('rw_logo_url')); ?>" />
                        <p class="description">URL zum Logo-Bild (leer = Standard)</p>
                    </div>

                    <div class="rw-field">
                        <label>Logo-Höhe</label>
                        <input type="text" name="rw_logo_height" value="<?php echo esc_attr(get_option('rw_logo_height')); ?>" />
                        <p class="description">z.B. 24px, 32px</p>
                    </div>
                </div>
            </div>

            <?php submit_button('Design speichern', 'primary', 'submit', true, ['style' => 'margin-top:24px;background:#E64415;border-color:#E64415;']); ?>
        </form>
    </div>
    <?php
}

// ─── REST API Endpoint ───
add_action('rest_api_init', function () {
    register_rest_route('reisewelt/v1', '/design', [
        'methods' => 'GET',
        'callback' => function () {
            return [
                'colors' => [
                    'primary'           => get_option('rw_color_primary', '#04122e'),
                    'secondary'         => get_option('rw_color_secondary', '#E64415'),
                    'surface'           => get_option('rw_color_surface', '#ffffff'),
                    'surfaceContainer'  => get_option('rw_color_surface_container', '#faf8f5'),
                    'text'              => get_option('rw_color_text', '#1d1b16'),
                    'textSecondary'     => get_option('rw_color_text_secondary', '#45464d'),
                ],
                'fonts' => [
                    'headline' => get_option('rw_font_headline', 'Inter'),
                    'body'     => get_option('rw_font_body', 'Newsreader'),
                    'label'    => get_option('rw_font_label', 'Inter'),
                ],
                'sizes' => [
                    'heroTitle'    => get_option('rw_size_hero_title', 'clamp(1.75rem, 4vw, 3rem)'),
                    'sectionTitle' => get_option('rw_size_section_title', '1.75rem'),
                    'cardTitle'    => get_option('rw_size_card_title', '1.25rem'),
                    'body'         => get_option('rw_size_body', '1rem'),
                    'label'        => get_option('rw_size_label', '0.625rem'),
                ],
                'spacing' => [
                    'section' => get_option('rw_spacing_section', '5rem'),
                    'cardGap' => get_option('rw_spacing_card_gap', '2rem'),
                ],
                'layout' => [
                    'borderRadius' => get_option('rw_border_radius', '8px'),
                    'logoUrl'      => get_option('rw_logo_url', ''),
                    'logoHeight'   => get_option('rw_logo_height', '24px'),
                ],
            ];
        },
        'permission_callback' => '__return_true',
    ]);
});

<?php
/**
 * Emergency Plugin Recovery Script for reisewelt-poc.calluna.ai
 * 
 * Upload this file to wp-content/mu-plugins/fix-plugins.php via FTP/KAS panel.
 * OR upload to the WordPress root directory and access it via browser.
 * 
 * It will re-activate seo-by-rank-math and re-activate wp-rest-cache.
 * After the site is fixed, DELETE THIS FILE immediately.
 */

// If accessed directly (uploaded to WP root), bootstrap WordPress
if (!defined('ABSPATH')) {
    define('WP_USE_THEMES', false);
    // Try to find wp-load.php
    $wp_load = dirname(__FILE__) . '/wp-load.php';
    if (!file_exists($wp_load)) {
        $wp_load = dirname(dirname(__FILE__)) . '/wp-load.php';
    }
    if (file_exists($wp_load)) {
        // Temporarily deactivate the broken plugin before loading WP
        // by hooking into the option filter
        define('DOING_CRON', true); // This helps bypass some plugin checks
        require($wp_load);
    } else {
        die('Cannot find wp-load.php');
    }
}

// Get current active plugins
$active_plugins = get_option('active_plugins', []);

echo "<h2>Current active plugins:</h2><pre>";
print_r($active_plugins);
echo "</pre>";

// Check what needs fixing
$rank_math_base = 'seo-by-rank-math/rank-math.php';
$rank_math_pro = 'seo-by-rank-math-pro/rank-math-pro.php';
$wp_rest_cache = 'wp-rest-cache/wp-rest-cache.php';

$changes = [];

// Re-activate Rank Math base if it's missing but Pro is active
if (!in_array($rank_math_base, $active_plugins) && in_array($rank_math_pro, $active_plugins)) {
    // Add Rank Math base BEFORE Pro
    $pro_index = array_search($rank_math_pro, $active_plugins);
    array_splice($active_plugins, $pro_index, 0, $rank_math_base);
    $changes[] = "Re-activated: $rank_math_base";
}

// Re-activate wp-rest-cache if missing
if (!in_array($wp_rest_cache, $active_plugins)) {
    $active_plugins[] = $wp_rest_cache;
    $changes[] = "Re-activated: $wp_rest_cache";
}

if (!empty($changes)) {
    update_option('active_plugins', $active_plugins);
    echo "<h2>Changes made:</h2><ul>";
    foreach ($changes as $c) {
        echo "<li>$c</li>";
    }
    echo "</ul>";
    echo "<h2>Updated active plugins:</h2><pre>";
    print_r(get_option('active_plugins'));
    echo "</pre>";
    echo "<p style='color:green;font-weight:bold;'>Site should be fixed! Delete this file now.</p>";
} else {
    echo "<p>No changes needed. Plugins look correct.</p>";
}

// Also clear any paused extensions
delete_option('wp_paused_extensions');
echo "<p>Cleared paused extensions.</p>";

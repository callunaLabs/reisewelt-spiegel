<?php
/**
 * Emergency: Re-activate Rank Math base plugin
 * Upload to: wp-content/mu-plugins/reactivate-rankmath.php
 * DELETE IMMEDIATELY after site is fixed!
 */
// This runs before regular plugins are loaded, so it can fix the active_plugins list
// before the broken plugin tries to load.
$active = get_option('active_plugins', []);
$base = 'seo-by-rank-math/rank-math.php';
$pro  = 'seo-by-rank-math-pro/rank-math-pro.php';
$cache = 'wp-rest-cache/wp-rest-cache.php';

$changed = false;

// Re-activate Rank Math base if Pro is active without it
if (!in_array($base, $active) && in_array($pro, $active)) {
    $pos = array_search($pro, $active);
    array_splice($active, $pos, 0, [$base]);
    $changed = true;
}

// Re-activate wp-rest-cache if missing
if (!in_array($cache, $active)) {
    $active[] = $cache;
    $changed = true;
}

if ($changed) {
    update_option('active_plugins', $active);
    // Clear paused extensions from recovery mode
    delete_option('paused_extensions');
    delete_option('recovery_keys');
    delete_option('recovery_mode_email_last_sent');
}

// Self-destruct: delete this file after it runs
@unlink(__FILE__);

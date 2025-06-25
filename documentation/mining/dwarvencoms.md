---
description: >-
  A module that automates commission grinding and completion in the Dwarven
  Mines, with quality-of-life features for faster progression.
---

# ⚒️ Dwarven Commission

{% hint style="danger" %}
It's **important** you enable **World Caching** in the [**Path Finder**](../misc/pathfinding.md) module, so it works for the longer distances.
{% endhint %}

<details>

<summary>Options</summary>



* **Commissions Macro Keybind:** Keybind to start and stop the macro .\

* **Warp Mines:** Optional toggle to make the macro warp to mines if you have it unlocked.

{% hint style="warning" %}
**Note:** You need the **Travel Scroll to the Dwarven Mines** unlocked for this to work. "/warp mines"
{% endhint %}



* **Use Abiphone For Commissions:** Calls Queen Mismyla to complete commisions anywhere.

{% hint style="success" %}
**Note:** Nebula will still use a **Royal Pigeon** from your hotbar if available. The abiphone integration is purely an optional feature.
{% endhint %}



* **Sword Slot for Goblins:** Configurable weapon slot (1-9) for goblin slayer commissions.



* **Unlocked Comission Milestone 1**: Allows Nebula to verify whether emissaries are unlocked.



* **Use Routes:** This overrides the default path to the commission area. You can create your own routes in the route manager to use. Useful for etherwarp routes to get there faster.

{% hint style="info" %}
**Note:** You can also use the **Route Manager** to create custom commission routes. Detailed instructions can be found in the route documentation.
{% endhint %}

</details>

<details>

<summary> Setup</summary>



To use this module, ensure the following:

* A keybind set for the Commissions Macro (configured in the [first option](dwarvencoms.md#features))
* Access to the **Dwarven Mines** area.
* Once in **Dwarven Mines**, press your bind and it'll automatically pathfind from where you start.

{% hint style="success" %}
**Tip:** Forge warp is not **mandatory**, but highly recommended. When you are far away from the next commission, **Nebula** will warp you to the forge to get there faster.
{% endhint %}

</details>

***

### Recommended Setups

{% tabs %}
{% tab title="Early Game" %}
* **Armor Set**: <img src="../../.gitbook/assets/SkyBlock_armor_glacite.png" alt="" data-size="line"> Glacite Armor
* **Tool**: <img src="../../.gitbook/assets/SkyBlock_items_enchanted_stone_pickaxe.gif" alt="" data-size="line"> Bandaged / Mithril Pickaxe
* **Pet**: <img src="../../.gitbook/assets/SkyBlock_pets_mithril_golem.png" alt="" data-size="line"> Mithril Golem <mark style="color:purple;">\[E]</mark>
* **Equipment**: <img src="../../.gitbook/assets/SkyBlock_items_mithril_necklace.png" alt="" data-size="line"> 4/4 Mithril Equipment reforged to **Royal**
{% endtab %}

{% tab title="Mid Game" %}
* **Armor Set**: <img src="../../.gitbook/assets/SkyBlock_armor_yog.png" alt="" data-size="line">  Yog Armor reforged to **Dimensional**

> **Note**: If you have extra money, you can get <img src="../../.gitbook/assets/SkyBlock_armor_chainmail.png" alt="" data-size="line"> **Sorrow Armor**. The mining speed is minuscule so only get this if you have a lot of money to spare.

* **Tool**: <img src="../../.gitbook/assets/SkyBlock_items_enchanted_prismarine_shard.gif" alt="" data-size="line"> Mithril Drill SX-R226 reforged to **Fleet**
* **Pet**: <img src="../../.gitbook/assets/SkyBlock_pets_mithril_golem.png" alt="" data-size="line"> Mithril Golem <mark style="color:orange;">\[L]</mark>
* **Equipment**: <img src="../../.gitbook/assets/SkyBlock_items_mithril_necklace.png" alt="" data-size="line"> 4/4 Mithril Equipment reforged to **Royal**

> **Note**: You can upgrade to <img src="../../.gitbook/assets/SkyBlock_items_titanium_gauntlet.png" alt="" data-size="line"> **Titanium Equipment** but you are not required to at this stage yet.
{% endtab %}

{% tab title="Late Game" %}
* **Armor Set**: <img src="../../.gitbook/assets/SkyBlock_armor_divan.png" alt="" data-size="line"> Divan Armor reforged to **Dimensional**
* **Tool**: <img src="../../.gitbook/assets/SkyBlock_items_enchanted_prismarine_shard.gif" alt="" data-size="line"> Mithril Drill SX-R326 reforged to **Fleet**
* **Pet**: <img src="../../.gitbook/assets/SkyBlock_pets_mithril_golem.png" alt="" data-size="line"> Mithril Golem <mark style="color:orange;">\[L]</mark>
* **Equipment**: <img src="../../.gitbook/assets/SkyBlock_items_titanium_gauntlet.png" alt="" data-size="line"> 4/4 Titanium Equipment reforged to **Royal**
{% endtab %}
{% endtabs %}

### Usage Notes

> **Tip:** Make sure to set your sword slot number correctly for goblin commissions -- the module will auto-switch to that slot when needed.

> **Note:** The warp mines feature only works after reaching Commission Milestone 4, so early players will need to travel manually. Use "/visit mid" or other portal islands to get there faster.

The module works best when you have the base Mithril **HOTM** perks unlocked and decent mining gear. It'll handle the repetitive parts of commission grinding while you can focus on other task

---
description: >-
  A module that automates commission grinding and completion in the Dwarven
  Mines, with quality-of-life features for faster progression.
---

# ⚒️ Dwarven Commission Module

{% hint style="danger" %}
It's **important** you enable **World Caching** in the [**Path Finder**](../misc/pathfinding.md) module, so it works for the longer distances.
{% endhint %}

### ✨ Features

* **Commissions Macro Keybind:** Keybind to start and stop the macro .
* **Warp Mines:** Optional toggle to make the macro warp to mines if you have it unlocked.

> **Note:** You need the **Dwarven Mines** warp unlocked for this to work. "/warp mines"

* **Use Abiphone For Commissions:** Calls Queen Mismyla to complete commisions anywhere.

> **Note:** You need **Queen Mismyla** in your abiphone contacts. To get her in your contacts you need to give her a **Royal Pigeon**

* **Sword Slot for Goblins:** Configurable weapon slot (1-9) for goblin slayer commissions.
* **Commision Milestone:** This ensures Nebula knows what emissaries you have unlocked.

> **Note:** Every **milestone** up till 3, gives you 2 new emissaries each time.

* **Use Routes:** This overrides the default path to the commission area. You can create your own routes in the route manager to use. Useful for etherwarp routes to get there faster.

> **Note:** The routes do not overwrite where the default commission location is, just the path **to** the default location that **Nebula** prefers. However it will use your custom location routes if the default spot is full.

### ⚙️ Setup

To use this module, ensure the following:

* A keybind set for the Commissions Macro (configured in the [first option](dwarvencoms.md#features))
* Access to the **Dwarven Mines** area.
* Once in **Dwarven Mines**, press your bind and it'll automatically pathfind from where you start.

> **Tip:** Forge warp is not **mandatory**, but highly recommended. When you are far away from the next commission, **Nebula** will warp you to the forge to get there faster.

* Recommended gear is full **Glacite Armor**, **Mithril 4/4 Equipment**, **Rare/Epic Mithril Golem** and a **Mithril Pickaxe** for HOTM 1.

### ✅ Recommended Setups

{% tabs %}
{% tab title="🥇 Early Game" %}
<div align="right"><figure><img src="../../.gitbook/assets/SkyBlock_armor_glacite.png" alt="Glacite Armor" width="138"><figcaption></figcaption></figure></div>

```html
<div style="display: flex; align-items: start; gap: 1rem;">
  <div style="flex: 1;">
    dsadsasdasadsasdsasd  
    *(your running text here…)*  
  </div>
  <div style="flex: 0 0 auto;">
    <img
      src="https://www.gitbook.com/cdn-cgi/image/dpr=2,width=2400,onerror=redirect,format=auto/https%3A%2F%2Ffiles.gitbook.com%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FjQgsUlLYIw88Pgm00t8K%252Fuploads%252FS6qcs81xgMNhdS76St0J%252FSkyBlock_armor_glacite.png%3Falt%3Dmedia%26token%3Daf00660d-47ca-4fe4-970f-d48bb79ddc19"
      alt="Glacite Armor"
      style="max-width: 200px;"
    />
  </div>
</div>
```
{% endtab %}

{% tab title="🥈 Mid Game" %}
<figure><img src="../../.gitbook/assets/SkyBlock_armor_glacite.png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

🥇 Early Game

> * **Armor:** Glacite Armor\
>
> * **Tool:** \[Enter tool or item name]\
>
> * **Pet:** \[Enter pet name]

🥈 Mid Game

> * **Armor:** \[Enter armor name here]\
>
> * **Tool:** \[Enter tool or item name]\
>
> * **Pet:** \[Enter pet name]

🥉 Late Game

> * **Armor:** \[Enter armor name here]\
>
> * **Tool:** \[Enter tool or item name]\
>
> * **Pet:** \[Enter pet name]

### 📝 Usage Notes

> **Tip:** Make sure to set your sword slot number correctly for goblin commissions -- the module will auto-switch to that slot when needed.

> **Note:** The warp mines feature only works after reaching Commission Milestone 4, so early players will need to travel manually. Use "/visit mid" or other portal islands to get there faster.

The module works best when you have the base Mithril **HOTM** perks unlocked and decent mining gear. It'll handle the repetitive parts of commission grinding while you can focus on other task

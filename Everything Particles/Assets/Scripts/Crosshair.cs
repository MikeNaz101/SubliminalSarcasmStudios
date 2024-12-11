using UnityEngine;

public class Crosshair : MonoBehaviour
{
    private RectTransform reticle; // Store the RectTransform component

    void Start()
    {
        // Get the RectTransform component at the start
        reticle = GetComponent<RectTransform>();

        // Make sure the cursor is invisible
        Cursor.visible = false;
    }

    void Update()
    {
        // Move the crosshair to the mouse's position
        reticle.position = Input.mousePosition;
    }
}
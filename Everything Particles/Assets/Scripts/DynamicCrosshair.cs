using UnityEngine;

public class DynamicCrosshair : MonoBehaviour
{
    public RectTransform crosshairRect; // Assign the crosshair UI element in the Inspector

    void Update()
    {
        // Set the crosshair to follow the mouse position
        Vector2 mousePosition = Input.mousePosition;
        crosshairRect.position = mousePosition;
    }
}

import random

# Create a list with 9 of each color
color_list = ['y'] * 9 + ['b'] * 9 + ['g'] * 9 + ['r'] * 9

# Shuffle the list to randomize the order
random.shuffle(color_list)

# Create a 6x6 matrix with the shuffled colors
board = [color_list[i*6:(i+1)*6] for i in range(6)]
 
#board = \
#[['y', 'g', 'b', 'g', 'g', 'g'],
# ['y', 'r', 'b', 'b', 'b', 'g'],
# ['y', 'g', 'b', 'g', 'g', 'g'],
# ['y', 'r', 'y', 'r', 'r', 'r'],
# ['y', 'b', 'r', 'g', 'g', 'g'],
# ['g', 'r', 'y', 'r', 'g', 'r']]
# Print the board
print("Board:")
for row in board:
    print(row)

# Directions for moving in the matrix (up, down, left, right)
directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

def is_valid(x, y, color, visited):
    return 0 <= x < 6 and 0 <= y < 6 and not visited[x][y] and board[x][y] == color

def flood_fill(x, y, color, visited, group):
    stack = [(x, y)]
    while stack:
        cx, cy = stack.pop()
        if not visited[cx][cy]:
            visited[cx][cy] = True
            group.append((cx, cy))
            for dx, dy in directions:
                nx, ny = cx + dx, cy + dy
                if is_valid(nx, ny, color, visited):
                    stack.append((nx, ny))

# Find and group the same color slots
visited = [[False for _ in range(6)] for _ in range(6)]
groups = []

for i in range(6):
    for j in range(6):
        if not visited[i][j]:
            group = []
            flood_fill(i, j, board[i][j], visited, group)
            if group:
                groups.append((board[i][j], group))

# Print the groups
print("\nGroups of the same color:")
for color, group in groups:
    print(f"Color {color}: {group}")

    def is_shapedif(group, shape):
        if shape == "fig01":
            for x, y in group:
                if ((x + 1, y) in group and
                    (x + 1, y - 1) in group and
                    (x + 1, y + 1) in group and
                    (x - 1, y) in group) : # Tshape izquierda
                    return True
                elif ((x, y + 1) in group and
                    (x + 1, y + 1) in group and
                    (x - 1, y + 1) in group and
                    (x, y - 1) in group): # Tshape abajo
                    return True
                elif ((x-1, y) in group and
                    (x - 1, y + 1) in group and
                    (x - 1, y - 1) in group and
                    (x + 1, y) in group) : # Tshape derecha
                    return True
                elif ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x, y + 1) in group) : # Tshape arriba
                    return True
            return False
        elif shape == "fig05":
            # Check for horizontal line
            for x, y in group:
                if all((x, y + i) in group for i in range(5)):
                    return True
            # Check for vertical line
            for x, y in group:
                if all((x + i, y) in group for i in range(5)):
                    return True
            return False
        elif shape == 'fig02':
            for x, y in group:
                if ((x + 1, y) in group and
                    (x + 1, y - 1) in group and
                    (x + 2, y - 1) in group and
                    (x + 3, y -1) in group): # Default
                    return True
                if ((x, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x - 1, y - 2) in group and
                    (x - 1, y - 3) in group): # 90 grados derecha
                    return True
                if ((x - 1, y) in group and
                    (x - 1, y + 1) in group and
                    (x - 2, y + 1) in group and
                    (x - 3, y + 1) in group): # 180 grados derecha
                    return True
                if ((x, y + 1) in group and
                    (x + 1, y + 1) in group and
                    (x + 1, y + 2) in group and
                    (x + 1, y + 3) in group): # 270 grados derecha
                    return True
            return False
        elif shape == 'fig03':
            for x, y in group:
                if ((x - 1, y) in group and
                    (x - 1, y - 1) in group and
                    (x - 2, y - 1) in group and
                    (x - 3, y - 1) in group): # Default mirrored
                    return True
                elif ((x, y + 1) in group and
                    (x - 1, y + 1) in group and
                    (x - 1, y + 2) in group and
                    (x - 1, y + 3) in group): # 90 degrees mirrored
                    return True
                elif ((x + 1, y) in group and
                    (x + 1, y + 1) in group and
                    (x + 2, y + 1) in group and
                    (x + 3, y + 1) in group): # 180 degrees mirrored
                    return True
                elif ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x + 1, y - 2) in group and
                    (x + 1, y - 3) in group): # 270 degrees mirrored
                    return True
            return False
        elif shape == 'fig04':
            for x, y in group:
                if ((x, y-1) in group and
                    (x + 1, y - 1) in group and
                    (x + 1, y - 2) in group and
                    (x + 2, y - 2) in group): # Default 
                    return True
                elif ((x - 1, y) in group and
                    (x - 1, y - 1) in group and
                    (x - 2, y - 1) in group and
                    (x - 2, y - 2) in group): # 90 degrees derecha
                    return True
                elif ((x + 1, y) in group and
                    (x + 1, y - 1) in group and
                    (x + 2, y - 1) in group and
                    (x + 2, y - 2) in group): # 180 degrees derecha
                    return True
                elif ((x, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x - 1, y - 2) in group and
                    (x - 2, y - 2) in group): # 270 degrees derecha
                    return True
            return False
        elif shape == 'fig06':
            for x, y in group:
                if ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x + 1, y - 2) in group and
                    (x + 2, y - 2) in group): # Default
                    return True
                elif ((x, y + 1) in group and
                    (x, y + 2) in group and
                    (x + 1, y + 2) in group and
                    (x + 2, y + 2) in group): # 90 degrees
                    return True
                elif ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 2, y - 1) in group and
                    (x + 2, y - 2) in group): # 180 degrees
                    return True
                elif ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 2, y + 1) in group and
                    (x + 2, y + 2) in group): # 270 degrees
                    return True
            return False
        elif shape == 'fig07':
            for x, y in group:
                if ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 3, y) in group and
                    (x + 3, y - 1) in group): # Default
                    return True
                elif ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x, y - 3) in group and
                    (x - 1, y - 3) in group): # 90 degrees
                    return True
                elif ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x + 2, y - 1) in group and
                    (x + 3, y - 1) in group): # 180 degrees
                    return True
                elif ((x - 1, y) in group and
                    (x - 1, y - 1) in group and
                    (x - 1, y - 2) in group and
                    (x - 1, y - 3) in group): # 270 degrees
                    return True
            return False
        elif shape == 'fig08':
            for x, y in group:
                if ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 3, y) in group and
                    (x + 3, y + 1) in group): # Default mirrored
                    return True
                elif ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x, y - 3) in group and
                    (x + 1, y - 3) in group): # 90 degrees mirrored
                    return True
                elif ((x, y + 1) in group and
                    (x + 1, y + 1) in group and
                    (x + 2, y + 1) in group and
                    (x + 3, y + 1) in group): # 180 degrees mirrored
                    return True
                elif ((x + 1, y) in group and
                    (x + 1, y - 1) in group and
                    (x + 1, y - 2) in group and
                    (x + 1, y - 3) in group): # 270 degrees mirrored
                    return True
            return False
        elif shape == 'fig09':
            for x, y in group:
                if ((x, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x - 2, y - 1) in group and
                    (x - 1, y - 2) in group): # Default 
                    return True
                elif ((x, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x, y - 2) in group and
                    (x + 1, y - 2) in group): # 90 degrees derecha
                    return True
                elif ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x - 1, y - 2) in group): # 180 degrees derecha
                    return True
                elif ((x + 1, y) in group and
                    (x + 1, y - 1) in group and
                    (x + 2, y - 1) in group and
                    (x + 1, y - 2) in group): # 270 degrees derecha
                    return True
            return False
        elif shape == 'fig10':
            for x, y in group:
                if ((x, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x - 2, y - 1) in group and
                    (x - 2, y - 2) in group): # Default 
                    return True
                elif ((x + 1, y) in group and
                    (x + 1, y - 1) in group and
                    (x + 1, y - 2) in group and
                    (x + 2, y - 2) in group): # 90 degrees derecha
                    return True
            return False
        elif shape == 'fig11':
            for x, y in group:
                if ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x + 2, y - 1) in group and
                    (x + 1, y - 2) in group): # Default 
                    return True
                elif ((x - 1, y) in group and
                    (x - 1, y - 1) in group and
                    (x - 2, y - 1) in group and
                    (x - 1, y - 2) in group): # 90 degrees mirrored derecha
                    return True
                elif ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x + 1, y - 2) in group): # 180 degrees mirrored derecha
                    return True
                elif ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x, y - 2) in group and
                    (x - 1, y - 2) in group): # 270 degrees mirrored derecha
                    return True
            return False
        elif shape == 'fig12':
            for x, y in group:
                if ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x + 2, y - 1) in group and
                    (x + 2, y - 2) in group): # Default 
                    return True
                elif ((x - 1, y) in group and
                    (x - 1, y - 1) in group and
                    (x - 1, y - 2) in group and
                    (x - 2, y - 2) in group): # 90 degrees derecha
                    return True
                return False
        elif shape == 'fig13':
            for x, y in group:
                if ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 3, y) in group and
                    (x + 2, y - 1) in group): # Default 
                    return True
                elif ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x, y - 3) in group and
                    (x - 1, y - 2) in group): # 90 degrees derecha
                    return True
                elif ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 3, y) in group and
                    (x + 1, y + 1) in group): # 180 degrees derecha
                    return True
                elif ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x, y - 3) in group and
                    (x + 1, y - 1) in group): # 270 degrees derecha
                    return True
                return False
        elif shape == 'fig14':
            for x, y in group:
                if ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 3, y) in group and
                    (x + 2, y + 1) in group): # Default mirrored
                    return True
                elif ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x, y - 3) in group and
                    (x + 1, y - 2) in group): # 90 degrees mirrored derecha
                    return True
                elif ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 3, y) in group and
                    (x + 1, y - 1) in group): # 180 degrees mirrored derecha
                    return True
                elif ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x, y - 3) in group and
                    (x - 1, y - 1) in group): # 270 degrees mirrored derecha
                    return True
                return False
        elif shape == 'fig15':
            for x, y in group:
                if ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 1, y + 1) in group and
                    (x + 2, y + 1) in group): # Default 
                    return True
                elif ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x + 1, y - 1) in group and
                    (x + 1, y - 2) in group): # 90 degrees derecha
                    return True
                elif ((x - 1, y) in group and
                    (x - 2, y) in group and
                    (x - 1, y - 1) in group and
                    (x - 2, y - 1) in group): # 180 degrees  derecha
                    return True
                elif ((x, y + 1) in group and
                    (x, y + 2) in group and
                    (x - 1, y + 1) in group and
                    (x - 1, y + 2) in group): # 270 degrees  derecha
                    return True
                return False
        elif shape == 'fig16':
            for x, y in group:
                if ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x + 2, y - 1) in group and
                    (x + 2, y) in group): # Default 
                    return True
                elif ((x - 1, y) in group and
                    (x - 1, y - 1) in group and
                    (x - 1, y - 2) in group and
                    (x, y - 2) in group): # 90 degrees derecha
                    return True
                elif ((x, y + 1) in group and
                    (x + 1, y + 1) in group and
                    (x + 2, y + 1) in group and
                    (x + 2, y) in group): # 180 degrees  derecha
                    return True
                elif ((x + 1, y) in group and
                    (x + 1, y - 1) in group and
                    (x + 1, y - 2) in group and
                    (x, y - 2) in group): # 270 degrees  derecha
                    return True
                return False
        elif shape == 'fig17':
            for x, y in group:
                if ((x, y - 1) in group and
                    (x + 1, y - 1) in group and
                    (x - 1, y - 1) in group and
                    (x, y - 2) in group): # Default 
                    return True
                return False
        elif shape == 'fig18':
            for x, y in group:
                if ((x + 1, y) in group and
                    (x + 2, y) in group and
                    (x + 1, y - 1) in group and
                    (x + 2, y - 1) in group): # Default 
                    return True
                elif ((x, y - 1) in group and
                    (x, y - 2) in group and
                    (x - 1, y - 1) in group and
                    (x - 1, y - 2) in group): # 90 degrees derecha
                    return True
                elif ((x - 1, y) in group and
                    (x - 2, y) in group and
                    (x - 1, y + 1) in group and
                    (x - 2, y + 1) in group): # 180 degrees  derecha
                    return True
                elif ((x, y + 1) in group and
                    (x, y + 2) in group and
                    (x + 1, y + 1) in group and
                    (x + 1, y + 2) in group): # 270 degrees  derecha
                    return True
                return False
        else:
            return False

    def is_shapeeasy(group, shape):
            if shape == 'fige01':
                for x, y in group:
                    if ((x + 1, y) in group and
                        (x + 1, y + 1) in group and
                        (x + 2, y + 1) in group): # Default 
                        return True
                    elif ((x, y - 1) in group and
                        (x + 1, y - 1) in group and
                        (x + 1, y - 2) in group): # 90 degrees derecha
                        return True
                    return False
            elif shape == 'fige02':
                for x, y in group:
                    if ((x + 1, y) in group and
                        (x + 1, y - 1) in group and
                        (x, y - 1) in group): # Default 
                        return True
                    return False
            elif shape == 'fige03':
                for x, y in group:
                    if ((x + 1, y) in group and
                        (x + 1, y - 1) in group and
                        (x + 2, y - 1) in group): # Default 
                        return True
                    elif ((x, y - 1) in group and
                        (x - 1, y - 1) in group and
                        (x - 1, y - 2) in group): # 90 degrees derecha
                        return True
                    return False
            elif shape == 'fige04':
                for x, y in group:
                    if ((x + 1, y) in group and
                        (x + 1, y - 1) in group and
                        (x + 1, y + 1) in group) : # Tshape izquierda
                        return True
                    elif ((x, y + 1) in group and
                        (x + 1, y + 1) in group and
                        (x - 1, y + 1) in group) : # Tshape abajo
                        return True
                    elif ((x-1, y) in group and
                        (x - 1, y + 1) in group and
                        (x - 1, y - 1) in group) : # Tshape derecha
                        return True
                    elif ((x, y - 1) in group and
                        (x + 1, y - 1) in group and
                        (x - 1, y - 1) in group) : # Tshape arriba
                        return True
                return False
            elif shape == 'fige05':
                for x, y in group:
                    if ((x + 1, y) in group and
                        (x + 2, y) in group and
                        (x + 2, y - 1) in group): # Default
                        return True
                    elif ((x, y - 1) in group and
                        (x, y - 2) in group and
                        (x - 1, y - 2) in group): # 90 degrees
                        return True
                    elif ((x, y - 1) in group and
                        (x + 1, y - 1) in group and
                        (x + 2, y - 1) in group): # 180 degrees
                        return True
                    elif ((x - 1, y) in group and
                        (x - 1, y - 1) in group and
                        (x - 1, y - 2) in group): # 270 degrees
                        return True
                return False
            elif shape == 'fige06':
                for x, y in group:
                    if all((x, y + i) in group for i in range(4)): # Horizontal line
                        return True
                    if all((x + i, y) in group for i in range(4)): # Vertical line
                        return True
                return False
            elif shape == 'fige07':
                for x, y in group:
                    if ((x, y - 1) in group and
                        (x - 2, y - 1) in group and
                        (x - 2, y - 1) in group): # Default
                        return True
                    elif ((x, y - 1) in group and
                        (x, y - 2) in group and
                        (x + 1, y - 2) in group): # 90 degrees
                        return True
                    elif ((x, y + 1) in group and
                        (x + 1, y + 1) in group and
                        (x + 2, y + 1) in group): # 180 degrees
                        return True
                    elif ((x + 1, y) in group and
                        (x + 1, y - 1) in group and
                        (x + 1, y - 2) in group): # 270 degrees
                        return True
                return False
            else:
                return False

# Check for specific shapes in the groups
shapes_to_check = [
    "fig01", "fig05", "fig02", "fig03", "fig04", "fig06", "fig07", "fig08", "fig09", "fig10", 
    "fig11", "fig12", "fig13", "fig14", "fig15", "fig16", "fig17", "fig18", "fige01", "fige02", 
    "fige03", "fige04", "fige05", "fige06", "fige07"
]
for shape in shapes_to_check:
    for color, group in groups:
        if (len(group) == 4 and is_shapeeasy(group, shape)):
            print(f"Color {color} forms a {shape} with positions: {group}")
        elif (len(group) == 5 and is_shapedif(group, shape)):
            print(f"Color {color} forms a {shape} with positions: {group}")